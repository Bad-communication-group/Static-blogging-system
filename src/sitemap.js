const fs = require('fs');
const path = require('path');

async function generateSitemap(posts, config) {
    try {
        console.log('开始生成 sitemap...');
        const baseUrl = config.site.url;
        const today = new Date().toISOString().split('T')[0];
        
        // 开始生成 sitemap
        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- 首页 -->
    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    
    <!-- 静态页面 -->
    <url>
        <loc>${baseUrl}/about</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${baseUrl}/contact</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <!-- 分类页面 -->
    <url>
        <loc>${baseUrl}/categories</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    
    <!-- 标签页面 -->
    <url>
        <loc>${baseUrl}/tags</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>`;

        // 添加文章页面
        posts.forEach(post => {
            const postDate = new Date(post.date).toISOString().split('T')[0];
            sitemap += `
    <url>
        <loc>${baseUrl}/posts/${post.slug}</loc>
        <lastmod>${postDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>`;
        });

        // 添加分类页面
        Object.keys(posts.reduce((acc, post) => {
            if (post.categories) {
                post.categories.forEach(category => {
                    acc[category] = true;
                });
            }
            return acc;
        }, {})).forEach(category => {
            sitemap += `
    <url>
        <loc>${baseUrl}/categories/${category}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`;
        });

        // 添加标签页面
        Object.keys(posts.reduce((acc, post) => {
            if (post.tags) {
                post.tags.forEach(tag => {
                    acc[tag] = true;
                });
            }
            return acc;
        }, {})).forEach(tag => {
            sitemap += `
    <url>
        <loc>${baseUrl}/tags/${tag}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`;
        });

        sitemap += `
</urlset>`;

        // 确保 public 目录存在
        const publicDir = path.join(__dirname, '../public');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }

        // 保存 sitemap 文件
        const sitemapPath = path.join(publicDir, 'sitemap.xml');
        fs.writeFileSync(sitemapPath, sitemap);
        console.log('sitemap 文件保存成功:', sitemapPath);

        return sitemap;
    } catch (error) {
        console.error('生成 sitemap 时出错:', error);
        throw error;
    }
}

module.exports = generateSitemap; 