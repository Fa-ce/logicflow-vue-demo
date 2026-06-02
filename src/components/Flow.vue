<template>
	<div class="flow-container">
		<!-- 左侧组件栏 -->
		<SelfNodePanel v-if="lf" :lf="lf" />
		<!-- 中间画布 -->
		<div ref="paper" class="canvas"></div>
		<!-- 右侧工具栏 -->
		<SelfControl v-if="lf" class="demo-control" :lf="lf" />
	</div>
</template>

<script>
import "@logicflow/core/lib/style/index.css";
import "@logicflow/core/es/index.css";
import LogicFlow from "@logicflow/core";
import {
	SelectionSelect,
	ProximityConnect,
	Menu,
	DndPanel,
	DynamicGroup,
} from "@logicflow/extension";

import { registerOrdinary, registerStart, registerLine, registerGroup } from "./registerNodes";

import SelfControl from "./components/Control.vue";
import SelfNodePanel from "./components/NodePanel.vue";

export default {
	components: { SelfControl, SelfNodePanel },
	data() {
		return {
			lf: null,
			selected: null,
			lastPoint: { x: 100, y: 100 },
		};
	},
	async mounted() {
		await this.init();
		await this.render();
		// await this.drawTools();
	},
	methods: {
		/* 初始化 LogicFlow 实例 */
		init() {
			const container = this.$refs.paper; // 你给 canvas 容器加 ref="canvas"
			const width = container.clientWidth - 5;
			const height = container.clientHeight - 5;
			this.lf = new LogicFlow({
				container,
				background: {
					backgroundColor: "#f0f4fb",
				},
				width,
				height,
				grid: {
					type: "dot",
					size: 20,
					// visible: false,
				},
				keyboard: {
					enabled: true,
					// shortcuts: [
					// 	{
					// 		keys: ["ctrl + c"],
					// 		callback: () => this.keyboardCopyHandler(),
					// 	},
					// 	// {
					// 	// 	keys: ["backspace", "delete"],
					// 	// 	callback: () => this.keyboardDelHandler(),
					// 	// },
					// ],
				},
				plugins: [SelectionSelect, ProximityConnect, Menu, DndPanel, DynamicGroup],
				adjustEdge: false, //允许调整边
				adjustEdgeStartAndEnd: false, //是否允许拖动边的端点来调整连线
				edgeSelectedOutline: true, //鼠标 hover 的时候显示边的外框
				edgeTextDraggable: false,
				nodeTextDraggable: false,
				// hoverOutline: false,
				nodeTextEdit: true, //节点是否可编辑。false不可编辑
				edgeTextEdit: false, //边是否可编辑。false不可编辑
				autoExpand: false, //点拖动靠近画布边缘时是否自动扩充画布
				textEdit: false, //是否开启文本编辑
				snapline: false, //对齐线。false不开启
				pluginsOptions: {
					// selectionSelect: {
					// 	exclusiveMode: false,
					// },
					proximityConnect: {
						enable: false, // 插件是否启用
						// distance, // 渐进连线阈值
						// reverseDirection, // 连线方向
					},
				},
			});
			this.lf.setTheme({
				baseNode: {
					fill: "#FFFFFF",
					stroke: "#000000",
					strokeWidth: 1,
				},
				circle: {
					stroke: "#000000",
					strokeWidth: 1,
				},
				rect: {
					fill: "#FFFFFF",
					stroke: "#000000",
					outlineColor: "#88f",
					strokeWidth: 1,
				},
				// polygon: {
				// 	strokeWidth: 1,
				// },
				nodeText: {
					color: "#000000",
					overflowMode: "ellipsis", //超出显示省略号
					padding: "0 15px",
					fontSize: 14,
				},
				edgeText: {
					color: "#000000",
					background: {
						fill: "#f0f4fb",
					},
				},
			});
			// 监听窗口变化，动态调整
			window.addEventListener("resize", this.updateSize);

			registerStart(this.lf);
			registerOrdinary(this.lf);
			registerLine(this.lf);
			registerGroup(this.lf);
			// registerUser(this.lf);
			// registerEnd(this.lf);
			// registerPush(this.lf, this.clickPlus, this.mouseDownPlus);
			// registerDownload(this.lf);
			// registerPolyline(this.lf);
			// registerTask(this.lf);
			// registerConnect(this.lf);
			// registerRect(this.lf);
			// processLine(this.lf); // 自定义连线
			// this.lf.register(Polyline);
		},

		/* 更新画布大小 */
		updateSize() {
			const container = this.$refs.paper;
			const { clientWidth, clientHeight } = container;
			this.lf.resize(clientWidth - 5, clientHeight - 5);
		},
		/* 请求、渲染画布数据 */
		render() {
			let flowJson = {
				nodes: [
					{
						id: "1706150553091901403",
						type: "start",
						x: 660,
						y: 70,
						properties: {
							variables: [],
							structs: [],
							frontend_status: "0",
							name: "方案概述",
						},
						text: {
							x: 660,
							y: 70,
							value: "方案概述",
						},
					},
				],
			};
			this.lf.render(flowJson);
			this.lfEvent();
			this.$nextTick(() => {
				// this.lf.openSelectionSelect();
				// this.lf.closeSelectionSelect()();
			});
		},

		// 注册事件
		lfEvent() {
			this.lf.on("node:dbclick", ({ data }) => {});
			this.lf.on("edge:dbclick", ({ data }) => {});
			//来自边的事件中心发出的事件
			this.lf.on("edge:app-config", (res) => {});
			this.lf.on("element:click", () => {});
			this.lf.on("blank:click", () => {});
			this.lf.on("connection:not-allowed", (data) => {});

			this.lf.on("edge:add", ({ data }) => {});

			this.lf.on("node:dnd-add", ({ data }) => {
				const { id, type } = data;
				if (type === "custom-group") return;
				const nodeGroup = this.lf.graphModel.dynamicGroup?.getGroupByNodeId(id);
				if (nodeGroup) {
					console.log("🚀 ~ lfEvent ~ nodeGroup:", nodeGroup);
					// const node = lf.addNode({
					// 	type: "rect",
					// 	x: groupModel.x,
					// 	y: groupModel.y,
					// });
					debugger;
					return;
				}
				this.lf.graphModel.deleteNode(data.id);
				this.$message.warning("节点只能放入分组节点中");
			});

			this.lf.on("node:delete", ({ data }) => {
				if (data.type === "start") {
					this.$nextTick(() => {
						this.lf.graphModel.addNode(data);
					});
					this.$message.warning("起始节点不可删除");
				}
			});
			this.lf.on("edge:delete", ({ data }) => {});
			this.lf.on("node:contextmenu", (val) => {
				const { data, e } = val;
				e.preventDefault();
				if (data.type === "start") return;
				this.$contextmenu({
					items: [
						// {
						// 	label: "新建子节点(横向)",
						// 	icon: "el-icon-plus",
						// 	onClick: () => {},
						// },
						// {
						// 	label: "新建子节点(纵向)",
						// 	icon: "el-icon-plus",
						// 	onClick: () => {},
						// 	divided: true,
						// },
						{
							label: "编辑节点",
							icon: "el-icon-edit",
							onClick: () => {},
							divided: true,
						},
						{
							label: "删除节点",
							icon: "el-icon-delete",
							onClick: () => {
								this.lf.deleteNode(data.id);
							},
						},
					],
					event: e, // 鼠标事件信息()
					zIndex: 3, // 菜单样式 z-index
					minWidth: 150, // 主菜单最小宽度
				});
			});

			this.lf.on("node:dragstart", ({ data }) => {
				const { id, type, x, y } = data;
				// const nodeModel = this.lf.getNodeModelById(id);
				// const parentId = nodeModel.parentId;
				// console.log("🚀 ~ lfEvent ~ no _ parentId:", parentId);
				// if (!parentId) return; // 没有分组，不做处理
				// console.log("🚀 ~ lfEvent ~ parentId:", parentId);

				// const parentModel = this.lf.getNodeModelById(parentId);
				// if (!parentModel) return;

				// const { x: px, y: py, width, height } = parentModel;
				// const halfW = width / 2;
				// const halfH = height / 2;

				// // 限制边界范围
				// const minX = px - halfW;
				// const maxX = px + halfW;
				// const minY = py - halfH;
				// const maxY = py + halfH;

				// // 超出边界 → 回滚
				// if (x < minX || x > maxX || y < minY || y > maxY) {
				// 	nodeModel.moveTo(Math.min(Math.max(x, minX), maxX), Math.min(Math.max(y, minY), maxY));
				// 	this.lf.toast("节点不能拖出分组范围");
				// }
			});

			// 监听分组状态变化
			this.lf.on("node:properties-change", ({ id, properties, preProperties }) => {
				const node = this.lf.getNodeModelById(id);
				if (node?.isGroup) {
					const wasCollapsed = preProperties.isCollapsed;
					const isCollapsed = properties.isCollapsed;

					if (wasCollapsed !== isCollapsed) {
						console.log(`分组 ${id} 状态变化: ${isCollapsed ? "折叠" : "展开"}`);
					}
				}
			});
		},

		clickPlus(e, attributes) {
			e.stopPropagation();
			console.log("clickPlus", e, attributes);
			const { clientX, clientY } = e;
			console.log(clientX, clientY);
			// this.addPanelStyle.top = clientY - 40 + "px";
			// this.addPanelStyle.left = clientX + "px";
			// this.showAddPanel = true;
			// this.addClickNode = attributes;
		},
		mouseDownPlus(e, attributes) {
			// e.stopPropagation();
			console.log("mouseDownPlus", e, attributes);
		},

		keyboardCopyHandler() {
			const elements = this.lf.getSelectElements(true);
			// debugger;
			// this.lf.clearSelectElements();
			// elements.edges.forEach((edge) => this.lf.deleteEdge(edge.id));
			// elements.nodes.forEach((node) => this.lf.deleteNode(node.id));
		},
		keyboardDelHandler() {
			const elements = this.lf.getSelectElements(true);
			debugger;
		},
	},
};
</script>
<style lang="scss">
.flow-container {
	margin: 10px;
	height: calc(100% - 30px);
	width: calc(100% - 20px);
	box-sizing: border-box;
	position: relative;
	.demo-control {
		position: absolute;
		right: 0px;
		top: 0px;
	}
}

.canvas {
	width: 100%;
	height: 100%;
}

.demo-title {
	text-align: center;
	margin: 20px;
}
.demo-control {
	position: absolute;
	top: 15px;
	right: 100px;
	z-index: 2;
}
#LF-view {
	width: 100%;
	height: 100%;
	outline: none;
}
.time-plus {
	cursor: pointer;
}
.add-panel {
	position: absolute;
	z-index: 11;
	background-color: white;
	padding: 10px 5px;
}
.el-drawer__body {
	height: 80%;
	overflow: auto;
	margin-top: -30px;
	z-index: 3;
}

.lf-node-text-auto-wrap {
	cursor: pointer;
}

/* 适应节点图标 */
.lf-node-text-ellipsis-content {
	padding: 0 8px 0 34px !important;
}
.node-title {
	height: 40px;
	width: 100%;
	background: #fff;
	border: 1px solid #e6f7ff;
	box-sizing: border-box;
	padding: 10px 10px 10px 6px;
	border-radius: 8px;
	cursor: pointer;
}
.node-icon {
	width: 26px;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
}
.node-name > span {
	border: none !important;
}

//logicflow小地图
.lf-mini-map {
	border: none !important;
	box-shadow: 3px 0 10px 1px rgb(228, 224, 219);
}

.lf-mini-map-header {
	border: none !important;
	font-size: 13px;
	height: 24px !important;
	line-height: 24px !important;
	// color: #fff;
	background-color: #ecf5ff !important;
	background-image: none !important;
}

.lf-mini-map-close {
	top: 2px !important;
}

@keyframes lf_animate_dash {
	to {
		stroke-dashoffset: 0;
	}
}
</style>
