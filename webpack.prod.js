const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');

module.exports = merge(common, {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                drop_console: true
            },
            minimize: true,
            sourceMap: true,
		}),
		new ExtractTextPlugin({
    		filename: 'style.css',
    		allChunks: true
		}),
		new PurifyCSSPlugin({
    		paths: glob.sync(path.join(__dirname, 'src/*.html'))
		})
	]
});
