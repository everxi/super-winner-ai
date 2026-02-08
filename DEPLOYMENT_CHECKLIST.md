# GitHub Pages 部署检查清单

## ✅ 代码端清单

- [x] 更新 `vite.config.ts` - 设置 base URL 为 `/super-winner-ai/`
- [x] 创建 `.github/workflows/deploy.yml` - GitHub Actions 自动化部署工作流
- [x] 更新 `geminiService.ts` - 改进环境变量处理和错误提示
- [x] 更新 `README.md` - 添加部署说明和使用指南
- [x] 创建 `DEPLOYMENT.md` - 详细的部署文档

## 📋 GitHub 配置清单

### 1. GitHub Secrets 设置
- [ ] 进入仓库 Settings
- [ ] 点击 Secrets and variables → Actions
- [ ] 创建新的 Secret：
  - Name: `GEMINI_API_KEY`
  - Value: `你的 Gemini API Key`
- [ ] 点击 Add secret

### 2. GitHub Pages 设置
- [ ] 进入仓库 Settings
- [ ] 查找 Pages 配置
- [ ] Source 选择 "Deploy from a branch"
- [ ] 选择分支：`gh-pages`
- [ ] 选择文件夹：`/(root)`
- [ ] 点击 Save

> 注意：第一次运行 Actions 时会自动创建 gh-pages 分支

### 3. 分支保护（可选但推荐）
- [ ] 在 Settings → Branches 设置分支保护规则
- [ ] 保护 `main` 分支
- [ ] 要求代码审查或 Actions 通过

## 🚀 部署步骤

1. **准备本地仓库**
   ```bash
   git clone https://github.com/[你的用户名]/super-winner-ai.git
   cd super-winner-ai
   git checkout main
   ```

2. **验证文件已更新**
   - ✓ vite.config.ts 包含 `base: '/super-winner-ai/'`
   - ✓ .github/workflows/deploy.yml 存在
   - ✓ README.md 和 DEPLOYMENT.md 已更新

3. **推送到 GitHub**
   ```bash
   git add .
   git commit -m "Configure GitHub Pages automatic deployment"
   git push origin main
   ```

4. **监控部署进程**
   - 打开 GitHub 仓库
   - 点击 Actions 标签
   - 观察工作流运行状态

5. **验证部署成功**
   - 等待工作流完成（通常 2-5 分钟）
   - 访问 https://[你的用户名].github.io/super-winner-ai/
   - 应用应该能正常加载

## 🔍 故障排查

### 工作流失败
- 查看 Actions 日志中的错误信息
- 常见原因：
  - ❌ GEMINI_API_KEY 未设置在 Secrets 中
  - ❌ API Key 无效或已过期
  - ❌ 分支名称不是 `main`

### 应用无法在指定 URL 访问
- 检查 GitHub Pages 是否启用
- 验证分支选择为 `gh-pages`
- 清除浏览器缓存后重试

### AI 功能无法使用
- 确认 Gemini API Key 正确
- 检查 API 是否有配额限制
- 在本地测试 API Key 是否有效

## 📚 后续操作

部署成功后，你可以：

1. **配置自定义域名**（可选）
   - GitHub Pages 支持自定义域名设置

2. **设置自动更新**
   - 配置 Dependabot 自动更新依赖

3. **添加分析**
   - 添加 Google Analytics 等追踪工具

4. **改进工作流**
   - 添加单元测试
   - 添加 ESLint 检查
   - 添加部署前的校验步骤

## ✨ 完成标志

当以下条件都满足时，说明部署成功：

- ✅ GitHub Actions 工作流通过（无红色 ✗）
- ✅ GitHub Pages 显示 gh-pages 分支的部署成功
- ✅ 能通过 https://[用户名].github.io/super-winner-ai/ 访问应用
- ✅ 应用正常加载和交互
- ✅ 可以成功调用 Gemini API（与 AI 对话正常）

---

祝部署顺利！有任何问题欢迎提 Issue。
