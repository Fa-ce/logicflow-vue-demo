/*
 * @Author: 一笑
 * @Date: 2024-11-29 15:17
 * @LastEditors: Fa-ce
 * @LastEditTime: 2025-08-22 11:36
 * 浮生千场醉
 */

export function processLine(lf) {
	// lf.register('polyline', ({ PolylineEdge, PolylineEdgeModel }) => {
	lf.register("polyline", (val) => {
		const { BezierEdge, BezierEdgeModel } = val;
		class View extends BezierEdge {}
		class ProcessModel extends BezierEdgeModel {
			initEdgeData(data) {
				super.initEdgeData(data);
				this.isExecuted = data.properties.isExecuted || false;
				this.isCurrent = data.properties.isCurrent || false;
			}
			getEdgeStyle() {
				const style = super.getEdgeStyle();
				if (this.isExecuted) {
					style.stroke = "green";
					style.strokeWidth = 2;
				}
				return style;
			}
			getEdgeAnimationStyle() {
				const style = super.getEdgeAnimationStyle();
				style.stroke = "dodgerBlue";
				if (this.isExecuted || this.isCurrent) {
					style.animationDuration = "60s";
					style.stroke = this.isExecuted ? "green" : "";
					style.stroke = this.isCurrent ? "deepPink" : "green";
				}
				return style;
			}
			setAttributes() {
				this.isAnimation = this.isCurrent;
			}
			setHovered(isHovered) {
				super.setHovered(isHovered);
				// if (this.isCurrent || this.isExecuted) return
				if (this.isCurrent) return;
				this.isAnimation = isHovered;
			}
		}

		return {
			type: "polyline",
			view: View,
			model: ProcessModel,
		};
	});
}

import { PolylineEdge, PolylineEdgeModel } from "@logicflow/core";
class ProcessModel extends PolylineEdgeModel {
	setAttributes() {
		const {
			properties: { isExecuted },
		} = this;

		if (isExecuted) {
			this.stroke = "green";
		}
	}
}
export const Polyline = {
	type: "polyline",
	view: PolylineEdge,
	model: ProcessModel,
};
