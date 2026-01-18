import swaggerJsdoc from "swagger-jsdoc";

/**
 * Swagger 配置选项
 */
export const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Honeycomb MCP Server API",
			version: "1.0.0",
			description: "Honeycomb MCP 服务配置管理 API 文档",
			contact: {
				name: "API Support",
			},
		},
		servers: [
			{
				url: `http://${process.env.HOST || "0.0.0.0"}:${process.env.PORT || 3002}`,
				description: "本地开发服务器",
			},
		],
		components: {
			schemas: {
				QueryConfigVO: {
					type: "object",
					properties: {
						id: {
							type: "integer",
							description: "配置 ID",
						},
						name: {
							type: "string",
							description: "服务名称",
						},
						version: {
							type: "string",
							description: "版本号",
							example: "1.0.0",
						},
						status: {
							type: "string",
							enum: ["running", "stopped"],
							description: "服务状态",
						},
						statusText: {
							type: "string",
							description: "状态文本",
							example: "运行中",
						},
						description: {
							type: "string",
							description: "服务描述",
						},
						tools: {
							type: "array",
							items: {
								$ref: "#/components/schemas/Tool",
							},
							description: "工具列表",
						},
						createdAt: {
							type: "string",
							format: "date-time",
							description: "创建时间",
						},
						lastModified: {
							type: "string",
							format: "date-time",
							description: "最后修改时间",
						},
					},
					required: [
						"id",
						"name",
						"version",
						"status",
						"statusText",
						"description",
						"tools",
						"createdAt",
						"lastModified",
					],
				},
				Tool: {
					type: "object",
					properties: {
						name: {
							type: "string",
							description: "工具名称",
						},
						description: {
							type: "string",
							description: "工具描述",
						},
						input_schema: {
							type: "string",
							description: "输入 Schema（JSON Schema 字符串）",
						},
						output_schema: {
							type: "string",
							description: "输出 Schema（JSON Schema 字符串）",
						},
						callback: {
							type: "string",
							description: "回调函数代码",
						},
					},
					required: ["name", "description"],
				},
				ApiResponse: {
					type: "object",
					properties: {
						code: {
							type: "integer",
							description: "响应代码",
						},
						msg: {
							type: "string",
							description: "响应消息",
						},
						data: {
							type: "object",
							description: "响应数据",
						},
					},
					required: ["code", "msg"],
				},
				ErrorResponse: {
					type: "object",
					properties: {
						code: {
							type: "integer",
							description: "错误代码",
						},
						msg: {
							type: "string",
							description: "错误消息",
						},
						data: {
							type: "null",
							description: "错误时数据为 null",
						},
					},
					required: ["code", "msg", "data"],
				},
			},
		},
		tags: [
			{
				name: "Configs",
				description: "MCP 服务配置管理",
			},
		],
	},
	apis: ["./src/routes/*.ts"], // 指向包含 JSDoc 注释的文件
};

/**
 * 生成 Swagger 规范
 */
export const swaggerSpec = swaggerJsdoc(swaggerOptions);
