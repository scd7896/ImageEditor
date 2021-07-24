module.exports = function (env, args) {
	return {
		mode: env.production ? "production" : "development",
		devtool: env.production ? "source-map" : "eval",
		output: {
			filename: "./image-editor.min.js",
			libraryTarget: "commonjs",
		},
		entry: "./index.ts",
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".css", ".scss"],
		},
		module: {
			rules: [
				{
					test: /\.ts(x?)$/,
					use: ["babel-loader", "ts-loader"],
					exclude: ["/node_modules", "/index.ts"],
				},
				{
					test: /\.(png|jpe?g|gif|svg)$/i,
					loader: "url-loader",
					options: {
						limit: 8192,
					},
				},
			],
		},
	};
};
