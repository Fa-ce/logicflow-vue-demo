const { defineConfig } = require("@vue/cli-service");
const path = require("path");
function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = defineConfig({
	transpileDependencies: true,
	publicPath: "./", // 相对路径，确保 dist 下 index.html 能正确找到 js/css
	// publicPath:
	// 	process.env.NODE_ENV === "production"
	// 		? "/logicflow-vue-demo/" // 你的仓库名
	// 		: "/",
	configureWebpack: {
		resolve: {
			alias: {
				"@": resolve("src"),
			},
		},
		optimization: {
			splitChunks: {
				chunks: "all",
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendors",
						chunks: "all",
					},
				},
			},
		},
		// 开启 sourceMap
		devtool: "source-map",
	},
	chainWebpack(config) {
		// set svg-sprite-loader
		config.module.rule("svg").exclude.add(resolve("src/icons")).end();
		config.module
			.rule("icons")
			.test(/\.svg$/)
			.include.add(resolve("src/icons"))
			.end()
			.use("svg-sprite-loader")
			.loader("svg-sprite-loader")
			.options({
				symbolId: "icon-[name]",
			})
			.end();
	},
});
