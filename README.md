<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Super Winner AI - 超赢智能销售助手

一个基于 Google Gemini API 的 AI 销售助手应用，具有实时聊天和会议录音功能。

## 🌐 在线访问

**GitHub Pages**: https://everxi.github.io/super-winner-ai/

View your app in AI Studio: https://ai.studio/apps/drive/1JVQV0oMCSvxE7fIo4Ud_C6Vb3jfvLTXZ

## ⚡ 快速开始

### 本地开发

**前置需求：** Node.js 18+

1. **安装依赖**
   ```bash
   npm install
   ```

2. **配置 API Key**
   - 在项目根目录创建 `.env.local` 文件
   - 添加：`GEMINI_API_KEY=your_api_key_here`
   - 获取 API Key: https://ai.google.dev

3. **启动开发服务器**
   ```bash
   npm run dev
   ```
   应用将在 http://localhost:3000 运行

4. **构建项目**
   ```bash
   npm run build
   ```

## 🚀 自动部署到 GitHub Pages

本项目已配置 GitHub Actions 工作流，支持自动构建和部署。

### 部署步骤

1. **Fork 本仓库** 或推送到你自己的 GitHub 仓库

2. **配置 GitHub Secrets**
   - 进入仓库 Settings → Secrets and variables → Actions
   - 新建密钥 `GEMINI_API_KEY`，填入你的 Gemini API Key

3. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 `Deploy from a branch`
   - 选择 `gh-pages` 分支

4. **推送代码到 main 分支**
   ```bash
   git push origin main
   ```

工作流将自动运行，构建并部署应用到 GitHub Pages。

📖 **详细说明**: 见 [DEPLOYMENT.md](DEPLOYMENT.md)

## 📂 项目结构

```
.
├── components/          # React 组件
│   ├── ChatInterface.tsx    # 聊天界面组件
│   └── MeetingRecorder.tsx  # 会议录音组件
├── services/
│   └── geminiService.ts     # Google Gemini API 服务
├── App.tsx              # 主应用组件
├── types.ts             # TypeScript 类型定义
├── constants.tsx        # 常量和模拟数据
├── vite.config.ts       # Vite 配置
└── .github/workflows/
    └── deploy.yml       # GitHub Actions 工作流

```

## 🔧 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite 6
- **UI 库**: Tailwind CSS + Lucide React
- **AI 服务**: Google Generative AI (Gemini)
- **部署**: GitHub Pages + GitHub Actions

## ✨ 功能特性

- 💬 **实时聊天** - 与 AI 助手进行对话
- 🎙️ **会议录音** - 记录并转录会议内容
- 📋 **摘要生成** - 自动生成会议总结
- 📱 **响应式设计** - 完全适配移动设备
- 🌐 **中文本地化** - 完整的中文界面

## 📝 可用命令

```bash
# 开发模式
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview
```

## 🔐 环境变量

| 变量名 | 说明 | 获取方式 |
|--------|------|---------|
| GEMINI_API_KEY | Google Gemini API Key | https://ai.google.dev |

## ⚠️ 注意事项

- 不要在代码中硬编码 API Key
- 生产环境通过 GitHub Secrets 或环境变量传入
- 确保 API Key 有适当的访问权限和配额

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT
