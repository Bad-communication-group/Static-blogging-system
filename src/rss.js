const RSS = require('rss');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// 配置 marked
marked.setOptions({
    sanitize: false,
    gfm: true
});

// 移除 HTML 标签的函数
function stripHtml(html) {
    return html.replace(/<[^>]*>/g, '');
}

async function generateRSS(posts, config) {
    try {
        console.log('开始生成 RSS...');
        console.log('文章数量:', posts.length);
        console.log('网站配置:', {
            title: config.site.title,
            description: config.site.description,
            url: config.site.url
        });

        const feed = new RSS({
            title: config.site.title,
            description: config.site.description,
            site_url: config.site.url,
            feed_url: `${config.site.url}/rss.xml`,
            language: config.site.language,
            pubDate: new Date(),
            copyright: `© ${new Date().getFullYear()} ${config.site.author}`
        });

        // 添加文章到 RSS
        posts.forEach((post, index) => {
            try {
                console.log(`处理第 ${index + 1} 篇文章:`, post.title);
                
                // 生成纯文本摘要
                const excerptHtml = marked.parse(post.excerpt || '');
                const excerptText = stripHtml(excerptHtml);
                
                // 生成纯文本内容
                const contentHtml = marked.parse(post.content || '');
                const contentText = stripHtml(contentHtml);

                feed.item({
                    title: post.title,
                    description: excerptText,
                    url: `${config.site.url}/posts/${post.slug}`,
                    guid: post.slug,
                    categories: post.categories || [],
                    author: post.author || config.site.author,
                    date: new Date(post.date),
                    custom_elements: [
                        { 'content:encoded': contentText }
                    ]
                });
            } catch (postError) {
                console.error(`处理文章 ${post.title} 时出错:`, postError);
            }
        });

        // 生成 RSS XML
        const xml = feed.xml({ indent: true });
        console.log('RSS XML 生成成功');

        // 确保 public 目录存在
        const publicDir = path.join(__dirname, '../public');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }

        // 保存 RSS 文件
        const rssPath = path.join(publicDir, 'rss.xml');
        fs.writeFileSync(rssPath, xml);
        console.log('RSS 文件保存成功:', rssPath);

        return xml;
    } catch (error) {
        console.error('生成 RSS 时出错:', error);
        throw error;
    }
}

module.exports = generateRSS; 