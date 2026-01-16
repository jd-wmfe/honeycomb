/** 服务信息 */
export type ServerInfo = {
  name: string;
  version: string;
  description: string;
};

/** 工具名称 */
export type ToolName = string;
/** 工具配置 */
export type ToolConfig = {
  title: string;
  description: string;
  /** 压缩后的 Schema 配置 */
  inputSchema: string;
  /** 压缩后的 Schema 配置 */
  outputSchema: string;
};
/** 工具回调（压缩后的 TS 代码） */
export type ToolCallback = string;
