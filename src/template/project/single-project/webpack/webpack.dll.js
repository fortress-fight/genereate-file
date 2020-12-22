/*
 * @Description: webpack dll 打包
 * @Author: Fu Fei
 * @Date: 2020-12-21 18:30:13
 * @LastEditTime: 2020-12-21 19:28:44
 * @LastEditors: Fu Fei
 * @FilePath: \emit\webpack\webpack.dll.js
 */

const envConfig = require("./webpack.env");

for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const path = require("path");
const { WEBPACK_PLUGIN_DLL } = require("./webpack.plugin");
const WEBPACK_RULES = require("./webpack.rules");
const WEBPACK_MINIMIZE = require("./webpack.min");

module.exports = {
    mode: "production",
    entry: {
        vendor: ["jquery"],
    },
    output: {
        publicPath: "/",
        filename: "js/[name]_dll.js",
        path: path.resolve(process.env.WORKSPACE_FOLDER, "dll"),
        library: "[name]_dll",
    },

    resolveLoader: {
        modules: [path.resolve(process.env.WORKSPACE_FOLDER, "node_modules")],
    },
    module: {
        // noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
        rules: WEBPACK_RULES,
    },
    resolve: {
        alias: {
            "@": path.resolve(process.env.WORKSPACE_FOLDER, "src"),
        },
        extensions: [".ts", ".tsx", ".js", ".jsx", "scss", ".json"],
    },
    // plugins的配置
    optimization: {
        ...WEBPACK_MINIMIZE,
    },
    plugins: [...WEBPACK_PLUGIN_DLL],
};
