/**
 * Created by haizhi on 16/7/5.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
        loaders: [
            {
                test: /\.js?$/,
                include: APP_PATH,
                loader: ['babel-loader'],
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                include: APP_PATH,
                loader: ['style-loader','css-loader']
            },
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true}), //上线压缩
        //把入口文件里面的数组打包成verdors.js
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.ProvidePlugin({//注入插件的全局变量
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new HtmlWebpackPlugin({
            title: 'Hello World app'
        })
    ]
};