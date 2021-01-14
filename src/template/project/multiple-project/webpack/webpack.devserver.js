/*
 * @Description:webpack 本地服务
 * @Author: Fu Fei
 * @Date: 2020-12-21 11:37:48
 * @LastEditTime: 2020-12-30 12:38:55
 * @LastEditors: Fu Fei
 * @FilePath: \uemo-project\webpack\webpack.devserver.js
 * @Document: https://webpack.js.org/configuration/dev-server/
 */
const path = require("path");
module.exports = {
    contentBase: path.resolve(process.env.CURRENT_PROJECT, "dist"),
    quiet: true,
    compress: true,
    host: "127.0.0.1",
    hot: true,
    inline: true,
    port: 9000,
    open: true,
    overlay: {
        warnings: true,
        errors: true,
    },
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 500, //防止重复按键，500毫秒内算按一次
        ignored: /node_modules/, //不监测
    },
    disableHostCheck: true,
    proxy: {
        "/Api": {
            target: "http://0.0.0.0:8080",
            changeOrigin: true,
            secure: false,
        },
    },
};
