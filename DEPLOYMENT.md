# GitHub Pages 部署指南

本项目已配置为自动部署到 GitHub Pages。

## 📋 部署前的准备工作

### 1. GitHub Repository 配置

首先，确保你的 GitHub Repository 已正确配置：

1. 进入 GitHub 仓库的 **Settings**
2. 左侧菜单选择 **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. 添加以下密钥：
   - **Name**: `GEMINI_API_KEY`
   - **Value**: 你的 Google Gemini API Key

> 获取 API Key: https://ai.google.dev

### 2. GitHub Pages 设置

1. 在仓库 Settings 中找到 **Pages**
2. 在 **Build and deployment** 部分：
   - **Source** 选择 `Deploy from a branch`
   - **Branch** 选择 `gh-pages` 和 `/(root)`
3. 保存设置

> 如果 gh-pages 分支不存在，首次工作流运行时会自动创建

## 🚀 自动部署工作流

### 工作流触发条件

GitHub Actions 工作流在以下情况自动运行：

- ✅ 推送代码到 `main` 分支
- ✅ 向 `main` 分支提交 Pull Request

### 部署步骤

1. **代码检出** - 从 GitHub 拉取最新代码
2. **环境配置** - 设置 Node.js 18 环境
3. **依赖安装** - 运行 `npm ci`
4. **项目构建** - 运行 `npm run build`，传入 Gemini API Key
5. **制件上传** - 将构建的 `dist` 目录上传
6. **GitHub Pages 部署** - 自动部署到 GitHub Pages

### 查看部署状态

1. 进入仓库的 **Actions** 标签
2. 选择最新的工作流运行
3. 查看各步骤的执行状态和日志

## 🔗 访问应用

部署完成后，应用将在以下 URL 访问：

```
https://[你的GitHub用户名].github.io/super-winner-ai/
```

> 首次部署可能需要 1-2 分钟才能生效

## 📝 本地开发与测试

### 运行开发服务器

```bash
npm install
npm run dev
```

应用将在 http://localhost:3000 运行

### 本地构建测试

```bash
# 需要设置本地环境变量
# 在 .env.local 中设置：GEMINI_API_KEY=your_api_key

npm run build
npm run preview
```

## ⚠️ 常见问题

### 1. API Key 未生效

如果部署后应用无法使用 AI 功能：
- 检查 GitHub Secrets 中的 `GEMINI_API_KEY` 是否正确设置
- 确保 API Key 有效且未过期
- 重新运行工作流：在 Actions 标签中点击 "Re-run all jobs"

### 2. 应用访问 404

- 确认 GitHub Pages 已启用
- 检查 base URL 是否正确设置为 `/super-winner-ai/`（已在 vite.config.ts 中配置）

### 3. 工作流失败

- 查看 Actions 日志了解具体错误信息
- 常见原因：
  - 依赖安装失败：检查 package.json
  - 构建失败：检查代码中的 TypeScript/JavaScript 错误
  - API Key 缺失：确保在 GitHub Secrets 中正确配置

## 🔐 安全说明

- **不要在代码中存储 API Key**
- **仅通过 GitHub Secrets 传递敏感信息**
- 所有日志中的 API Key 已自动脱敏

## 📚 更多信息

- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [GitHub Actions 官方文档](https://docs.github.com/en/actions)
- [Google Generative AI API 文档](https://ai.google.dev/docs)
