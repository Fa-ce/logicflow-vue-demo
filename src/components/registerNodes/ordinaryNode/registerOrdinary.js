// import Vue from "vue";
// import start from "./start.vue";

// export function registerStart(lf) {
// 	lf.register("start", ({ HtmlNode, HtmlNodeModel, h }) => {
// 		class StartNode extends HtmlNode {
// 			setHtml(rootEl) {
// 				const { model } = this.props;
// 				const el = document.createElement("div");
// 				rootEl.innerHTML = "";
// 				rootEl.appendChild(el);
// 				const Profile = Vue.extend({
// 					render: function (h) {
// 						return h(start, {
// 							props: {
// 								properties: model.properties,
// 							},
// 							on: {
// 								"select-button": (type) => {
// 									console.log("select-button", type);
// 								},
// 							},
// 						});
// 					},
// 				});
// 				new Profile().$mount(el);
// 			}
// 		}
// 		class StartModel extends HtmlNodeModel {
// 			// createId() {
// 			// 	return randomNumber(); //id用随机数数字
// 			// }
// 			constructor(data, graphModel) {
// 				super(data, graphModel);
// 				this.menu = [
// 					{
// 						text: "删除",
// 						callback(node) {
// 							lf.deleteNode(node.id);
// 						},
// 					},
// 					{
// 						text: "复制",
// 						callback(node) {
// 							lf.cloneNode(node.id);
// 						},
// 					},
// 				];
// 			}
// 			getDefaultAnchor() {
// 				const { id, x, y, width, height } = this;
// 				const anchors = [];
// 				// anchors.push({
// 				//   x,
// 				//   y: y - height / 2,
// 				//   id: `${id}_incomming`,
// 				//   type: 'incomming',
// 				// });
// 				anchors.push({
// 					x,
// 					y: y + height / 2,
// 					id: `${id}_outgoing`,
// 					type: "outgoing",
// 				});
// 				return anchors;
// 			}
// 			initNodeData(data) {
// 				super.initNodeData(data);
// 				const width = 140;
// 				const height = 40;
// 				this.width = width;
// 				this.height = height;
// 				this.radius = 50;
// 				this.sourceRules = [
// 					{
// 						message: "【开始】只允许1个输出",
// 						validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
// 							const edges = this.graphModel.getNodeOutgoingEdge(sourceNode.id);
// 							if (edges.length >= 1) {
// 								return false;
// 							} else {
// 								return true;
// 							}
// 						},
// 					},
// 					{
// 						message: "输出不允许连接输出",
// 						validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
// 							if (targetAnchor.type === "incomming") {
// 								return true;
// 							} else {
// 								return false;
// 							}
// 						},
// 					},
// 				];
// 			}
// 		}
// 		return {
// 			view: StartNode,
// 			model: StartModel,
// 		};
// 	});
// }

import Vue from "vue";
import Node from "./Node.vue";

export function registerOrdinary(lf) {
	lf.register("ordinary", ({ HtmlNode, HtmlNodeModel, h, createApp }) => {
		class OrdinaryNode extends HtmlNode {
			setHtml(rootEl) {
				const { properties } = this.props.model;
				const LFthis = this.props;
				const el = document.createElement("div");
				rootEl.innerHTML = "";
				rootEl.appendChild(el);
				const Profile = Vue.extend({
					render: function (h) {
						return h(Node, {
							props: {
								name: properties.name,
								Graph: LFthis.graphModel,
								title: properties.title,
							},
							on: {
								"select-button": (type) => {
									this.$bus.$emit("select-button", {
										type,
									});
								},
								fetchFlow: (type) => {
									// this.$bus.$emit('fetchFlow', type)
									LFthis.graphModel.eventCenter.emit("flow:next-step", {
										type,
										isCurrent: properties.isCurrent,
										isExecuted: properties.isExecuted,
									});
								},
							},
						});
					},
				});
				new Profile().$mount(el);
			}
		}
		class OrdinaryNodeModel extends HtmlNodeModel {
			initNodeData(data) {
				super.initNodeData(data);
				// const width = 200;
				// const height = 100;
				const width = 140;
				const height = 40;
				this.width = width;
				this.height = height;
				this.anchorsOffset = [
					[width / 2, 0],
					[0, height / 2],
					[-width / 2, 0],
					[0, -height / 2],
				];
				this.isExecuted = data.properties?.isExecuted || false;
				this.isCurrent = data.properties?.isCurrent || false;
			}
			setAttributes() {
				let _this = this;
				this.menu = [
					{
						text: this.isExecuted ? "重新评估" : "评估",
						callback(node) {
							_this.graphModel.eventCenter.emit("flow:next-step", {
								node: node,
								type: "Drawer",
								isCurrent: node.properties.isCurrent,
								isExecuted: node.properties.isExecuted,
								resetEvaluate: "evaluate",
							});
						},
						className: "custom-setData",
						icon: true,
					},
				];
				// if (this.isCurrent) {
				// 	this.menu.push(
				// 		{
				// 			text: "重置数据",
				// 			callback(node) {
				// 				_this.graphModel.eventCenter.emit("flow:next-step", {
				// 					node: node,
				// 					type: "Data",
				// 					isCurrent: node.properties.isCurrent,
				// 					isExecuted: node.properties.isExecuted,
				// 				});
				// 			},
				// 			className: "custom-setData",
				// 			icon: true,
				// 		},
				// 		{
				// 			text: "重置预设值",
				// 			callback(node) {
				// 				_this.graphModel.eventCenter.emit("flow:next-step", {
				// 					node: node,
				// 					type: "Expect",
				// 					isCurrent: node.properties.isCurrent,
				// 					isExecuted: node.properties.isExecuted,
				// 				});
				// 			},
				// 			className: "custom-setData",
				// 			icon: true,
				// 		},
				// 		{
				// 			text: "下一步",
				// 			callback(node) {
				// 				_this.graphModel.eventCenter.emit("custom:next-step", node);
				// 			},
				// 			className: "custom-next",
				// 			icon: true,
				// 		}
				// 	);
				// }
			}
		}
		return {
			view: OrdinaryNode,
			model: OrdinaryNodeModel,
		};
	});
}
