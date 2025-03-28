# Verdant 开发文档

## 技术栈

- Node.js
- Express.js - Web 服务器框架
- EJS - 模板引擎
- Marked - Markdown 解析器
- Highlight.js - 代码高亮
- MathJax - 数学公式渲染
- YAML - 配置文件格式

## 开发环境设置

### 系统要求

- Node.js >= 14.0.0
- npm >= 6.0.0

### 开发工具推荐

- Visual Studio Code
- 推荐的 VS Code 插件：
  - ESLint
  - Prettier
  - EJS Language Support
  - YAML

### 本地开发

1. 克隆仓库：
```bash
git clone https://github.com/Lcyys666/Static-blogging-system.git
cd verdant
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm run dev
```

## 项目结构详解

### 核心模块

#### 1. 服务器模块 (src/server.js)
- Express 服务器配置
- 路由处理
- 中间件配置
- 静态文件服务

#### 2. 生成器模块 (src/index.js)
- Markdown 解析
- 文章元数据处理
- 分类和标签处理
- 静态文件生成

#### 3. 模板系统 (templates/)
- 页面布局模板
- 可复用组件
- 样式集成

### 关键文件说明

```
src/
├── server.js          # Web 服务器和路由处理
├── index.js           # 静态生成器核心逻辑
└── utils/            # 工具函数
    ├── markdown.js   # Markdown 处理
    ├── metadata.js   # 元数据处理
    └── file.js       # 文件操作

templates/
├── partials/         # 可复用组件
│   ├── header.ejs   # 页头组件
│   ├── footer.ejs   # 页脚组件
│   └── sidebar.ejs  # 侧边栏组件
├── index.ejs        # 首页模板
├── post.ejs         # 文章页模板
├── category.ejs     # 分类页模板
└── tag.ejs          # 标签页模板
```

## 核心功能实现

### 1. Markdown 处理

```javascript
const marked = require('marked');
const hljs = require('highlight.js');

// 配置 marked
marked.setOptions({
    highlight: function(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    },
    renderer: new marked.Renderer()
});
```

### 2. 文章解析

```javascript
async function processPost(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    const { attributes, body } = frontMatter(content);
    const html = marked(body);
    
    return {
        ...attributes,
        content: html,
        excerpt: generateExcerpt(html)
    };
}
```

### 3. 路由处理

```javascript
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
```

## 样式开发

### CSS 结构

```css
/* 基础样式 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 布局 */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 2rem;
}

/* 组件样式 */
.post-card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

## 部署指南

### 1. 生产环境构建

```bash
npm run build
```

### 2. 服务器要求

- Node.js >= 14.0.0
- 2GB RAM 以上
- 10GB 存储空间

### 3. 部署步骤

1. 上传代码到服务器
2. 安装依赖
3. 配置环境变量
4. 启动应用

```bash
npm install --production
NODE_ENV=production npm start
```

## 性能优化

1. 静态资源优化
   - 使用本地资源而非 CDN
   - 压缩静态文件
   - 启用浏览器缓存

2. 服务器优化
   - 启用 Gzip 压缩
   - 实现页面缓存
   - 优化数据库查询

3. 前端优化
   - 延迟加载图片
   - 优化 JavaScript 执行
   - 减少 DOM 操作

## 测试

### 单元测试

```bash
npm run test:unit
```

### 集成测试

```bash
npm run test:integration
```

### 端到端测试

```bash
npm run test:e2e
```

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交改动
4. 推送到分支
5. 创建 Pull Request

## 版本控制

使用语义化版本控制：

- MAJOR.MINOR.PATCH
- 主版本号：不兼容的 API 修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正 
