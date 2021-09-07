const path = require('path');

module.exports = {
	entry: './src/BMI.ts',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.ts/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	mode: 'development',
	target: 'node',
	resolve: {
		extensions: ['.js', '.ts'],
	},
};
