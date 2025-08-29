<template>
	<div ref="myNode" class="node-title">
		<span class="node-icon">
			<i class="el-icon-video-play" />
		</span>
		<span class="node-name"><span></span></span>
	</div>
</template>

<script>
import variables from "../../style/variables.module.scss";
export default {
	props: {
		properties: Object,
	},
	methods: {},
	mounted() {
		let borderColor = variables.dragNodeBorderColor;

		if (!this?.properties?.frontend_status) {
			borderColor = variables.dangerColor;
		}
		this.$refs.myNode.style.border = `1px solid ${borderColor}`; //stroke边框
	},
};
</script>

<style scoped lang="scss">
.node-icon {
	color: #6bd452;
	font-size: 17px;
}
</style>
