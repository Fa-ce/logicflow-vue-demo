/*
 * @Author: 一笑
 * @Date: 2024-11-28 15:37
 * @LastEditors: Fa-ce 3051810772@qq.com
 * @LastEditTime: 2024-12-06 10:05
 * 浮生千场醉
 */
export function registerRect(lf) {
    lf.register('rect', ({ RectNode, RectNodeModel, h }) => {
        class View extends RectNode {
            // getShape() {
            //     const { model } = this.props
            //     const { width, height, x, y } = model
            //     const position = {
            //         x: x - width / 2,
            //         y: y - height / 2,
            //     }
            //     const style = model.getNodeStyle()
            //     console.info('style', style)
            //     return h('rect', {
            //         ...style,
            //         // opacity: 0.85, // 透明度
            //         // ...position,
            //     })
            // }
            // getLabelShape() {
            //     const { model } = this.props
            //     const { x, y } = model
            //     return h(
            //         'text',
            //         {
            //             fill: '#000000',
            //             fontSize: 16,
            //             x: x - 12,
            //             y: y + 4,
            //             width: 50,
            //             height: 25,
            //         },
            //         'rect'
            //     )
            // }
        }
        class Model extends RectNodeModel {
            constructor(data, graphModel) {
                super(data, graphModel)
                this.radius = 20
            }
            initNodeData(data) {
                super.initNodeData(data)
                this.isExecuted = data.properties.isExecuted || false
                this.isCurrent = data.properties.isCurrent || false
            }

            setAttributes() {
                let _this = this
                this.menu = [
                    {
                        text: this.isExecuted ? '修改数据' : '设置数据',
                        callback(node) {
                            _this.graphModel.eventCenter.emit(
                                'custom:set-step',
                                node
                            )
                        },
                        className: 'custom-setData',
                        icon: true,
                    },
                ]
                if (this.isCurrent) {
                    this.menu.push({
                        text: '下一步',
                        callback(node) {
                            _this.graphModel.eventCenter.emit(
                                'custom:next-step',
                                node
                            )
                        },
                        className: 'custom-next',
                        icon: true,
                    })
                }
            }
        }
        return {
            view: View,
            model: Model,
        }
    })
}
