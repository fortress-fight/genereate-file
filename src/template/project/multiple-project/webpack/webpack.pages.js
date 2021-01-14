/*
 * @Description: 导出页面的配置信息
 * @Author: Fu Fei
 * @Date: 2020-12-28 18:58:15
 * @LastEditTime: 2020-12-30 12:17:38
 * @LastEditors: Fu Fei
 * @FilePath: \uemo-project\webpack\webpack.pages.js
 */
const path = require("path");
// 创建 HTML 文件
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function createPageConfig() {
    return [
        new HtmlWebpackPlugin({
            title: "index",
            minify: process.env.DEV_MODEL
                ? false
                : {
                      collapseWhitespace: false,
                      removeComments: true,
                      removeRedundantAttributes: true,
                      removeScriptTypeAttributes: true,
                      removeStyleLinkTypeAttributes: true,
                      useShortDoctype: true,
                  },
            template: path.resolve(
                process.env.CURRENT_PROJECT,
                "public/pages/index/index.hbs"
            ),
            chunks: "all",
            excludeChunks: [],
            filename: "index.html",
        }),
    ];
};
