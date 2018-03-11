const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const HtmlWebpackInlineAssetsPlugin = require('html-webpack-inline-assets-plugin');

/*

const isProd = process.env.NODE_ENV === 'production'; //true or false
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: '/dist'
})
*/

//const cssConfig = isProd ? cssProd : cssDev;


module.exports = {
    entry: {
        contacts: "./src/index.js",
        index: "./src/index.js",
        project: "./src/project.js",
        service: "./src/service.js",
        services: "./src/services.js",
        work: "./src/work.js"
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].bundle.js",
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
    	rules: [
    		{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'happypack/loader?id=js'
			},
            {
                test: /\.s?css$/,
                loader: 'happypack/loader?id=scss',
                enforce: "pre"
            },
            {
                test: /\.(jpg|png|svg)$/i,
                exclude: /fonts/,
                use: [
                    //'file-loader?name=[name].[ext]&outputPath=img/&useRelativePath=true',
                    'file-loader?name=[name].[ext]&outputPath=img',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                enabled: false,
                                progressive: false,
                                quality: 70
                            }
                        }
                    }
                ]  
            },
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				exclude: /img/,
				use: [
				    {
    				    loader: 'file-loader',
        				options: {
        				    name: 'fonts/[name].[ext]'
        				}
                    }
				]
			}
		]
    },
    
    devServer: {
        compress: true,
        hot: true,
        open: true,
        inline: true
    },

    plugins: [
        new webpack.ProvidePlugin({
            'utils': 'utils'
        }),

        new HappyPack({
          id: 'scss',
          threads: 4,
          loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        }),

        new HappyPack({
          id: 'js',
          threads: 4,
          loaders: ['babel-loader?presets[]=env']
        }),
        
        new HtmlWebpackPlugin({
		    filename: 'contacts.html',
		    cache: false,
    		title: 'Quar',
    		chunks: ['contacts'],
            template: './src/contacts.html',
		}),

		new HtmlWebpackPlugin({
		    filename: 'index.html',
		    cache: false,
    		title: 'Quar',
    		chunks: ['index'],
            template: './src/index.html',
            minify: {
             collapseWhitespace: true,
             preserveLineBreaks: true
            }
		}),
		
		new HtmlWebpackPlugin({
		    filename: 'project.html',
		    cache: false,
    		title: 'Quar',
    		chunks: ['project'],
            template: './src/project.html'
		}),
		
		new HtmlWebpackPlugin({
		    filename: 'service.html',
		    cache: false,
    		title: 'Quar',
    		chunks: ['service'],
            template: './src/service.html'
		}),
		
		new HtmlWebpackPlugin({
		    filename: 'services.html',
		    cache: false,
    		title: 'Quar',
    		chunks: ['services'],
            template: './src/services.html'
		}),
		
		new HtmlWebpackPlugin({
		    filename: 'work.html',
		    cache: false,
    		title: 'Quar',
    		chunks: ['work'],
            template: './src/work.html'
		}),

	]
};