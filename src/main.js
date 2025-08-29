import Vue from "vue";
import App from "./App.vue";
import Element from "element-ui";
import "./style/element-variables.scss";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

import Contextmenu from "vue-contextmenujs";
Vue.use(Contextmenu);

Vue.use(Element, {
	size: "medium", // set element-ui default size
});
new Vue({
	render: (h) => h(App),
}).$mount("#app");
