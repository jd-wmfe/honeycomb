/** 服务信息 */
export type ServerInfo = {
  name: string;
  version: string;
  description: string;
};

/** 工具信息 */
export type ToolInfo = {
  name: string;
  description: string;
  inputSchema: string;
  outputSchema: string;
  callback: string;
}
