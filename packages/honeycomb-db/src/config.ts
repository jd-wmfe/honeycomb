import dotenv from 'dotenv'
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { consola } from "consola";

/**
 * 获取数据库文件路径
 * 优先使用环境变量 DATABASE_PATH，如果未设置则使用默认的相对路径
 */
export function getDatabasePath(): string {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const rootPath = join(__dirname, "../../../..");
  const envPath = join(rootPath, ".env");
  consola.info(`[Database] 使用环境变量文件: ${envPath}`);

  dotenv.config({ path: envPath })
  consola.info(`[Database] 使用环境变量 DATABASE_PATH: ${process.env.DATABASE_PATH}`);

  return join(rootPath, process.env.DATABASE_PATH || "mcp.db");
}
