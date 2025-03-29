# Static-blogging-system

一个优雅的、支持 Markdown 的静态博客系统，支持 RSS 订阅和 SEO 优化。

现在本项目还在稳定更新中！

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=Lcyys666&repo=Static-blogging-system)](https://github.com/Lcyys666/Static-blogging-system)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)

## 特性

- 🚀 快速性能：基于静态文件生成
- 📝 完整的 Markdown 支持：包括代码高亮、数学公式等
- 🔍 SEO 优化：自动生成 sitemap.xml
- 📰 RSS 订阅：支持 RSS 2.0 标准
- 📱 响应式设计：完美适配电脑设备
- 🎨 多主题支持：内置多种精美主题
- 🔍 文章搜索：支持标题、内容、分类、标签搜索

## 快速开始

### 安装

```bash
# 克隆仓库
git clone https://github.com/Lcyys666/Static-blogging-system.git
cd Static-blogging-system

# 安装依赖
npm install
```

### 配置

编辑 `config.yaml` 文件：

```yaml
site:
  title: "我的博客"
  subtitle: "分享技术与生活"
  url: "http://localhost:3000"
  author: "Lcyys666"
  language: "zh-CN"
  description: "一个使用 Static-blogging-system 搭建的博客"
  keywords: "blog, markdown, nodejs"
  theme: "default"  # 可选主题: default(简约现代), vintage(复古), tech(科技), minimal(极简), nature(自然)
```

### 创建文章

在 `content/posts` 目录下创建 Markdown 文件：

```markdown
---
title: "文章标题"
date: "2024-03-20"
categories: ["技术", "生活"]
tags: ["markdown", "blog"]
---

文章内容...
```

### 运行

```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

访问 http://localhost:3000 查看博客。

## 项目结构

```
static-blogging-system/
├── content/                    # 内容目录
│   ├── posts/                 # 博客文章
│   │   └── *.md              # Markdown 格式的文章
│   └── pages/                 # 独立页面
│       ├── about.md          # 关于页面
│       └── contact.md        # 联系页面
├── static/                    # 静态资源
│   ├── css/                  # 样式文件
│   │   ├── style.css        # 主样式
│   │   └── themes/          # 主题样式
│   ├── js/                   # JavaScript 文件
│   │   └── main.js          # 主脚本
│   └── images/              # 图片资源
├── src/                      # 源代码
│   ├── server.js            # 服务器入口
│   ├── index.js             # 生成器入口
│   ├── parser.js            # Markdown 解析器
│   ├── rss.js               # RSS 生成器
│   └── sitemap.js           # 站点地图生成器
├── templates/                # 模板文件
│   ├── partials/            # 部分模板
│   │   ├── header.ejs       # 页头
│   │   ├── footer.ejs       # 页脚
│   │   ├── sidebar.ejs      # 侧边栏
│   │   └── header-meta.ejs  # 头部元数据
│   ├── index.ejs            # 首页模板
│   ├── post.ejs             # 文章页模板
│   ├── page.ejs             # 独立页面模板
│   ├── categories.ejs       # 分类页模板
│   ├── tags.ejs             # 标签页模板
│   └── search.ejs           # 搜索结果页模板
├── docs/                     # 文档
│   ├── DEVELOPMENT.md       # 开发文档
│   └── USER_GUIDE.md        # 用户指南
├── tests/                    # 测试文件
│   ├── unit/                # 单元测试
│   └── integration/         # 集成测试
├── config.yaml              # 配置文件
├── package.json             # 项目配置
├── CHANGELOG.md             # 更新日志
└── README.md                # 项目说明
```

## 未来计划

### 功能增强
- [ ] 添加评论系统支持
- [ ] 支持文章加密访问
- [ ] 添加文章统计功能（阅读量、点赞等）
- [ ] 支持文章目录自动生成
- [ ] 添加文章分享功能
- [ ] 支持文章置顶功能
- [ ] 添加文章归档页面
- [ ] 支持文章草稿功能

### 主题系统
- [ ] 支持主题在线切换
- [ ] 添加更多预设主题
- [ ] 支持主题自定义配置
- [ ] 添加暗色模式支持

### 性能优化
- [ ] 优化静态资源加载
- [ ] 添加资源压缩功能
- [ ] 支持 CDN 配置
- [ ] 优化图片加载策略

### 开发体验
- [ ] 添加命令行工具
- [ ] 支持一键部署
- [ ] 添加开发热重载
- [ ] 完善测试覆盖
- [ ] 添加 CI/CD 支持

### 文档完善
- [ ] 完善开发文档
- [ ] 添加 API 文档
- [ ] 添加主题开发指南
- [ ] 添加贡献指南

## 文档

- [开发文档](docs/DEVELOPMENT.md) - 开发者指南
- [用户指南](docs/USER_GUIDE.md) - 使用说明
- [更新日志](CHANGELOG.md) - 版本更新记录

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License 
