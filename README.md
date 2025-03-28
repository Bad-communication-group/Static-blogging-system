# Static-blogging-system

一个优雅的、支持 Markdown 的静态博客系统。

![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=Lcyys666&repo=Static-blogging-system)](https://github.com/Lcyys666/Static-blogging-system)

## 特性

- 🚀 快速且轻量级
- 📝 完整的 Markdown 支持
- 🧮 LaTeX 数学公式支持
- 🎨 代码高亮和复制功能
- 📱 响应式设计
- 🏷️ 分类和标签支持
- 🔍 文章搜索功能
- 📊 文章目录
- 💻 优雅的代码展示

## 快速开始

### 安装

```bash
git clone https://github.com/Lcyys666/Static-blogging-system.git
cd verdant
npm install
```

### 配置

在 `config.yaml` 中配置你的博客信息：

```yaml
site:
  title: "我的博客"
  description: "个人博客网站"
  language: "zh-CN"
  url: "http://localhost:3000"
  social:
    github: "https://github.com/yourusername"
    twitter: "https://twitter.com/yourusername"
    email: "your.email@example.com"

nav:
  - name: "首页"
    url: "/"
  - name: "关于"
    url: "/about"
  - name: "联系"
    url: "/contact"
```

### 创建文章

在 `content/posts` 目录下创建 Markdown 文件：

```markdown
---
title: "文章标题"
date: "2024-03-20"
categories: ["技术", "随笔"]
tags: ["JavaScript", "Node.js"]
---

这里是文章内容...
```

### 运行

```bash
npm start
```

访问 `http://localhost:3000` 查看你的博客。

## 项目结构

```
verdant/
├── content/            # 内容文件夹
│   ├── posts/         # 博客文章
│   ├── pages/         # 独立页面
│   └── assets/        # 静态资源
├── static/            # 公共资源
│   ├── css/          # 样式文件
│   └── lib/          # 第三方库
├── src/              # 源代码
│   ├── server.js     # 服务器入口
│   └── index.js      # 生成器入口
├── templates/        # 模板文件
│   ├── partials/    # 部分模板
│   └── *.ejs        # 页面模板
└── config.yaml       # 配置文件
```

## 开发文档

详细的开发文档请查看 [DEVELOPMENT.md](./docs/DEVELOPMENT.md)。

## 使用文档

详细的使用说明请查看 [USER_GUIDE.md](./docs/USER_GUIDE.md)。

## 开发日志

查看 [CHANGELOG.md](./docs/CHANGELOG.md) 了解项目的演进历程。

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License 
