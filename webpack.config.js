const path = require('path');

module.exports = {
	entry: {
		App: './src/scripts/app.js'
	},
	output: {
		path: path.resolve(__dirname, './build/scripts'),
		filename: '[name].js'
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