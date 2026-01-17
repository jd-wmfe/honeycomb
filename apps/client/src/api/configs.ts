import { get, post, put, del, type ApiResponse } from '../request'

// 类型定义
export interface Tool {
  id?: number
  name: string
  description: string
  inputSchema: string
  outputSchema: string
  callback: string
}

export interface ServiceConfig {
  id: number
  name: string
  version: string
  status: 'running' | 'stopped'
  statusText: string
  description: string
  tools: Tool[]
  createdAt: string
  lastModified: string
}

export interface CreateConfigDto {
  name: string
  version: string
  status?: 'running' | 'stopped'
  statusText?: string
  description: string
  tools?: Tool[]
}

export interface UpdateConfigDto extends Partial<CreateConfigDto> {
  tools?: Tool[]
}

/**
 * 获取所有配置（带工具）
 */
export async function getConfigs(): Promise<ApiResponse<ServiceConfig[]>> {
  return get<ServiceConfig[]>('/api/configs')
}

/**
 * 获取单个配置（带工具）
 */
export async function getConfigById(id: number): Promise<ApiResponse<ServiceConfig>> {
  return get<ServiceConfig>(`/api/configs/${id}`)
}

/**
 * 创建配置
 */
export async function createConfig(config: CreateConfigDto): Promise<ApiResponse<ServiceConfig>> {
  return post<ServiceConfig>('/api/configs', config)
}

/**
 * 更新配置
 */
export async function updateConfig(
  id: number,
  config: UpdateConfigDto
): Promise<ApiResponse<ServiceConfig>> {
  return put<ServiceConfig>(`/api/configs/${id}`, config)
}

/**
 * 删除配置
 */
export async function deleteConfig(id: number): Promise<ApiResponse<null>> {
  return del<null>(`/api/configs/${id}`)
}

/**
 * 启动服务
 */
export async function startConfig(id: number): Promise<ApiResponse<ServiceConfig>> {
  return post<ServiceConfig>(`/api/configs/${id}/start`)
}

/**
 * 停止服务
 */
export async function stopConfig(id: number): Promise<ApiResponse<ServiceConfig>> {
  return post<ServiceConfig>(`/api/configs/${id}/stop`)
}
