import { type Implementation } from '@modelcontextprotocol/sdk/types.js';
import { type ToolAnnotations } from '@modelcontextprotocol/sdk/types.js';
import { type ZodRawShapeCompat, type AnySchema } from '@modelcontextprotocol/sdk/server/zod-compat.js';
import { type ToolCallback as _ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js';

/** 服务信息 */
export type ServerInfo = Implementation;
/** 服务配置 */
export { type ServerOptions } from '@modelcontextprotocol/sdk/server/index.js';

/** 工具名称 */
export type ToolName = string;
type InputArgs = undefined | ZodRawShapeCompat | AnySchema;
type OutputArgs = ZodRawShapeCompat | AnySchema;
/** 工具配置 */
export type ToolConfig = {
    title?: string;
    description?: string;
    inputSchema?: InputArgs;
    outputSchema?: OutputArgs;
    annotations?: ToolAnnotations;
    _meta?: Record<string, unknown>;
}
/** 工具回调 */
export type ToolCallback = _ToolCallback<InputArgs>;
