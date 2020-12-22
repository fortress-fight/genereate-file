/*
 * @Description:webpack 本地服务
 * @Author: Fu Fei
 * @Date: 2020-12-21 11:37:48
 * @LastEditTime: 2020-12-21 17:34:20
 * @LastEditors: Fu Fei
 * @FilePath: \test-generate-file\webpack\webpack.devserver.js
 * @Document: https://webpack.js.org/configuration/dev-server/
 */
const path = require("path");
module.exports = {
    contentBase: path.resolve(process.env.WORKSPACE_FOLDER, "dist"),
    quiet: true,
    compress: true,
    allowedHosts: ["0.0.0.0"],
    hot: true,
    inline: true,
    port: 9000,
    open: true,
    overlay: {
        warnings: true,
        errors: true,
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
