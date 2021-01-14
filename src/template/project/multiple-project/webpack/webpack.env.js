/*
 * @Description: webpack 环境变量
 * @Author: Fu Fei
 * @Date: 2020-12-21 10:58:07
 * @LastEditTime: 2020-12-30 12:34:28
 * @LastEditors: Fu Fei
 * @FilePath: \uemo-project\webpack\webpack.env.js
 */
const path = require("path");

const PROJECT_TYPE = "custom";
const PROJECT_NAME = "emit";
let env = {
    WORKSPACE_FOLDER: path.resolve(__dirname, "../"),
    PUBLIC_PATH: process.env.NODE_ENV == "development" ? "./" : "./",
    PROJECT_TYPE,
    PROJECT_NAME,
    CURRENT_PROJECT: path.resolve(
        __dirname,
        "../src/projects/" + PROJECT_TYPE + "/" + PROJECT_NAME + "/"
    ),
};

if (process.env.NODE_ENV == "development") {
    env.DEV_MODEL = process.env.NODE_ENV == "development";
}

module.exports = env;
