/**
 * Created by haizhi on 16/7/5.
 */
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

var extractCSS = new ExtractTextPlugin("[name].[hash].css");

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var INDEX_SCRIPT = path.resolve(APP_PATH, 'index.js');


var config = {
    entry: {
        app: [
            path.resolve(APP_PATH, 'index.js')
        ],
        vendors: ['react','react-dom']//vendors.js 里面的文件

    },
    /*externals: {
        'react': 'react',
        'react-dom': 'react-dom'
    },*/
    output: {
        path: BUILD_PATH,
        filename: '[name].[hash].js',
        chunkFilename: '[id].chunk.js',
        // publicPath: '/build/'
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
                loader: extractCSS.extract('style', 'css!postcss')
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/i,
                loaders: ['url-loader?limit=8192&name=images/[name].[ext]']
            },
            {test: /\.eot/,loader : 'file?prefix=font/'},
            {test: /\.woff/,loader : 'file?prefix=font/&limit=10000&mimetype=application/font-woff'},
            {test: /\.ttf/, loader : 'file?prefix=font/'},
            {test: /\.svg/, loader : 'file?prefix=font/'}
        ],
        noParse: [
            // 'react-router/umd/ReactRouter.min.js',
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],//可以import .jsx文件的脚本
        alias: {//模块注册
            // 'react-router': 'react-router/umd/ReactRouter.min.js',
        }
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,  // remove all comments
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendors',  'vendors.js'),
        new webpack.DefinePlugin({
            // 'process.env.NODE_ENV': JSON.stringify('development')
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        extractCSS,
        /*new webpack.ProvidePlugin({//注入插件的全局变量
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),*/
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
    postcss: function () {
        return [autoprefixer({browsers:['last 2 versions']}), precss];
    },
    devtool: 'eval',
    devServer: {
        contentBase: BUILD_PATH,
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        host: '0.0.0.0',
        port: '8000',
        profile: true,
        colors: true,
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
module.exports = config;