# Honeycomb 🍯

基于 Model Context Protocol (MCP) 的服务配置管理平台，提供可视化的 MCP 服务配置和管理功能。

![site](./site.png)

## ✨ 特性

- 📊 **可视化配置界面**：基于 Vue.js 3 + Element Plus 的现代化 UI
- 🔧 **服务管理**：MCP 服务的创建、编辑、启动和停止
- 🛠️ **灵活的工具配置**：支持自定义工具回调函数，灵活配置输入/输出 Schema
- 📚 **API 文档**：集成 Swagger UI，提供完整的 API 文档
- 💾 **本地数据持久化**：基于 SQL.js 的轻量级数据库，无需额外数据库服务
- 🏗️ **Monorepo 架构**：使用 pnpm workspace + Turbo 构建的高效开发体验

## 🚀 快速开始

### 前置要求

- **Node.js** >= 24.11.1（推荐使用 `.nvmrc` 中指定的版本）
- **pnpm** >= 10.25.0（推荐使用 `package.json` 中指定的版本）

### 安装与运行

```bash
# 克隆项目
git clone <repository-url>
cd honeycomb

# 安装依赖
pnpm install

# 开发模式（并行启动前端和后端）
pnpm build
cd packages/honeycomb-server && pnpm start
cd packages/honeycomb-client && pnpm dev
```

访问应用：
- **Web 界面**：http://localhost:5173（开发模式）或 http://localhost:3002（生产模式）
- **API 文档**：http://localhost:3002/api-docs

### 生产构建

```bash
# 构建所有包
pnpm build

# 启动生产服务器
pnpm start
```

## 📦 技术栈

### 前端
- Vue.js 3 + Element Plus + Vite + TypeScript

### 后端
- Express 5 + MCP SDK + Swagger UI + Zod

### 数据库
- SQL.js + Kysely

### 工具链
- pnpm workspace + Turbo + Vitest + Biome

## 🏗️ 项目结构

```
honeycomb/
├── packages/
│   ├── honeycomb-client/    # Vue.js 3 前端应用
│   ├── honeycomb-server/    # Express 服务器
│   ├── honeycomb-db/        # 数据库模块（SQL.js + Kysely）
│   └── honeycomb-common/    # 共享 TypeScript 类型定义
├── scripts/                 # 构建和版本管理脚本
└── turbo.json               # Turbo 构建配置
```

## 🛠️ 常用命令

```bash
# 开发
pnpm dev              # 并行启动所有开发服务
pnpm build            # 构建所有包
pnpm start            # 启动生产服务器

# 代码质量
pnpm lint             # 代码检查
pnpm format           # 代码格式化
pnpm check            # 类型检查

# 测试
pnpm test             # 运行所有测试

# 版本管理
pnpm commit           # 规范化提交
pnpm bumpp            # 交互式版本升级
pnpm changelog        # 生成变更日志
```

## 📖 API 文档

启动服务后访问 http://localhost:3002/api-docs 查看完整的 API 文档。

主要 API 端点：
- `GET /api/configs` - 获取所有配置列表
- `POST /api/config` - 创建新配置
- `PUT /api/config/:id` - 更新配置
- `DELETE /api/config/:id` - 删除配置
- `POST /api/config/:id/start` - 启动 MCP 服务
- `POST /api/config/:id/stop` - 停止 MCP 服务

## 📝 代码规范

项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范，使用 `pnpm commit` 进行规范化提交。

Git hooks 通过 Lefthook 管理，自动进行代码格式化和提交信息验证。

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 使用 `pnpm commit` 进行规范化提交
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 许可证

ISC

---

Made with ❤️ by JD WMFE Team
