/**
 * Created by haizhi on 16/7/5.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
module.exports = {
    entry: {
        app: [
            APP_PATH,
        ],
        vendors: ['jquery']//vendors.js 里面的文件

    },
    output: {
        path: BUILD_PATH,
        filename: '[name].[hash].js'
    },
    module: {
        perLoders: [
            {
                test: /\.js?$/,
                include: APP_PATH,
                loader: 'jshint-loader'
            }
        ],
        loaders: [
            {
                test: /\.js?$/,
                include: APP_PATH,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/i,
                loaders: ['url-loader?limit=8192']
            },
            {test: /\.eot/,loader : 'file?prefix=font/'},
            {test: /\.woff/,loader : 'file?prefix=font/&limit=10000&mimetype=application/font-woff'},
            {test: /\.ttf/, loader : 'file?prefix=font/'},
            {test: /\.svg/, loader : 'file?prefix=font/'}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']//可以import .jsx文件的脚本
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("[name].[hash].css", {allChunks: true}),
        new webpack.DefinePlugin({ "global.GENTLY": false }),
        new webpack.ProvidePlugin({//注入插件的全局变量
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new HtmlwebpackPlugin({//自动在build 目录下创建html文件
            title: 'React Test App',
            template: path.resolve(ROOT_PATH, 'index.html'),
            filename: 'index.html',
            chunks: ['app','vendors'],
            inject: 'body'
        }),
    ],
    node: {
        __dirname: true,
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: '/build',
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        host: '0.0.0.0',
        port: '8080',
        proxy: {
            '/api/*': {
                target: 'http://www.weibangong.com',
                secure: false,
                rewrite: function(req) {
                    req.url = req.url.replace(/^\/api/, '');
                }
            }
        }
    },
    jshint: {
        "esnext": true
    },
};