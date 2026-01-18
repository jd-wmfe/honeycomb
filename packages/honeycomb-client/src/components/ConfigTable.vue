<script setup lang="ts">
import { StatusEnum } from "@betterhyq/honeycomb-common";
import type { ServiceConfig } from "../api/configs";
import { ElMessage } from "element-plus";
import consola from "consola";

defineProps<{
	loading: boolean;
	data: ServiceConfig[];
}>();

defineEmits<{
	edit: [id: number];
	start: [id: number];
	stop: [id: number];
	delete: [id: number];
}>();

// 生成 MCP 配置 JSON
const generateMCPConfig = (config: ServiceConfig): string => {
	const API_BASE_URL =
		import.meta.env.VITE_API_BASE_URL || "http://0.0.0.0:3002";
	const serviceId = config.id;
	const serviceName = config.name || "服务名";

	const mcpConfig = {
		mcpServers: {
			[serviceName]: {
				url: `${API_BASE_URL}/sse`,
				transport: "sse",
				type: "sse",
				headers: {
					MCP_ID: String(serviceId),
				},
			},
		},
	};

	return JSON.stringify(mcpConfig, null, 2);
};

// 复制 MCP 配置到剪切板
const copyMCPConfig = async (config: ServiceConfig) => {
	try {
		const mcpConfig = generateMCPConfig(config);

		// 优先使用 Clipboard API
		if (navigator.clipboard && navigator.clipboard.writeText) {
			await navigator.clipboard.writeText(mcpConfig);
			ElMessage.success("MCP 协议已复制到剪切板");
			return;
		}

		// 降级方案：使用传统的 execCommand 方法
		const textArea = document.createElement("textarea");
		textArea.value = mcpConfig;
		textArea.style.position = "fixed";
		textArea.style.left = "-999999px";
		textArea.style.top = "-999999px";
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		const successful = document.execCommand("copy");
		document.body.removeChild(textArea);

		if (successful) {
			ElMessage.success("MCP 协议已复制到剪切板");
		} else {
			throw new Error("execCommand 复制失败");
		}
	} catch (error) {
		consola.error("[Client] 复制 MCP 配置失败:", error);
		ElMessage.error("复制失败，请稍后重试");
	}
};
</script>

<template>
  <div>
    <el-table
      v-loading="loading"
      :data="data"
      class="config-table"
      stripe
      empty-text="暂无数据"
      :height="480"
    >
      <el-table-column property="name" label="服务名" width="200" fixed="left" />
    <el-table-column property="version" label="版本号" width="100" />
    <el-table-column property="status" label="状态" width="120">
      <template #default="scope">
        <el-tag :type="scope.row.status === StatusEnum.RUNNING ? 'success' : 'warning'">{{
          scope.row.statusText
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column property="description" label="描述" show-overflow-tooltip width="400" />
    <el-table-column property="tools" label="工具" width="400">
      <template #default="scope">
        <el-space wrap>
          <el-tag
            v-for="tool in scope.row.tools"
            :key="tool.name"
            type="info"
            size="small"
            effect="plain"
          >
            {{ tool.name }}
          </el-tag>
          <el-text v-if="scope.row.tools.length === 0" type="info" size="small">暂无工具</el-text>
        </el-space>
      </template>
    </el-table-column>
    <el-table-column property="createdAt" label="创建时间" width="200" />
    <el-table-column property="lastModified" label="最后修改时间" width="200" />

    <el-table-column fixed="right" width="240">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="copyMCPConfig(scope.row)"
          >复制 MCP</el-button
        >
        <el-button link type="primary" size="small" @click="$emit('edit', scope.row.id)"
          >编辑</el-button
        >
        <el-button
          v-if="scope.row.status === StatusEnum.STOPPED"
          link
          type="success"
          size="small"
          @click="$emit('start', scope.row.id)"
          >启动</el-button
        >
        <el-button
          v-if="scope.row.status === StatusEnum.RUNNING"
          link
          type="warning"
          size="small"
          @click="$emit('stop', scope.row.id)"
          >停止</el-button
        >
        <el-button link type="danger" size="small" @click="$emit('delete', scope.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<style scoped>
.config-table {
  width: 100%;
}

.config-table :deep(.el-table__header) {
  background: linear-gradient(135deg, var(--el-fill-color-light) 0%, var(--el-fill-color-lighter) 100%);
}

.config-table :deep(.el-table__row) {
  transition: all 0.2s ease;
}

.config-table :deep(.el-table__row:hover) {
  background-color: var(--el-color-primary-light-9) !important;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.1);
}

.config-table :deep(.el-table__row--striped) {
  background-color: var(--el-fill-color-lighter);
}

.config-table :deep(.el-table__row--striped:hover) {
  background-color: var(--el-color-primary-light-9) !important;
}
</style>
