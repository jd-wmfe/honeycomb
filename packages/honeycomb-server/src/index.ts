import "dotenv/config";
import consola from "consola";
import { createApp } from "./app";

const PORT = Number(process.env.PORT) || 3002;
const HOST = process.env.HOST || "0.0.0.0";

// 创建并启动应用
const app = await createApp();

app.listen(PORT, HOST, () => {
  consola.success("═══════════════════════════════════════════════════════");
  consola.success(`🚀 Express MCP SSE server running on ${HOST}:${PORT}`);
  consola.info(`📚 API 文档地址: http://${HOST}:${PORT}/api-docs`);
  consola.info(`🌐 应用访问地址: http://${HOST}:${PORT}`);
  consola.success("═══════════════════════════════════════════════════════");
});
