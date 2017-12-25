const path = require('path');                  // 内置的node模块
const htmlWP = require('html-webpack-plugin'); // html插件

module.exports = {

    // 入口, 打包谁配置谁
    entry: path.resolve(__dirname, './src/main.js'),

    // 输出, 配置打包后文件的输出路径, 以及打包后的js文件名
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },

    // 这个工具会自动压缩, 他的作用是为了调试, 在浏览器中可以看到源代码, 加断点, 
    // 虽然有时候不太准, 但是对于纯js脚本一般很准
    // 注意: 使用了该工具会向打包后的js文件注入大量辅助调试的脚本, 所以该工具在开发时使用, 上线前打包前面不要用
    devtool: 'cheap-module-eval-source-map',

    plugins: [

        // 自动把打包js注入到html
        new htmlWP({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html'
        })
    ],

    module: {

        // 配置非js模块的处理规则
        rules: [

            // css模块
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },

            // less模块
            {
                test: /\.less$/,
                use: [ 'style-loader', 'css-loader', 'less-loader' ]
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
