<!--
 * @Author: 一笑
 * @Date: 2024-11-28 15:40
 * @LastEditors: Fa-ce 3051810772@qq.com
 * @LastEditTime: 2024-12-06 10:49
 * 浮生千场醉
-->
<template>
    <div class="connect">
        <h3 @click="handleClick('Drawer')">{{ newTitle }}</h3>
        <div class="button-list">
            <el-button @click="handleClick('Data')">重置数据</el-button>
            &nbsp;
            <el-button @click="handleClick('Expect')">重置预设值</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['name', 'Graph', 'title'],
        data() {
            return {
                newTitle: '评估',
            }
        },
        mounted() {
            this.Graph.eventCenter.on('setTitle', (val) => {
                this.newTitle = val
            })
        },
        methods: {
            handleClick(type) {
                this.$emit('fetchFlow', type)
            },
        },
        watch: {
            title: {
                handler(val) {
                    // this.newTitle = val
                    if (val) {
                        this.newTitle = val
                    }
                },
                immediate: true,
            },
        },
        beforeDestroy() {},
    }
</script>

<style scoped>
    .connect {
        width: 100%;
        height: 100%;
        background: #87cefa;
        color: black;
        border: 2px solid #1e90ff;
        border-radius: 5px;
        box-sizing: border-box;
        cursor: pointer;
        /* padding: 10px; */
        text-align: center;
        h3 {
            color: yellow;
        }
    }
    .button-list {
        /* position: absolute; */
        /* bottom: 10px; */
        /* display: flex; */
        /* justify-content: space-around; */
        /* align-items: center; */
    }
    ::v-deep .el-button--small {
        color: black;
    }
</style>
