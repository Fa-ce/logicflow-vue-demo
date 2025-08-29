/*
 * @Author: 一笑
 * @Date: 2024-11-28 15:39
 * @LastEditors: Fa-ce 3051810772@qq.com
 * @LastEditTime: 2024-11-28 15:39
 * 浮生千场醉
 */
export function registerPolyline(lf) {
    lf.register('polyline', ({ PolylineEdge, PolylineEdgeModel }) => {
        class ConnnectionModel extends PolylineEdgeModel {
            constructor(data, graphModel) {
                super(data, graphModel)
            }
            setHovered(isHovered) {
                super.setHovered(isHovered)
                this.isAnimation = isHovered
            }
            getEdgeAnimationStyle() {
                const style = super.getEdgeAnimationStyle()
                style.animationName = 'lf_animate_dash'
                return style
            }
        }
        return {
            view: PolylineEdge,
            model: ConnnectionModel,
        }
    })
}
