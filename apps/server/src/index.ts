import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { createMcpServices, createMcpRouteHandler } from './mcp';
import { registerRoutes } from './routes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==================== Swagger 配置 ====================

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Honeycomb MCP Server API',
      version: '1.0.0',
      description: 'Honeycomb MCP 服务配置管理 API 文档',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: '本地开发服务器',
      },
    ],
    components: {
      schemas: {
        QueryConfigVO: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: '配置 ID',
            },
            name: {
              type: 'string',
              description: '服务名称',
            },
            version: {
              type: 'string',
              description: '版本号',
              example: '1.0.0',
            },
            status: {
              type: 'string',
              enum: ['running', 'stopped'],
              description: '服务状态',
            },
            statusText: {
              type: 'string',
              description: '状态文本',
              example: '运行中',
            },
            description: {
              type: 'string',
              description: '服务描述',
            },
            tools: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Tool',
              },
              description: '工具列表',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: '创建时间',
            },
            lastModified: {
              type: 'string',
              format: 'date-time',
              description: '最后修改时间',
            },
          },
          required: ['id', 'name', 'version', 'status', 'statusText', 'description', 'tools', 'createdAt', 'lastModified'],
        },
        Tool: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: '工具名称',
            },
            description: {
              type: 'string',
              description: '工具描述',
            },
            input_schema: {
              type: 'string',
              description: '输入 Schema（JSON Schema 字符串）',
            },
            output_schema: {
              type: 'string',
              description: '输出 Schema（JSON Schema 字符串）',
            },
            callback: {
              type: 'string',
              description: '回调函数代码',
            },
          },
          required: ['name', 'description'],
        },
        ApiResponse: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              description: '响应代码',
            },
            msg: {
              type: 'string',
              description: '响应消息',
            },
            data: {
              type: 'object',
              description: '响应数据',
            },
          },
          required: ['code', 'msg'],
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              description: '错误代码',
            },
            msg: {
              type: 'string',
              description: '错误消息',
            },
            data: {
              type: 'null',
              description: '错误时数据为 null',
            },
          },
          required: ['code', 'msg', 'data'],
        },
      },
    },
    tags: [
      {
        name: 'Configs',
        description: 'MCP 服务配置管理',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // 指向包含 JSDoc 注释的文件
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// ==================== 应用初始化 ====================

const app = express();
app.use(express.json());

// 批量创建 MCP 服务
const mcpHandlersMap = await createMcpServices();

// ==================== 路由配置 ====================

// Swagger UI 文档路由（需要在其他路由之前）
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Honeycomb API 文档',
}));

// 注册所有 REST API 路由
registerRoutes(app, mcpHandlersMap);

// Mount the SSE endpoints (API routes should be before static files)
app.get('/sse', createMcpRouteHandler(mcpHandlersMap, 'get'));
app.post('/messages', createMcpRouteHandler(mcpHandlersMap, 'post'));

// Serve static files from client/dist
const clientDistPath = path.resolve(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

// Handle SPA routing: all non-API routes should return index.html
app.get('/', (req, res, next) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

app.listen(3002, () => {
  console.log('Express MCP SSE server running on port 3002');
  console.log(`Serving client app from: ${clientDistPath}`);
});
