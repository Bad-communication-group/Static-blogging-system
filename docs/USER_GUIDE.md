# 使用指南

## 目录

1. [快速入门](#快速入门)
2. [写作指南](#写作指南)
3. [配置说明](#配置说明)
4. [主题定制](#主题定制)
5. [常见问题](#常见问题)

## 快速入门

### 安装和启动

1. 确保已安装 Node.js (>= 14.0.0)
2. 克隆项目并安装依赖：
```bash
git clone https://github.com/Bad-communication-group/Static-blogging-system.git
cd Static-blogging-system
npm install
```

3. 启动博客：
```bash
npm start
```

4. 访问 `http://localhost:3000` 查看你的博客

### 基本使用

1. 创建新文章：
   - 在 `content/posts` 目录下创建 `.md` 文件
   - 添加必要的元数据（frontmatter）
   - 使用 Markdown 编写内容

2. 创建页面：
   - 在 `content/pages` 目录下创建 `.md` 文件
   - 添加必要的元数据
   - 编写页面内容

3. 添加图片：
   - 将图片放在 `content/assets` 目录下
   - 在文章中使用相对路径引用

## 写作指南

### 文章元数据

每篇文章都需要包含以下元数据：

```markdown
---
title: "文章标题"
date: "2024-03-20"
categories: ["技术", "随笔"]
tags: ["JavaScript", "Node.js"]
excerpt: "文章摘要（可选）"
---
```

### Markdown 语法

#### 1. 基础语法

```markdown
# 一级标题
## 二级标题

**粗体** *斜体*

- 无序列表
- 列表项

1. 有序列表
2. 列表项

[链接文本](URL)
![图片描述](图片URL)
```

#### 2. 代码块

````markdown
```javascript
const hello = "世界";
console.log(hello);
```
````

#### 3. 数学公式

```markdown
行内公式：$E = mc^2$

独立公式：
$$
\frac{n!}{k!(n-k)!} = \binom{n}{k}
$$
```

#### 4. 表格

```markdown
| 表头1 | 表头2 |
|-------|-------|
| 内容1 | 内容2 |
| 内容3 | 内容4 |
```

### 最佳实践

1. 文章组织
   - 使用清晰的文件名
   - 合理使用分类和标签
   - 提供有意义的摘要

2. 图片处理
   - 使用适当的图片格式
   - 压缩图片大小
   - 提供 alt 文本

3. 内容格式
   - 使用适当的标题层级
   - 添加适量的空行
   - 保持段落简洁

## 配置说明

### 站点配置

编辑 `config.yaml` 文件：

```yaml
site:
  title: "网站标题"
  description: "网站描述"
  language: "zh-CN"
  url: "http://localhost:3000"
  author: "作者名"
  social:
    github: "GitHub 链接"
    twitter: "Twitter 链接"
    email: "电子邮件"

nav:
  - name: "首页"
    url: "/"
  - name: "关于"
    url: "/about"
  - name: "联系"
    url: "/contact"
```

### 主题配置

1. 颜色方案
2. 布局设置
3. 字体选择
4. 响应式断点

## 主题定制

### 修改样式

1. 编辑 `public/css/style.css`
2. 自定义颜色、字体等
3. 调整布局和间距

### 修改模板

1. 编辑 `templates` 目录下的 `.ejs` 文件
2. 自定义页面结构
3. 添加新的组件

## 常见问题

### 1. 文章不显示

可能的原因：
- 文件名格式错误
- 元数据格式错误
- 文件编码不是 UTF-8

解决方案：
- 检查文件名是否符合规范
- 验证元数据格式
- 确保文件为 UTF-8 编码

### 2. 样式问题

可能的原因：
- CSS 文件未正确加载
- 样式冲突
- 浏览器缓存

解决方案：
- 检查文件路径
- 检查样式优先级
- 清除浏览器缓存

### 3. 数学公式显示问题

可能的原因：
- MathJax 未正确加载
- 公式语法错误

解决方案：
- 检查 MathJax 配置
- 验证公式语法

## 进阶使用

### 1. 自定义布局

创建自定义布局模板：
1. 在 `templates` 目录下创建新的 `.ejs` 文件
2. 在文章元数据中指定布局

### 2. 添加新功能

1. 评论系统集成
2. 搜索功能
3. RSS 订阅
4. 社交分享

### 3. SEO 优化

1. 添加 meta 标签
2. 生成 sitemap
3. 优化 URL 结构
4. 添加 robots.txt

## 维护和更新

### 1. 备份

定期备份：
- 文章内容
- 配置文件
- 自定义主题

### 2. 更新

1. 拉取最新代码
2. 安装新依赖
3. 测试功能
4. 部署更新

## 获取帮助

- 查看项目文档
- 提交 Issue
- 参与讨论
- 贡献代码 
