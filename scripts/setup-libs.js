const fs = require('fs');
const path = require('path');
const https = require('https');

const LIBS = {
    'highlight.js': {
        files: [
            {
                url: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-dark.min.css',
                dest: 'static/lib/highlight.js/styles.css'
            },
            {
                url: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js',
                dest: 'static/lib/highlight.js/highlight.min.js'
            }
        ]
    },
    'mathjax': {
        files: [
            {
                url: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js',
                dest: 'static/lib/mathjax/tex-mml-chtml.js'
            }
        ]
    }
};

// 确保目录存在
function ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

// 下载文件
function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        ensureDirectoryExistence(dest);
        const file = fs.createWriteStream(dest);

        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${dest}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

// 下载所有文件
async function downloadAllFiles() {
    for (const lib of Object.values(LIBS)) {
        for (const file of lib.files) {
            try {
                await downloadFile(file.url, file.dest);
            } catch (err) {
                console.error(`Error downloading ${file.url}:`, err);
            }
        }
    }
}

// 执行下载
downloadAllFiles().then(() => {
    console.log('All files downloaded successfully!');
}).catch(err => {
    console.error('Error:', err);
}); 