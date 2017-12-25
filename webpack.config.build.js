// 该配置文件, 专门用来项目上线时, 离线打包, 打包后的代码就可以部署到服务器上使用了

const path = require('path');                  // 内置的node模块
const htmlWP = require('html-webpack-plugin'); // html插件

// 要使用webpack内置的一个抽取公共模块插件, 所以导入
const webpack = require('webpack');

// 抽取css的插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// 压缩css
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {

    // 入口, 如果是一个对象, 则可以打包多个
    entry: {
        bundle: path.resolve(__dirname, './src/main.js'), // 从入口打包
        vender1: ['vue', 'vue-router', 'vuex'],                     // 指定多个包打包在一起
        vender2: ['element-ui'],                                    // 指定多个包打包在一起
        vender3: ['jquery', 'normalize.css', 'axios'],              // 指定多个包打包在一起
    },

    // 输出, 配置打包后文件的输出路径, 以及打包后的js文件名
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'                    // 注意: 如果有多个入口, 这里必须写活
    },
    
    plugins: [

        // 自动把打包js注入到html
        new htmlWP({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html'
        }),

        // 拆分公共js模块
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: [ 'vender1', 'vender2', 'vender3' ] // 把指定的入口模块当做公共模块打包
        // }),

        // 压缩js
        // new webpack.optimize.UglifyJsPlugin(),

        // 抽取css, 如果上面拆分js, 运行代码时会报webpack错误
        new ExtractTextPlugin("[name].css"),

        new OptimizeCssAssetsPlugin()
    ],

    module: {

        // 配置非js模块的处理规则
        rules: [

            // css模块
            {
                test: /\.css$/,
                // use: [ 'style-loader', 'css-loader' ]
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },

            // less模块
            {
                test: /\.less$/,
                // use: [ 'style-loader', 'css-loader', 'less-loader' ]
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'less-loader']
                })
            },

            // 静态资源引入模块
            {
                test: /\.(gif|png|jpg|svg|mp3|mp4|avi|woff|ttf|eot)/,
                use: [
                    // 小于10KB的才打包
                    {
                        loader: 'url-loader',
                        options: { limit: 10240 }
                    }
                ]
            },

            // js模块
            {
                test: /\.js$/,
                use: [ 'babel-loader' ],
                exclude: /node_modules/   // 第三方的js, 不需要语法转换, 所以排除掉
            },

            // vue模块
            {
                test: /\.vue$/,
                use: [ 'vue-loader' ]
            }

        ]
    },

    // webpack-dev-server的配置
    devServer: {
        open: true,         // 服务启动后自动打开浏览器
        port: 8888,         // 服务端口
        contentBase: 'dist' // 开启服务的目录
    }

}
