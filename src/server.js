const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const ejs = require('ejs');
const yaml = require('yaml');
const { marked } = require('marked');
const frontMatter = require('front-matter');
const hljs = require('highlight.js');

const app = express();
const port = 3000;

// 配置marked选项
marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-',
    pedantic: false,
    gfm: true,
    breaks: true,
    sanitize: false,
    smartypants: true,
    xhtml: true
});

// 自定义renderer
const renderer = new marked.Renderer();

// 自定义图片渲染
renderer.image = function(href, title, text) {
    return `<figure class="image-container">
        <img src="${href}" alt="${text}" ${title ? `title="${title}"` : ''}>
        ${title ? `<figcaption>${title}</figcaption>` : ''}
    </figure>`;
};

// 自定义链接渲染
renderer.link = function(href, title, text) {
    const isExternal = href.startsWith('http');
    return `<a href="${href}" ${isExternal ? 'target="_blank" rel="noopener"' : ''} ${title ? `title="${title}"` : ''}>${text}</a>`;
};

// 自定义代码块渲染
renderer.code = function(code, language) {
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    const highlightedCode = hljs.highlight(code, { language: validLanguage }).value;
    return `<div class="code-block">
        <div class="code-block-header">
            <button class="copy-button" onclick="copyCode(this)">复制代码</button>
        </div>
        <pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>
    </div>`;
};

// 配置marked使用自定义renderer
marked.setOptions({ renderer });

// 加载配置
const config = yaml.parse(fs.readFileSync(path.join(__dirname, '../config.yaml'), 'utf8'));

// 配置视图引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../templates'));

// 静态文件服务
app.use(express.static(path.join(__dirname, '../static')));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/posts', express.static(path.join(__dirname, '../public/posts')));
app.use('/categories', express.static(path.join(__dirname, '../public/categories')));
app.use('/tags', express.static(path.join(__dirname, '../public/tags')));

// 自定义文章摘要生成
function generateExcerpt(content) {
    const maxLength = 200;
    const plainText = content.replace(/<[^>]+>/g, '');  // 移除HTML标签
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + '...';
}

// 加载文章数据
async function loadPosts() {
    const posts = [];
    const categories = {};
    const tags = {};

    const postsDir = path.join(__dirname, '../content/posts');
    const files = await fs.readdir(postsDir);

    for (const file of files) {
        if (file.endsWith('.md')) {
            const content = await fs.readFile(path.join(postsDir, file), 'utf8');
            const { attributes, body } = frontMatter(content);
            const html = marked(body);
            
            const post = {
                ...attributes,
                content: html,
                excerpt: generateExcerpt(html)
            };

            posts.push(post);

            // 处理分类
            if (post.categories && Array.isArray(post.categories)) {
                post.categories.forEach(category => {
                    if (!categories[category]) {
                        categories[category] = [];
                    }
                    categories[category].push(post);
                });
            }

            // 处理标签
            if (post.tags && Array.isArray(post.tags)) {
                post.tags.forEach(tag => {
                    if (!tags[tag]) {
                        tags[tag] = [];
                    }
                    tags[tag].push(post);
                });
            }
        }
    }

    // 按日期排序
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    return { posts, categories, tags };
}

// 路由
app.get('/', async (req, res) => {
    const { posts, categories, tags } = await loadPosts();
    res.render('index', {
        config,
        posts,
        categories,
        tags,
        currentPath: '/'
    });
});

app.get('/posts/:slug', async (req, res) => {
    const { posts, categories, tags } = await loadPosts();
    const post = posts.find(p => p.slug === req.params.slug);
    
    if (!post) {
        return res.status(404).render('404', { config });
    }

    res.render('post', {
        config,
        post,
        categories,
        tags,
        currentPath: '/posts'
    });
});

app.get('/categories/:category', async (req, res) => {
    const { posts, categories, tags } = await loadPosts();
    const category = req.params.category;
    const categoryPosts = categories[category] || [];
    
    if (categoryPosts.length === 0) {
        return res.status(404).render('404', {
            config,
            currentPath: '/categories'
        });
    }

    res.render('category', {
        config,
        category,
        posts: categoryPosts,
        categories,
        tags,
        currentPath: '/categories'
    });
});

app.get('/tags/:tag', async (req, res) => {
    const { posts, categories, tags } = await loadPosts();
    const tagPosts = posts.filter(post => 
        post.tags && post.tags.includes(req.params.tag)
    );

    if (tagPosts.length === 0) {
        return res.status(404).render('404', { config });
    }

    res.render('tag', {
        config,
        tag: req.params.tag,
        posts: tagPosts,
        categories,
        tags,
        currentPath: '/tags'
    });
});

app.get('/about', (req, res) => {
    res.render('about', { 
        config,
        currentPath: '/about'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', { 
        config,
        currentPath: '/contact'
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
}); 