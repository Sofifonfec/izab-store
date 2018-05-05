var path = require('path');

module.exports = {
	entry: {
		App: "./App/src/scripts/App.js",
		Vendor: "./App/src/scripts/Vendor.js"
	},
	output: {
		path: path.resolve(__dirname, "./App/build/scripts"),
		filename: "[name].js"
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				},
				test: /\.js$/,
				exclude: /node_modules/
			}
		]
	}
}