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

var extractCSS = new ExtractTextPlugin("[name].css");

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, '__build__');



// entries.vendors = ['react','react-dom'];//vendors.js 里面的文件

function fsExistsSync(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}

var entries = fs.readdirSync(APP_PATH).reduce(function (entries, dir) {
    if (fs.statSync(path.join(APP_PATH, dir)).isDirectory()) {
        if(fsExistsSync(path.join(APP_PATH, dir, 'index.js'))) {
            entries['app/'+dir+'/index'] = path.join(APP_PATH, dir, 'index.js');
        }
    }
    return entries
}, {});

entries['custom_modules/WBGComponent/index'] = path.join(ROOT_PATH, 'custom_modules','WBGComponent');
entries['_source'] = path.join(ROOT_PATH, 'source', 'index.js');
entries['_vendors'] = ['react','react-dom','react-router','redux','react-redux'];

var config = {
    // context: ROOT_PATH,
    entry: entries,
    /*externals: {
     'react': 'react',
     'react-dom': 'react-dom'
     },*/
    output: {
        path: BUILD_PATH,
        filename: '[name].js',
        // chunkFilename: '[id].chunk.js',
        // publicPath: '/'
    },
    module: {
        perLoders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'jshint-loader'
            }
        ],
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: extractCSS.extract('style', 'css!postcss')
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/i,
                loaders: ['url-loader?limit=0&name=[path][name].[ext]']
            },
            { test: /\.svg/, loader: 'url?limit=0&mimetype=image/svg+xml&name=[path][name].[ext]' },
            { test: /\.woff/, loader: 'url?limit=0&mimetype=application/font-woff&name=[path][name].[ext]' },
            { test: /\.woff2/, loader: 'url?limit=0&mimetype=application/font-woff2&name=[path][name].[ext]' },
            { test: /\.[ot]tf/, loader: 'url?limit=0&mimetype=application/octet-stream&name=[path][name].[ext]' },
            { test: /\.eot/, loader: 'url?limit=0&mimetype=application/vnd.ms-fontobject&name=[path][name].[ext]' }
        ],
        noParse: [
            // 'react-router/umd/ReactRouter.min.js',
        ]
    },
    resolve: {
        modulesDirectories: ['web_modules', 'node_modules','custom_modules'],
        extensions: ['', '.js', '.jsx', '.css'],//可以import .jsx文件的脚本
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
        new webpack.optimize.CommonsChunkPlugin({
            name: '_vendors',
            filename: '_vendors.js',
            minChunks: Infinity
        }),//提取多入口文件公共依赖的模块
        new webpack.DefinePlugin({
            // 'process.env.NODE_ENV': JSON.stringify('development')
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        extractCSS
    ],
    node: {
        __dirname: true,
    },
    postcss: function () {
        return [autoprefixer({browsers:['last 5 versions']}), precss];
    },
    jshint: {
        "esnext": true
    },
};
fs.readdirSync(APP_PATH).forEach(function (dir) {
    if (fs.statSync(path.join(APP_PATH, dir)).isDirectory()) {
        if(fsExistsSync(path.join(APP_PATH, dir, 'index.js'))) {
            config.plugins.push(new HtmlwebpackPlugin({//自动在build 目录下创建html文件
                title: 'App '+ dir,
                template: path.resolve(ROOT_PATH, 'index.html'),
                filename: 'app/'+dir+'/index.html',
                chunks: ['app/'+dir + '/index','custom_modules/WBGComponent/index','_source'],
                inject: 'body'
            }));
        }
    }
});

module.exports = config;
