export function registerLine(lf) {
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
				style.stroke = "#67c23a";
				// style.strokeWidth = 1;
				return style;
			}
			getEdgeAnimationStyle() {
				const style = super.getEdgeAnimationStyle();
				style.stroke = "dodgerBlue";
				style.animationDuration = "60s";
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
