<script setup lang="ts">
import { computed } from "vue";
import { ElMessage } from "element-plus";
import type { ServiceConfig } from "../api/configs";
import { StatusEnum } from "@betterhyq/honeycomb-common";

const props = defineProps<{
	modelValue: boolean;
	config: ServiceConfig | null;
}>();

const emit = defineEmits<{
	"update:modelValue": [value: boolean];
}>();

const dialogVisible = computed({
	get: () => props.modelValue,
	set: (value) => emit("update:modelValue", value),
});

// 格式化 JSON 字符串
const formatJson = (str: string) => {
	if (!str) return "未设置";
	try {
		const parsed = JSON.parse(str);
		return JSON.stringify(parsed, null, 2);
	} catch {
		return str;
	}
};

// 复制到剪贴板
const copyToClipboard = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text);
		ElMessage.success("已复制到剪贴板");
	} catch (error) {
		ElMessage.error("复制失败");
	}
};

// 导出配置为 JSON
const exportConfig = () => {
	if (!props.config) return;
	const jsonStr = JSON.stringify(props.config, null, 2);
	const blob = new Blob([jsonStr], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `${props.config.name}-${props.config.version}.json`;
	a.click();
	URL.revokeObjectURL(url);
	ElMessage.success("配置已导出");
};
</script>

<template>
	<el-dialog
		v-model="dialogVisible"
		title="服务详情"
		width="70%"
		:close-on-click-modal="false"
	>
		<template v-if="config">
			<el-descriptions :column="2" border>
				<el-descriptions-item label="服务名称">
					{{ config.name }}
				</el-descriptions-item>
				<el-descriptions-item label="版本号">
					<el-tag type="info">{{ config.version }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="状态">
					<el-tag
						:type="config.status === StatusEnum.RUNNING ? 'success' : 'warning'"
					>
						{{ config.statusText }}
					</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="工具数量">
					<el-tag type="primary">{{ config.tools.length }} 个</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="创建时间" :span="2">
					{{ config.createdAt }}
				</el-descriptions-item>
				<el-descriptions-item label="最后修改时间" :span="2">
					{{ config.lastModified }}
				</el-descriptions-item>
				<el-descriptions-item label="描述" :span="2">
					{{ config.description }}
				</el-descriptions-item>
			</el-descriptions>

			<el-divider content-position="left">工具列表</el-divider>

			<el-card
				v-for="(tool, index) in config.tools"
				:key="index"
				class="tool-card"
				shadow="hover"
			>
				<template #header>
					<el-space :size="16" style="width: 100%" justify="space-between">
						<el-space :size="10">
							<el-tag type="primary" size="small">{{ tool.name }}</el-tag>
							<el-text type="info" size="small">{{
								tool.description
							}}</el-text>
						</el-space>
						<el-button
							size="small"
							link
							type="primary"
							@click="copyToClipboard(JSON.stringify(tool, null, 2))"
						>
							复制工具信息
						</el-button>
					</el-space>
				</template>

				<el-descriptions :column="1" border size="small">
					<el-descriptions-item label="工具名称">
						{{ tool.name }}
					</el-descriptions-item>
					<el-descriptions-item label="工具描述">
						{{ tool.description }}
					</el-descriptions-item>
					<el-descriptions-item label="输入 Schema">
						<el-scrollbar height="150px">
							<pre class="schema-pre">{{
								formatJson(tool.input_schema)
							}}</pre>
						</el-scrollbar>
						<el-button
							size="small"
							link
							type="primary"
							class="copy-button"
							@click="copyToClipboard(tool.input_schema)"
						>
							复制
						</el-button>
					</el-descriptions-item>
					<el-descriptions-item label="输出 Schema">
						<el-scrollbar height="150px">
							<pre class="schema-pre">{{
								formatJson(tool.output_schema)
							}}</pre>
						</el-scrollbar>
						<el-button
							size="small"
							link
							type="primary"
							class="copy-button"
							@click="copyToClipboard(tool.output_schema)"
						>
							复制
						</el-button>
					</el-descriptions-item>
					<el-descriptions-item label="回调函数">
						<el-scrollbar height="200px">
							<pre class="schema-pre">{{
								tool.callback || "未设置"
							}}</pre>
						</el-scrollbar>
						<el-button
							v-if="tool.callback"
							size="small"
							link
							type="primary"
							class="copy-button"
							@click="copyToClipboard(tool.callback)"
						>
							复制
						</el-button>
					</el-descriptions-item>
				</el-descriptions>
			</el-card>

			<el-empty
				v-if="config.tools.length === 0"
				description="该服务暂无工具"
			/>
		</template>
		<template #footer>
			<el-space :size="10" style="width: 100%" justify="space-between">
				<el-button
					v-if="config"
					type="primary"
					@click="exportConfig"
				>
					导出配置为 JSON
				</el-button>
				<el-button @click="dialogVisible = false">关闭</el-button>
			</el-space>
		</template>
	</el-dialog>
</template>

<style scoped>
.tool-card {
	margin-bottom: 15px;
}

.schema-pre {
	margin: 0;
	font-size: 12px;
}

.copy-button {
	margin-top: 5px;
}
</style>
