const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');
const marked = require('marked');
const frontMatter = require('front-matter');
const yaml = require('yaml');
const ejs = require('ejs');

class BlogGenerator {
    constructor() {
        this.config = this.loadConfig();
        this.posts = [];
        this.categories = {};
        this.tags = {};
        this.watcher = null;
    }

    loadConfig() {
        const configPath = path.join(__dirname, '../config.yaml');
        const configContent = fs.readFileSync(configPath, 'utf8');
        return yaml.parse(configContent);
    }

    async parseMarkdown(content) {
        return marked.parse(content);
    }

    async processPosts() {
        const postsDir = path.join(__dirname, '../content/posts');
        await fs.ensureDir(postsDir);
        
        const files = await fs.readdir(postsDir);
        this.posts = [];
        this.categories = {};
        this.tags = {};

        for (const file of files) {
            if (file.endsWith('.md')) {
                const content = await fs.readFile(path.join(postsDir, file), 'utf8');
                const { attributes, body } = frontMatter(content);
                const html = await this.parseMarkdown(body);
                
                const post = {
                    ...attributes,
                    content: html,
                    date: new Date(attributes.date || Date.now())
                };

                this.posts.push(post);

                // 处理分类
                if (post.categories) {
                    for (const category of post.categories) {
                        if (!this.categories[category]) {
                            this.categories[category] = [];
                        }
                        this.categories[category].push(post);
                    }
                }

                // 处理标签
                if (post.tags) {
                    for (const tag of post.tags) {
                        if (!this.tags[tag]) {
                            this.tags[tag] = [];
                        }
                        this.tags[tag].push(post);
                    }
                }
            }
        }

        // 按日期排序文章
        this.posts.sort((a, b) => b.date - a.date);
    }

    async generatePages() {
        const publicDir = path.join(__dirname, '../public');
        await fs.emptyDir(publicDir);
        await fs.ensureDir(path.join(publicDir, 'posts'));
        await fs.ensureDir(path.join(publicDir, 'categories'));
        await fs.ensureDir(path.join(publicDir, 'tags'));

        // 生成首页
        await this.generateIndex();
        
        // 生成文章页
        await this.generatePosts();
        
        // 生成分类页
        await this.generateCategories();
        
        // 生成标签页
        await this.generateTags();
        
        // 生成关于页
        await this.generateAbout();
        
        // 生成联系页
        await this.generateContact();
        
        // 复制静态资源
        await this.copyStaticFiles();
    }

    async generateIndex() {
        const template = await fs.readFile(path.join(__dirname, '../templates/index.ejs'), 'utf8');
        const html = ejs.render(template, {
            config: this.config,
            posts: this.posts.slice(0, 5),
            categories: this.categories,
            tags: this.tags
        });
        await fs.writeFile(path.join(__dirname, '../public/index.html'), html);
    }

    async generatePosts() {
        const template = await fs.readFile(path.join(__dirname, '../templates/post.ejs'), 'utf8');
        for (const post of this.posts) {
            const html = ejs.render(template, {
                config: this.config,
                post,
                categories: this.categories,
                tags: this.tags
            });
            await fs.writeFile(
                path.join(__dirname, `../public/posts/${post.slug}.html`),
                html
            );
        }
    }

    async generateCategories() {
        const template = await fs.readFile(path.join(__dirname, '../templates/category.ejs'), 'utf8');
        for (const [category, posts] of Object.entries(this.categories)) {
            const html = ejs.render(template, {
                config: this.config,
                category,
                posts,
                categories: this.categories,
                tags: this.tags
            });
            await fs.writeFile(
                path.join(__dirname, `../public/categories/${category}.html`),
                html
            );
        }
    }

    async generateTags() {
        const template = await fs.readFile(path.join(__dirname, '../templates/tag.ejs'), 'utf8');
        for (const [tag, posts] of Object.entries(this.tags)) {
            const html = ejs.render(template, {
                config: this.config,
                tag,
                posts,
                categories: this.categories,
                tags: this.tags
            });
            await fs.writeFile(
                path.join(__dirname, `../public/tags/${tag}.html`),
                html
            );
        }
    }

    async generateAbout() {
        const template = await fs.readFile(path.join(__dirname, '../templates/about.ejs'), 'utf8');
        const html = ejs.render(template, {
            config: this.config,
            categories: this.categories,
            tags: this.tags
        });
        await fs.writeFile(path.join(__dirname, '../public/about.html'), html);
    }

    async generateContact() {
        const template = await fs.readFile(path.join(__dirname, '../templates/contact.ejs'), 'utf8');
        const html = ejs.render(template, {
            config: this.config,
            categories: this.categories,
            tags: this.tags
        });
        await fs.writeFile(path.join(__dirname, '../public/contact.html'), html);
    }

    async copyStaticFiles() {
        const staticDir = path.join(__dirname, '../static');
        const publicDir = path.join(__dirname, '../public');
        
        if (await fs.pathExists(staticDir)) {
            // 复制css文件
            const cssFile = path.join(staticDir, 'css', 'style.css');
            const publicCssDir = path.join(publicDir, 'css');
            if (await fs.pathExists(cssFile)) {
                await fs.ensureDir(publicCssDir);
                await fs.copyFile(cssFile, path.join(publicCssDir, 'style.css'));
            }

            // 复制images目录
            const imagesDir = path.join(staticDir, 'images');
            const publicImagesDir = path.join(publicDir, 'images');
            if (await fs.pathExists(imagesDir)) {
                await fs.ensureDir(publicImagesDir);
                await fs.copy(imagesDir, publicImagesDir);
            }
        }
    }

    watch() {
        const contentDir = path.join(__dirname, '../content');
        const templateDir = path.join(__dirname, '../templates');
        const staticDir = path.join(__dirname, '../static');

        this.watcher = chokidar.watch([contentDir, templateDir, staticDir], {
            ignored: /(^|[\/\\])\../,
            persistent: true
        });

        this.watcher
            .on('add', path => this.handleFileChange(path))
            .on('change', path => this.handleFileChange(path))
            .on('unlink', path => this.handleFileChange(path));
    }

    async handleFileChange(filePath) {
        console.log(`文件变化: ${filePath}`);
        await this.build();
    }

    async build() {
        console.log('开始生成博客...');
        await this.processPosts();
        await this.generatePages();
        console.log('博客生成完成！');
    }

    stop() {
        if (this.watcher) {
            this.watcher.close();
        }
    }
}

// 创建生成器实例
const generator = new BlogGenerator();

// 处理命令行参数
const args = process.argv.slice(2);
const isDev = args.includes('--dev');

if (isDev) {
    // 开发模式：监听文件变化
    generator.watch();
    console.log('开发模式已启动，正在监听文件变化...');
} else {
    // 生产模式：只生成一次
    generator.build().then(() => {
        console.log('博客生成完成！');
        process.exit(0);
    }).catch(err => {
        console.error('生成过程中出错：', err);
        process.exit(1);
    });
} 