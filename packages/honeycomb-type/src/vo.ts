import { ServerInfo, ToolInfo } from "./base";

interface ServerVO extends ServerInfo {
    id: number;
    status: string;
    statusText: string;
    tools: Array<ToolInfo>
}

export interface QueryConfigsVO {
    code: number;
    msg: string;
    data: Array<ServerVO>;
}
