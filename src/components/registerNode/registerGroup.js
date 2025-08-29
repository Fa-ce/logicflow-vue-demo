import { dynamicGroup, RectResize } from "@logicflow/extension";

export function registerGroup(lf) {
	lf.register("custom-group", ({ RectNode, RectNodeModel, h }) => {
		class CustomGroup extends dynamicGroup.view {
			getNodeStyle() {
				const style = super.getNodeStyle();
				style.stroke = "#989891";
				style.strokeWidth = 1;
				style.strokeDasharray = "3 3";
				if (this.isSelected) {
					style.stroke = "rgb(124, 15, 255)";
				}
				if (this.isFolded) {
					style.fill = "#47C769";
				}
				return style;
			}
			// getShape() {
			// 	const { model } = this.props;
			// 	const { width, height, x, y } = model;
			// 	const position = {
			// 		x: x - width / 2,
			// 		y: y - height / 2,
			// 	};
			// 	const style = model.getNodeStyle();
			// 	return h("custom-group", {
			// 		...style,
			// 		...position,
			// 	});
			// }
			// getLabelShape() {
			// 	const { model } = this.props;
			// 	const { x, y } = model;
			// 	return h(
			// 		"text",
			// 		{
			// 			fill: "#000000",
			// 			fontSize: 14,
			// 			x: x - 12,
			// 			y: y + 4,
			// 			width: 50,
			// 			height: 25,
			// 		},
			// 		"Start"
			// 	);
			// }
		}
		class CustomGroupModel extends dynamicGroup.model {
			setAttributes() {
				// const size = 80
				// const circleOnlyAsTarget = {
				// 	message: "正方形节点下一个节点只能是圆形节点",
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
					children: ["rect_3"],
					collapsible: true, // 允许折叠
					isCollapsed: false, // 初始状态为展开
					width: 420, // 展开时的宽度
					height: 250, // 展开时的高度
					collapsedWidth: 80, // 折叠时的宽度
					collapsedHeight: 60, // 折叠时的高度
					radius: 5, // 圆角
					isRestrict: true, // 不限制子节点移动范围
					autoResize: true, // 不自动调整大小
					transformWithContainer: true, // 分组变换时同步变换子节点
					zIndex: -1000, // 层级
					autoToFront: true, // 选中时自动置顶
				};
				this.width = 400;
				this.height = 200;
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
