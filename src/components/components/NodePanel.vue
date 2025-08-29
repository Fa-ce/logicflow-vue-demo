<template>
	<div class="node-panel">
		<!-- <el-radio-group v-model="radio" @input="changeRadio" size="mini">
			<el-radio-button size="mini" label="1">开启框选</el-radio-button>
			<el-radio-button size="mini" label="0">关闭框选</el-radio-button>
		</el-radio-group> -->
		<el-input
			v-model="filterText"
			prefix-icon="el-icon-search"
			placeholder="输入关键字"
			class="mt15"
			style="margin-bottom: 8px"
		>
		</el-input>
		<div class="group-tree" draggable style="cursor: pointer">
			<i class="el-icon-menu" style="color: #47c769; margin: 0 10px" />
			<span class="drag-label" @mousedown="mousedownFunc(groupNode)">流程分组</span>
		</div>
		<div>
			<el-tree
				ref="treeRef"
				:data="treeList"
				default-expand-all
				node-key="id"
				:props="treeProps"
				:draggable="false"
				:allow-drop="allowDrop"
				:filter-node-method="filterNodeMethod"
			>
				<template slot-scope="{ node, data }">
					<span class="custom-tree-node">
						<i class="el-icon-menu" v-if="!data.children" />
						<span class="drag-label" :title="node.label" @mousedown="mousedownFunc(data)">{{
							node.label
						}}</span>
					</span>
				</template>
			</el-tree>
		</div>
		<el-button @click="showModel">show model</el-button>
	</div>
</template>
<script>
const randomNumber = () => {
	var timestamp = Date.now().toString(); // 获取当前时间戳
	var random = Math.floor(Math.random() * 9000000000000000) + 1000000000000000; // 生成15位随机数
	var identifier = timestamp + random.toString(); // 结合时间戳和随机数
	if (identifier.length > 19) {
		identifier = identifier.substr(0, 19); // 如果标识符超过19位，则截取前19位
	}
	if (identifier.charAt(0) === "0") {
		identifier = "1" + identifier.substr(1); // 如果开头是0，则将第一个字符替换为1
	}
	return identifier;
};

export default {
	name: "NodePanel",
	props: {
		lf: null,
	},
	data() {
		return {
			treeList: [
				{
					id: "2",
					name: "通用节点",
					children: [
						{
							id: "21",
							type: "ordinary",
							name: "数据管理",
						},
						{
							id: "22",
							type: "ordinary",
							name: "指标体系",
						},
						{
							id: "23",
							type: "ordinary",
							name: "灵敏度",
						},
					],
				},
				{
					id: "3",
					name: "效能节点",
					children: [
						{
							id: "31",
							type: "ordinary",
							name: "效能评估结果",
						},
					],
				},
				{
					id: "4",
					name: "关联度节点",
					children: [
						{
							id: "41",
							type: "ordinary",
							name: "效能评估结果",
						},
					],
				},
				{
					id: "5",
					name: "贡献率节点",
					children: [
						{
							id: "51",
							type: "ordinary",
							name: "使命任务分析",
						},
						{
							id: "52",
							type: "ordinary",
							name: "场景设置",
						},
						{
							id: "53",
							type: "ordinary",
							name: "评估矩阵",
						},
						{
							id: "54",
							type: "ordinary",
							name: "贡献率计算",
						},
					],
				},
			],
			filterText: "",
			treeProps: {
				children: "children",
				label: "name",
			},
			dragRow: {
				type: "ordinary",
			}, //拖拽的行
			randomNumber: null,
			radio: 1,
			groupNode: { id: "51", type: "custom-group", name: "使命任务分析" },
		};
	},
	watch: {
		filterText(val) {
			this.$refs.treeRef.filter(val);
		},
	},
	mounted() {
		this.lf.on("node:dnd-add", () => {
			if (this.dragRow.type == "start") {
				this.lf.setProperties(this.randomNumber, {
					frontend_status: "0", //0配置错误，1配置正常
				});
			}
		});
		this.changeRadio(this.radio);
	},
	methods: {
		//拖拽
		async mousedownFunc(val) {
			// console.log(val);
			let typeList = [
				"push",
				"start",
				"user",
				"end",
				"rect",
				"task",
				"download",
				"circle",
				"polygon",
				"diamond",
				"baseNode",
				"ordinary",
				"group",
				"custom-group",
			];
			if (typeList.includes(val.type)) {
				this.dragRow = val;
				this.randomNumber = randomNumber();
				this.lf.dnd.startDrag({
					type: val.type,
					text: val.name,
					// id: this.randomNumber,
				});
			}
		},
		// 停止拖拽时节点可放置的位置
		allowDrop() {
			return false; // 停止拖拽后树节点位置不发生改变
		},
		filterNodeMethod(value, data) {
			if (!value) return true;
			return data.name.toLowerCase().indexOf(value.toLowerCase()) !== -1; //支持大小写模糊搜索
		},

		/* 切换框选状态 */
		changeRadio(val) {
			if (val) return this.lf.openSelectionSelect();
			this.lf.closeSelectionSelect();
		},

		/* 保存节点状态 */
		showModel() {
			console.log("this.lf.graphModel :>> ", this.lf.graphModel);
			console.log("this.lf.graphModel.nodes :>> ", this.lf.graphModel.nodes);
			console.log("this.lf.graphModel.edges :>> ", this.lf.graphModel.edges);
			console.log("this.lf.getGraphData() :>> ", this.lf.getGraphData());
		},
	},
};
</script>
<style lang="scss" scoped>
// 多行文本超出显示省略号
@mixin n-ellipsis($n) {
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: $n;
	-webkit-box-orient: vertical;
	text-overflow: ellipsis;
	word-break: break-all;
}

// 单行文本显示超出省略号
@mixin ellipsis($w) {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: $w;
	display: inline-block;
}

// @import "@/styles/variables.module.scss";
.node-panel {
	position: absolute;
	// top: 10px;
	left: 10px;
	width: 180px;
	padding: 10px 13px 20px;
	background-color: white;
	box-shadow: 0 0 10px 1px rgb(228, 224, 219);
	border-radius: 6px;
	// text-align: center;
	z-index: 101;
	.el-radio-group {
		margin-bottom: 10px;
	}
}
.node-item {
	margin-bottom: 20px;
}
.node-item-icon {
	width: 30px;
	height: 30px;
	margin-left: 20px;
	background-size: cover;
}
.node-label {
	font-size: 12px;
	margin-top: 5px;
	user-select: none;
}
.custom-tree-node {
	line-height: 15px;
	i {
		color: #fba905;
	}
	.drag-label {
		user-select: none; //禁止选择文本
		font-size: 14px;
		@include ellipsis(160px);
	}

	//赋值
	.assignment {
		color: #700efa;
		margin: 0 2px 0 0;
		font-size: 17px;
		position: relative;
		bottom: 4px;
	}

	//决策
	.decision {
		color: #fba905;
		margin: 0 3px 0 0;
		font-size: 15px;
		position: relative;
		bottom: 5px;
		left: 0px;
	}

	.startParallel {
		margin: 0 4px 0 0;
		font-size: 14px;
		position: relative;
		bottom: 5px;
	}

	.endParallel {
		margin: 0 4px 0 0;
		font-size: 14px;
		position: relative;
		bottom: 5px;
	}

	.machineLearning {
		margin: 0 4px 0 0;
		font-size: 14px;
		position: relative;
		bottom: 5px;
	}

	.deepLearning {
		margin: 0 4px 0 0;
		font-size: 14px;
		position: relative;
		bottom: 5px;
	}
}
.panelLayout {
	left: -10px;
}
</style>
