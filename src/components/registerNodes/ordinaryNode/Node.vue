<template>
	<div ref="myNode" class="node-title">
		<span class="node-icon">
			<i class="el-icon-menu" />
		</span>
		<span class="node-name"><span></span></span>
	</div>
</template>

<script>
export default {
	props: {
		properties: Object,
	},
	methods: {},

	mounted() {
		let borderColor = "#e6f7ff";

		if (!this?.properties?.frontend_status) {
			borderColor = "#f56c6c";
		}
		this.$refs.myNode.style.border = `1px solid ${borderColor}`; //stroke边框
	},
};
</script>

<style scoped lang="scss">
.node-icon {
	color: #e6a23c;
	font-size: 17px;
}
</style>
