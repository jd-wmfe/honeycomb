# 贡献指南

感谢您对 Honeycomb 项目的关注！我们欢迎所有形式的贡献，包括但不限于：

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码修复
- ✨ 实现新功能
- 🎨 改进 UI/UX

## 📋 目录

- [行为准则](#行为准则)
- [开发环境设置](#开发环境设置)
- [开发流程](#开发流程)
- [代码规范](#代码规范)
- [提交规范](#提交规范)
- [Pull Request 流程](#pull-request-流程)
- [项目结构](#项目结构)
- [测试](#测试)
- [常见问题](#常见问题)

## 行为准则

本项目遵循 [行为准则](CODE_OF_CONDUCT.md)。作为贡献者，我们期望您：

- 保持友好和耐心
- 欢迎并尊重不同背景的贡献者
- 在讨论中保持专业和尊重
- 建设性地处理分歧

## 开发环境设置

### 前置要求

- **Node.js** >= 24.11.1（推荐使用 `.nvmrc` 中指定的版本）
- **pnpm** >= 10.25.0（推荐使用 `package.json` 中指定的版本）

### 安装步骤

1. **Fork 并克隆仓库**

```bash
# Fork 本仓库到您的 GitHub 账户，然后克隆
git clone https://github.com/your-username/honeycomb.git
cd honeycomb
```

2. **安装依赖**

```bash
pnpm install
```

3. **初始化数据库**

```bash
pnpm init-db
```

4. **启动开发服务器**

```bash
# 构建所有包
pnpm build

# 启动后端服务器（在一个终端）
cd packages/honeycomb-server
pnpm start

# 启动前端开发服务器（在另一个终端）
cd packages/honeycomb-client
pnpm dev
```

5. **验证安装**

- 访问前端：http://localhost:5173
- 访问 API 文档：http://localhost:3002/api-docs

## 开发流程

### 1. 创建分支

从 `master` 分支创建新分支：

```bash
git checkout master
git pull origin master
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
# 或
git checkout -b docs/your-docs-update
```

**分支命名规范：**
- `feature/` - 新功能
- `fix/` - Bug 修复
- `docs/` - 文档更新
- `refactor/` - 代码重构
- `test/` - 测试相关
- `chore/` - 构建/工具链更新

### 2. 进行开发

- 编写代码
- 添加或更新测试
- 确保代码通过所有检查

### 3. 提交更改

使用规范化提交命令：

```bash
pnpm commit
```

这将启动交互式提交工具，帮助您编写符合 [Conventional Commits](https://www.conventionalcommits.org/) 规范的提交信息。

### 4. 推送并创建 Pull Request

```bash
git push origin your-branch-name
```

然后在 GitHub 上创建 Pull Request。

## 代码规范

### TypeScript

- 使用 TypeScript 严格模式
- 为函数参数和返回值添加类型注解
- 避免使用 `any`，优先使用 `unknown`
- 使用有意义的变量和函数名

### 代码格式化

项目使用 [Biome](https://biomejs.dev/) 进行代码格式化和检查。

**格式化代码：**

```bash
# 格式化所有代码
pnpm format

# 检查代码格式（不修改）
pnpm lint
```

**Biome 配置要点：**
- 使用 Tab 缩进
- 使用双引号
- 自动组织导入

### 代码检查

在提交前，确保代码通过所有检查：

```bash
# 类型检查
pnpm check

# 代码检查
pnpm lint

# 运行测试
pnpm test
```

### Git Hooks

项目使用 [Lefthook](https://github.com/evilmartians/lefthook) 管理 Git hooks：

- **pre-commit**: 自动格式化暂存的文件
- **commit-msg**: 验证提交信息格式

这些 hooks 会在您提交时自动运行，确保代码质量和提交规范。

## 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

### 提交类型

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响代码运行）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具链更新
- `ci`: CI 配置更新

### 提交格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

**示例：**

```
feat(client): 添加配置搜索功能

- 实现按名称和状态搜索
- 添加搜索高亮显示
- 更新相关测试

Closes #123
```

**使用 `pnpm commit` 命令可以交互式地创建符合规范的提交信息。**

## Pull Request 流程

### 创建 PR 前

- [ ] 代码已通过所有测试
- [ ] 代码已通过类型检查 (`pnpm check`)
- [ ] 代码已通过代码检查 (`pnpm lint`)
- [ ] 代码已格式化 (`pnpm format`)
- [ ] 已添加或更新相关测试
- [ ] 已更新相关文档（如需要）
- [ ] 提交信息符合规范

### PR 标题和描述

**标题格式：**
```
<type>(<scope>): <简短描述>
```

**描述模板：**

```markdown
## 变更类型
- [ ] Bug 修复
- [ ] 新功能
- [ ] 文档更新
- [ ] 代码重构
- [ ] 性能优化
- [ ] 其他（请说明）

## 变更描述
<!-- 描述本次 PR 的主要变更 -->

## 相关 Issue
<!-- 关联的 Issue 编号，如 Closes #123 -->

## 测试说明
<!-- 说明如何测试这些变更 -->

## 截图（如适用）
<!-- 如果是 UI 相关的变更，请提供截图 -->
```

### PR 审查

- 维护者会审查您的 PR
- 可能会要求修改或提供更多信息
- 请及时响应审查意见
- 所有 CI 检查必须通过

## 项目结构

```
honeycomb/
├── packages/
│   ├── honeycomb-client/    # Vue.js 3 前端应用
│   │   ├── src/
│   │   │   ├── api/         # API 调用
│   │   │   ├── components/  # Vue 组件
│   │   │   ├── composables/ # Vue Composables
│   │   │   └── utils/       # 工具函数
│   │   └── ...
│   ├── honeycomb-server/    # Express 服务器
│   │   ├── src/
│   │   │   ├── routes/      # API 路由
│   │   │   ├── middleware/  # 中间件
│   │   │   └── ...
│   │   └── ...
│   ├── honeycomb-db/        # 数据库模块
│   │   └── src/
│   └── honeycomb-common/    # 共享类型定义
│       └── src/
├── scripts/                 # 构建和版本管理脚本
└── ...
```

## 测试

### 运行测试

```bash
# 运行所有测试
pnpm test

# 运行特定包的测试
pnpm --filter=@betterhyq/honeycomb-client test
pnpm --filter=@betterhyq/honeycomb-server test
```

### 编写测试

- 使用 [Vitest](https://vitest.dev/) 作为测试框架
- 为新功能添加单元测试
- 为 Bug 修复添加回归测试
- 测试文件命名：`*.test.ts` 或 `*.spec.ts`

**示例：**

```typescript
import { describe, it, expect } from 'vitest'

describe('功能名称', () => {
  it('应该正确执行某个操作', () => {
    // 测试代码
    expect(result).toBe(expected)
  })
})
```

## 常见问题

### Q: 如何更新依赖？

A: 使用 `pnpm update` 更新依赖。重大更新建议先创建 Issue 讨论。

### Q: 提交时 hooks 失败了怎么办？

A: 检查错误信息，修复问题后重新提交。如果 hooks 有问题，可以运行 `pnpm prepare` 重新安装。

### Q: 如何添加新的包到 monorepo？

A: 在 `packages/` 目录下创建新目录，添加 `package.json`，然后在根目录运行 `pnpm install`。

### Q: 如何调试？

A: 
- 前端：使用浏览器开发者工具
- 后端：使用 Node.js 调试器或 `console.log`
- 测试：使用 Vitest 的调试功能

### Q: 代码审查需要多长时间？

A: 通常在 1-3 个工作日内会有反馈。如果超过一周没有反馈，可以友好地提醒维护者。

## 获取帮助

如果您在贡献过程中遇到问题：

1. 查看 [README.md](README.md) 了解项目基本信息
2. 查看 [ARCHITECTURE.md](ARCHITECTURE.md) 了解项目架构
3. 查看现有的 Issues 和 PRs
4. 创建新的 Issue 描述您的问题
5. 通过邮件联系我们：betterhyq@qq.com

## 致谢

感谢所有为 Honeycomb 项目做出贡献的开发者！您的贡献让这个项目变得更好。

---

**再次感谢您的贡献！** 🎉
