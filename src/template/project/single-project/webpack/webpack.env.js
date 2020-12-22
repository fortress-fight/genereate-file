/*
 * @Description: webpack 环境变量
 * @Author: Fu Fei
 * @Date: 2020-12-21 10:58:07
 * @LastEditTime: 2020-12-21 19:51:10
 * @LastEditors: Fu Fei
 * @FilePath: \emit\webpack\webpack.env.js
 */
const path = require("path");
let env = {
    WORKSPACE_FOLDER: path.resolve(__dirname, "../"),
    PUBLIC_PATH: process.env.NODE_ENV == "development" ? "" : "./",
};

if (process.env.NODE_ENV == "development") {
    env.DEV_MODEL = process.env.NODE_ENV == "development";
}

module.exports = env;
