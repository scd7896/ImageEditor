module.exports = function (env, args) {
	return {
		mode: env.production ? "production" : "development",
		output: {
			filename: "./image-editor.min.js",
		},
		entry: "./lib/ImageEditor/ImageEditor",
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".css", ".scss"],
		},
		module: {
			rules: [
				{
					test: /.js$/,
					use: ["babel-loader"],
				},
				{
					test: /\.ts(x?)$/,
					use: ["babel-loader", "ts-loader"],
					exclude: ["/node_modules"],
				},
				{
					test: /\.(png|jpe?g|gif|svg)$/i,
					loader: "url-loader",
					options: {
						limit: 8192,
					},
				},
				{
					test: /\.css/i,
					use: ["style-loader", "css-loader"],
				},
			],
		},
	};
};
