<template>
	<div id="app">
		<Flow />
	</div>
</template>

<script>
import Flow from "./components/Flow.vue";
export default {
	name: "App",
	components: { Flow },
};
</script>
<style>
#app {
	height: 100vh;
	width: 100vw;
	overflow: hidden;
}
</style>
