/*
 * @Author: 一笑
 * @Date: 2024-11-28 15:37
 * @LastEditors: Fa-ce 3051810772@qq.com
 * @LastEditTime: 2024-11-29 10:45
 * 浮生千场醉
 */
export function registerTask(lf) {
    lf.register('task', ({ RectNode, RectNodeModel, h }) => {
        class View extends RectNode {
            getShape() {
                const { model } = this.props
                const { width, height, x, y } = model
                const position = {
                    x: x - width / 2,
                    y: y - height / 2,
                }
                const style = model.getNodeStyle()
                return h('rect', {
                    ...style,
                    ...position,
                })
            }
            getLabelShape() {
                const { model } = this.props
                const { x, y } = model
                return h(
                    'text',
                    {
                        fill: '#000000',
                        fontSize: 14,
                        x: x - 12,
                        y: y + 4,
                        width: 50,
                        height: 25,
                    },
                    'Start'
                )
            }
        }
        class Model extends RectNodeModel {
            constructor(data, graphModel) {
                super(data, graphModel)
                this.radius = 20
            }
        }
        return {
            view: View,
            model: Model,
        }
    })
}
