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
- 🧪 **完整的测试覆盖**：单元测试和集成测试
- 🔒 **代码质量保障**：ESLint、Prettier、TypeScript 类型检查
- 📝 **规范化提交**：Commitizen + Conventional Changelog

## 🏗️ 项目结构

```
honeycomb/
├── packages/
│   ├── honeycomb-client/   # Vue.js 3 前端应用
│   │   ├── src/
│   │   │   ├── components/     # Vue 组件
│   │   │   ├── composables/    # Vue Composables
│   │   │   ├── api/            # API 接口
│   │   │   └── utils/          # 工具函数
│   │   └── vite.config.ts      # Vite 配置
│   ├── honeycomb-server/   # Express 服务器
│   │   ├── src/
│   │   │   ├── routes/         # API 路由
│   │   │   ├── middleware/     # 中间件
│   │   │   ├── config/         # 配置文件
│   │   │   └── mcp.ts          # MCP 服务管理
│   │   └── build.config.ts     # 构建配置
│   ├── honeycomb-db/       # 数据库模块（SQL.js + Kysely）
│   │   ├── src/
│   │   │   ├── database.ts     # 数据库操作
│   │   │   └── config.ts       # 数据库配置
│   │   └── mcp.db              # SQLite 数据库文件
│   └── honeycomb-common/   # 共享 TypeScript 类型定义
│       └── src/
│           ├── dto.ts          # 数据传输对象
│           ├── vo.ts           # 视图对象
│           ├── enum.ts         # 枚举定义
│           └── model.ts        # 数据模型
├── scripts/                # 构建和版本管理脚本
├── .github/                # GitHub 配置（CI/CD、Issue 模板等）
└── turbo.json              # Turbo 构建配置
```

## 🚀 快速开始

### 前置要求

- **Node.js** >= 18（推荐使用 `.nvmrc` 中指定的版本）
- **pnpm** >= 8（推荐使用 `package.json` 中指定的版本：10.25.0）

### 安装依赖

```bash
# 克隆项目
git clone <repository-url>
cd honeycomb

# 安装依赖
pnpm install
```

### 开发模式

**推荐方式：使用根目录命令（并行启动）**

```bash
# 并行启动所有服务（前端 + 后端）
pnpm dev
```

这将同时启动：

- 后端服务器：`http://localhost:3002`
- 前端开发服务器：`http://localhost:5173`

**方式二：分别启动**

1. **启动服务器**

```bash
cd packages/honeycomb-server
pnpm build && pnpm start
```

2. **启动客户端**（新终端）

```bash
cd packages/honeycomb-client
pnpm dev
```

### 访问应用

- **Web 界面**：http://localhost:3002（生产模式）或 http://localhost:5173（开发模式）
- **API 文档**：http://localhost:3002/api-docs

### 构建生产版本

```bash
# 构建所有包
pnpm build

# 启动生产服务器
pnpm start
```

## 📦 技术栈

### 前端

- **Vue.js 3** - 渐进式 JavaScript 框架
- **Element Plus** - Vue 3 组件库
- **Vite** - 下一代前端构建工具
- **TypeScript** - 类型安全的 JavaScript
- **Axios** - HTTP 客户端

### 后端

- **Express 5** - Node.js Web 框架
- **@modelcontextprotocol/sdk** - MCP SDK
- **express-mcp-handler** - MCP Express 处理器
- **Swagger UI** - API 文档工具
- **Zod** - TypeScript 优先的 Schema 验证

### 数据库

- **SQL.js** - 基于 WebAssembly 的 SQLite
- **Kysely** - 类型安全的 SQL 查询构建器

### 工具链

- **pnpm workspace** - 高效的包管理器
- **Turbo** - 高性能构建系统
- **unbuild** - 统一的构建工具
- **Vitest** - 快速的单元测试框架
- **ESLint** - 代码检查工具
- **Prettier** - 代码格式化工具
- **Commitizen** - 规范化提交工具
- **Lefthook** - Git hooks 管理工具

## 📖 API 端点

### 配置管理

- `GET /api/configs` - 获取所有配置列表（包含工具信息）
- `GET /api/configs/:id` - 获取指定配置详情
- `POST /api/config` - 创建新配置
- `PUT /api/config/:id` - 更新配置
- `DELETE /api/config/:id` - 删除配置

### 服务控制

- `POST /api/config/:id/start` - 启动 MCP 服务
- `POST /api/config/:id/stop` - 停止 MCP 服务

所有 API 响应格式：

```json
{
  "code": 200,
  "msg": "success",
  "data": {}
}
```

## 🛠️ 开发命令

### 构建相关

```bash
pnpm build          # 构建所有包
pnpm start          # 启动生产服务器
pnpm dev            # 并行启动所有开发服务
pnpm clean          # 清理构建产物和依赖
```

### 代码质量

```bash
pnpm lint           # 运行 ESLint 检查
pnpm lint:fix       # 自动修复 ESLint 问题
pnpm format         # 使用 Prettier 格式化代码
pnpm format:check   # 检查代码格式
pnpm type-check     # TypeScript 类型检查
```

### 测试

```bash
pnpm test           # 运行所有测试
pnpm test:watch     # 监听模式运行测试
pnpm test:coverage  # 生成测试覆盖率报告
```

### 版本管理

```bash
pnpm bumpp          # 交互式版本升级
pnpm changelog      # 生成变更日志（基于最近一次 tag）
pnpm changelog:all  # 生成完整变更日志
pnpm commit         # 使用 Commitizen 规范化提交
```

## ⚙️ 环境变量配置

复制 `.env.example` 为 `.env` 并根据需要修改：

```bash
cp .env.example .env
```

主要配置项：

- `PORT` - 服务器端口（默认: 3002）
- `HOST` - 服务器主机（默认: 0.0.0.0）
- `NODE_ENV` - 运行环境（development/production）
- `VITE_API_BASE_URL` - 前端 API 基础地址

## 🧪 测试

项目使用 Vitest 作为测试框架，支持单元测试和集成测试。

```bash
# 运行所有测试
pnpm test

# 监听模式
pnpm test:watch

# 生成覆盖率报告
pnpm test:coverage

# 使用 UI 模式
cd packages/honeycomb-server
pnpm test:ui
```

## 📝 代码规范

### 提交规范

项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
# 使用 Commitizen 进行规范化提交
pnpm commit
```

提交类型：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建/工具链相关

### Git Hooks

项目使用 Lefthook 管理 Git hooks：

- **pre-commit**: 代码格式化和 lint 检查
- **commit-msg**: 提交信息格式验证

## 🔧 开发指南

### 添加新功能

1. 在 `honeycomb-common` 中定义类型和 DTO
2. 在 `honeycomb-db` 中添加数据库操作
3. 在 `honeycomb-server` 中添加 API 路由
4. 在 `honeycomb-client` 中添加 UI 组件

### 包依赖关系

```
honeycomb-client
  └── honeycomb-common

honeycomb-server
  ├── honeycomb-common
  └── honeycomb-db
      └── honeycomb-common

honeycomb-db
  └── honeycomb-common
```

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
