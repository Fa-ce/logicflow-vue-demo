/*
 * @Author: 一笑
 * @Date: 2024-11-28 15:40
 * @LastEditors: Fa-ce 3051810772@qq.com
 * @LastEditTime: 2024-12-06 10:30
 * 浮生千场醉
 */
import Vue from 'vue'
import Connect from './Connect.vue'

export function registerConnect(lf) {
    lf.register('connect', ({ HtmlNode, HtmlNodeModel, h, createApp }) => {
        class ConnectNode extends HtmlNode {
            setHtml(rootEl) {
                const { properties } = this.props.model
                const LFthis = this.props
                const el = document.createElement('div')
                rootEl.innerHTML = ''
                rootEl.appendChild(el)
                const Profile = Vue.extend({
                    render: function (h) {
                        return h(Connect, {
                            props: {
                                name: properties.name,
                                Graph: LFthis.graphModel,
                                title: properties.title,
                            },
                            on: {
                                'select-button': (type) => {
                                    this.$bus.$emit('select-button', {
                                        type,
                                    })
                                },
                                fetchFlow: (type) => {
                                    // this.$bus.$emit('fetchFlow', type)
                                    LFthis.graphModel.eventCenter.emit(
                                        'flow:next-step',
                                        {
                                            type,
                                            isCurrent: properties.isCurrent,
                                            isExecuted: properties.isExecuted,
                                        }
                                    )
                                },
                            },
                        })
                    },
                })
                new Profile().$mount(el)
            }
        }
        class ConnectNodeModel extends HtmlNodeModel {
            initNodeData(data) {
                if (data.text) {
                    data.text.editable = false
                }
                super.initNodeData(data)
                const width = 200
                const height = 100
                this.width = width
                this.height = height
                this.anchorsOffset = [
                    [width / 2, 0],
                    [0, height / 2],
                    [-width / 2, 0],
                    [0, -height / 2],
                ]
                this.isExecuted = data.properties.isExecuted || false
                this.isCurrent = data.properties.isCurrent || false
            }
            setAttributes() {
                let _this = this
                this.menu = [
                    {
                        text: this.isExecuted ? '重新评估' : '评估',
                        callback(node) {
                            _this.graphModel.eventCenter.emit(
                                'flow:next-step',
                                {
                                    node: node,
                                    type: 'Drawer',
                                    isCurrent: node.properties.isCurrent,
                                    isExecuted: node.properties.isExecuted,
                                    resetEvaluate: 'evaluate',
                                }
                            )
                        },
                        className: 'custom-setData',
                        icon: true,
                    },
                ]
                if (this.isCurrent) {
                    this.menu.push(
                        {
                            text: '重置数据',
                            callback(node) {
                                _this.graphModel.eventCenter.emit(
                                    'flow:next-step',
                                    {
                                        node: node,
                                        type: 'Data',
                                        isCurrent: node.properties.isCurrent,
                                        isExecuted: node.properties.isExecuted,
                                    }
                                )
                            },
                            className: 'custom-setData',
                            icon: true,
                        },
                        {
                            text: '重置预设值',
                            callback(node) {
                                _this.graphModel.eventCenter.emit(
                                    'flow:next-step',
                                    {
                                        node: node,
                                        type: 'Expect',
                                        isCurrent: node.properties.isCurrent,
                                        isExecuted: node.properties.isExecuted,
                                    }
                                )
                            },
                            className: 'custom-setData',
                            icon: true,
                        },
                        {
                            text: '下一步',
                            callback(node) {
                                _this.graphModel.eventCenter.emit(
                                    'custom:next-step',
                                    node
                                )
                            },
                            className: 'custom-next',
                            icon: true,
                        }
                    )
                }
            }
        }
        return {
            view: ConnectNode,
            model: ConnectNodeModel,
        }
    })
}
