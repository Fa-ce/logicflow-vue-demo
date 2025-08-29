import { dynamicGroup, RectResize } from "@logicflow/extension";

export function registerGroup(lf) {
	lf.register("custom-group", ({ RectNode, RectNodeModel, h }) => {
		class CustomNode extends RectResize.view {}
		const RectResizeMixin = (Base) => class extends Base {};
		class CustomNodeModel extends RectResizeMixin(RectResize.model) {}

		class CustomGroup extends dynamicGroup.view {
			// getShape() {
			// 	const { model } = this.props;
			// 	console.log("🚀 ~ CustomGroup ~ getShape ~ model:", model);
			// 	const { width, height, x, y } = model;
			// 	const position = {
			// 		x: x - width / 2,
			// 		y: y - height / 2,
			// 	};
			// 	const style = model.style || {};
			// 	return h("custom-group", {
			// 		...style,
			// 		strokeWidth: 1,
			// 		strokeDasharray: "3 3",
			// 		stroke: "#fec171",
			// 		radius: 5,
			// 		// ...position,
			// 	});
			// }
			getLabelShape() {
				const { model } = this.props;
				console.log("🚀 ~ CustomGroup ~ getLabelShape ~ model:", model);
				const { x, y } = model;
				return h(
					"text",
					{
						fill: "deeppink",
						fontSize: 14,
						x: 10,
						y: 10,
						width: 50,
						height: 25,
					},
					"Start"
				);
			}
		}
		class CustomGroupModel extends dynamicGroup.model {
			setAttributes() {
				// const size = 80
				// const circleOnlyAsTarget = {
				// 	validate: () => {
				// 		return false;
				// 	},
				// };
				// this.targetRules.push(circleOnlyAsTarget);
			}

			initNodeData(data) {
				super.initNodeData(data);
				this.foldable = true;
				this.resizable = true;
				this.properties = {
					children: [],
					collapsible: false, // 允许折叠
					isCollapsed: false, // 初始状态为展开
					width: 200, // 展开时的宽度
					height: 400, // 展开时的高度
					collapsedWidth: 80, // 折叠时的宽度
					collapsedHeight: 60, // 折叠时的高度
					radius: 5, // 圆角
					isRestrict: true, // 不限制子节点移动范围
					autoResize: true, // 不自动调整大小
					transformWithContainer: true, // 分组变换时同步变换子节点
					zIndex: -1000, // 层级
					autoToFront: true, // 选中时自动置顶
				};
				this.width = 230;
				this.height = 300;
				// this.collapsible = false; // 允许折叠
				// this.isCollapsed = false; // 初始状态为展开
				this.isRestrict = true; // 不限制子节点移动范围
				this.autoResize = true; // 不自动调整大小
				this.radius = 10;
			}

			// 自定义分组样式
			getNodeStyle() {
				const style = super.getNodeStyle();
				// style.stroke = "#989891";
				style.strokeWidth = 1;
				style.strokeDasharray = "3 3";
				// style.stroke = "#f56c6c";
				style.stroke = "#fec171";
				style.radius = 5;
				// style.fill = "#47C769";
				return style;
			}

			// 自定义拖入高亮样式
			getAddableOutlineStyle() {
				const style = super.getAddableOutlineStyle();
				style.stroke = "#52c41a";
				style.strokeDasharray = "4 4";
				style.strokeWidth = 2;
				return style;
			}

			foldGroup(folded) {
				super.foldGroup(folded);
				if (folded) {
					if (this.foldedText) {
						this.text = { ...this.foldedText };
					}
					if (!this.text) {
						this.text = "已折叠分组已折叠分组已折叠分组";
					}
					this.text.x = this.x + 10;
					this.text.y = this.y;
				} else {
					this.foldedText = { ...this.text };
					this.text = "";
				}
			}

			getAnchorStyle() {
				const style = super.getAnchorStyle();
				style.stroke = "#1890ff";
				style.fill = "#ffffff";
				// style.r = 8;
				return style;
			}

			// isAllowAppendIn(nodeData) {
			//   return false
			// }
		}
		return {
			view: CustomGroup,
			model: CustomGroupModel,
		};
	});
}
