var path = require('path');

module.exports = {
	entry: "./App/src/scripts/App.js",
	output: {
		path: path.resolve(__dirname, "./App/build/scripts"),
		filename: "App.js"
	}
}