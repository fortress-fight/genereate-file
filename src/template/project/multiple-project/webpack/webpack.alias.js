/*
 * @Description:webpack 别名配置
 * @Author: Fu Fei
 * @Date: 2020-12-22 11:48:31
 * @LastEditTime: 2020-12-22 14:46:11
 * @LastEditors: Fu Fei
 * @FilePath: \emit\webpack\webpack.alias.js
 */
const path = require("path");

module.exports = {
    "@": path.resolve(process.env.WORKSPACE_FOLDER, "src/"),
    "@project": path.resolve(process.env.WORKSPACE_FOLDER, "src/projects/"),
    "@project-custom": path.resolve(
        process.env.WORKSPACE_FOLDER,
        "src/projects/custom/"
    ),
};
