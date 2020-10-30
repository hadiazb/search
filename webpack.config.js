const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
	entry: {
		app: path.resolve(__dirname, './src/index.tsx'),
	},
	output: {
		filename: './[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	mode: 'development',
	devServer: {
		hot: true,
		open: true,
		port: 8000 || 3000,
		historyApiFallback: true,
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: 'awesome-typescript-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(jpg|png|gif|woff|eot|ttf|svg|mp4|webm)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 90000,
					},
				},
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'typescript',
			template: path.resolve(__dirname, './src/index.html'),
		}),
		new MiniCssExtractPlugin({
			filename: 'style.css',
		}),
	],
	devtool: 'source-map',
};
