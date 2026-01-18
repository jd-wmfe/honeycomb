import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { QueryConfigVO } from "@jd-wmfe/honeycomb-common";

// Tool 类型（从 QueryConfigVO 中提取）
type Tool = QueryConfigVO["tools"][number];

/**
 * 工具编辑 composable
 */
export function useToolEditor() {
	const editingToolIndex = ref<number | null>(null);
	const toolForm = ref<Partial<Tool>>({
		name: "",
		description: "",
		input_schema: "",
		output_schema: "",
		callback: "",
	});

	// 添加工具
	const addTool = (tools: Tool[]) => {
		editingToolIndex.value = tools.length;
		toolForm.value = {
			name: "",
			description: "",
			input_schema: "",
			output_schema: "",
			callback: "",
		};
	};

	// 编辑工具
	const editTool = (index: number, tools: Tool[]) => {
		if (index < 0 || index >= tools.length) return;
		editingToolIndex.value = index;
		const tool = tools[index];
		toolForm.value = {
			name: tool?.name,
			description: tool?.description,
			input_schema: tool?.input_schema,
			output_schema: tool?.output_schema,
			callback: tool?.callback,
		};
	};

	// 保存工具
	const saveTool = (tools: Tool[]) => {
		if (!toolForm.value.name || !toolForm.value.description) {
			ElMessage.warning("请填写工具名称和描述");
			return;
		}

		if (editingToolIndex.value === null) return;

		const tool: Tool = {
			name: toolForm.value.name || "",
			description: toolForm.value.description || "",
			input_schema: toolForm.value.input_schema || "",
			output_schema: toolForm.value.output_schema || "",
			callback: toolForm.value.callback || "",
		};

		if (editingToolIndex.value === tools.length) {
			// 新增
			tools.push(tool);
		} else {
			// 编辑
			tools[editingToolIndex.value] = tool;
		}

		editingToolIndex.value = null;
		toolForm.value = {
			name: "",
			description: "",
			input_schema: "",
			output_schema: "",
			callback: "",
		};
		ElMessage.success("工具保存成功");
	};

	// 取消编辑工具
	const cancelEditTool = () => {
		editingToolIndex.value = null;
		toolForm.value = {
			name: "",
			description: "",
			input_schema: "",
			output_schema: "",
			callback: "",
		};
	};

	// 删除工具
	const deleteTool = async (index: number, tools: Tool[]) => {
		try {
			await ElMessageBox.confirm("确定要删除该工具吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			});
			tools.splice(index, 1);
			ElMessage.success("删除成功");
		} catch {
			// 用户取消
		}
	};

	return {
		editingToolIndex,
		toolForm,
		addTool,
		editTool,
		saveTool,
		cancelEditTool,
		deleteTool,
	};
}
