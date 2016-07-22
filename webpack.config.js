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

entries['custom_modules/WBGComponent/index'] = path.join(ROOT_PATH, 'custom_modules','WBGComponent','index.js');
// entries['source/index'] = path.join(ROOT_PATH, 'source', 'index.js');
entries['_vendors'] = ['react','react-dom','react-router','redux','react-redux'];

var config = {
    context: ROOT_PATH,
    entry: entries,
    /*externals: {
        'react': 'react',
        'react-dom': 'react-dom'
    },*/
    output: {
        path: BUILD_PATH,
        filename: '[name].js',
        hotUpdateChunkFilename: '/[id].[hash].hot-update.js',
        hotUpdateMainFilename: '/[hash].hot-update.json',
        // chunkFilename: '[id].chunk.js',
        // publicPath: ''
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
                loader: extractCSS.extract('style', 'css?sourceMap!postcss')
                // loaders: ['style', 'css','postcss']
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/i,
                loaders: ['url-loader?limit=1&name=[path][name].[ext]']
            },
            { test: /\.svg/, loader: 'url?limit=1&mimetype=image/svg+xml&name=[path][name].[ext]' },
            { test: /\.woff/, loader: 'url?limit=1&mimetype=application/font-woff&name=[path][name].[ext]' },
            { test: /\.woff2/, loader: 'url?limit=1&mimetype=application/font-woff2&name=[path][name].[ext]' },
            { test: /\.[ot]tf/, loader: 'url?limit=1&mimetype=application/octet-stream&name=[path][name].[ext]' },
            { test: /\.eot/, loader: 'url?limit=1&mimetype=application/vnd.ms-fontobject&name=[path][name].[ext]' }
        ],
        noParse: [
            // 'react-router/umd/ReactRouter.min.js',
        ]
    },
    resolve: {
        modulesDirectories: ['web_modules', 'node_modules','custom_modules'],
        extensions: ['', '.js', '.jsx', '.css'],//可以import .jsx文件的脚本
    },
    fileLoader: {
        publicPath: function (url) {
            var exp = new RegExp('(images/|fonts/)');
            var publicUrl = url.substr(url.search(exp));
            return publicUrl;
        }
    },
    plugins: [
        /*new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,  // remove all comments
            },
            compress: {
                warnings: false
            }
        }),*/
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['custom_modules/WBGComponent/index','_vendors'],
            minChunks: Infinity
        }),//提取多入口文件公共依赖的模块
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
            // 'process.env.NODE_ENV': JSON.stringify('production')
        }),
        extractCSS,
        /*new webpack.ProvidePlugin({//注入插件的全局变量
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),*/
        /*new HtmlwebpackPlugin({//自动在build 目录下创建html文件
            title: 'React Test App',
            template: path.resolve(ROOT_PATH, 'index.html'),
            filename: 'App1/index.html',
            chunks: ['App1/index'],
            inject: 'body'
        }),*/
    ],
    node: {
        __dirname: true,
    },
    postcss: function () {
        return [autoprefixer({browsers:['last 5 versions']}), precss];
    },
    devtool: 'eval',
    devServer: {
        contentBase: BUILD_PATH,
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        host: '0.0.0.0',
        watch: true,
        port: '8001',
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



fs.readdirSync(APP_PATH).forEach(function (dir) {
    if (fs.statSync(path.join(APP_PATH, dir)).isDirectory()) {
        if(fsExistsSync(path.join(APP_PATH, dir, 'index.js'))) {
            config.plugins.push(new HtmlwebpackPlugin({//自动在build 目录下创建html文件
                title: 'App '+ dir,
                template: path.resolve(ROOT_PATH, 'index.html'),
                filename: 'app/'+dir+'/index.html',
                chunks: ['app/'+dir + '/index','custom_modules/WBGComponent/index','_vendors'],
                // chunks: ['app/'+dir + '/index'],
                inject: 'body',
                chunksSortMode: 'dependency'
            }));
        }
    }
});

module.exports = config;