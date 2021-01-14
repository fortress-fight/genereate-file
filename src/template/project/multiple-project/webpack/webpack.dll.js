/*
 * @Description: webpack dll 打包
 * @Author: Fu Fei
 * @Date: 2020-12-21 18:30:13
 * @LastEditTime: 2020-12-30 15:42:42
 * @LastEditors: Fu Fei
 * @FilePath: \uemo-project\webpack\webpack.dll.js
 */

const envConfig = require("./webpack.env");

for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const path = require("path");
const { WEBPACK_PLUGIN_PUBLIC } = require("./webpack.plugin");
const WEBPACK_RULES = require("./webpack.rules");
const WEBPACK_MINIMIZE = require("./webpack.min");
const WEBPACK_ALIAS = require("./webpack.alias.js");

const webpack = require("webpack");
// 每次打包前删除输出目录
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// 提取 CSS 文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const {
    WebpackRemoveEmptyJSChunksPlugin,
} = require("webpack-remove-empty-js-chunks-plugin");

// 独立项目
const { merge } = require("webpack-merge");
const WEBPACK_PROJECT_CONFIG = require(path.resolve(
    process.env.CURRENT_PROJECT,
    "webpack/webpack.dll.js"
));

const WEBPACK_PLUGIN_DLL = [
    ...WEBPACK_PLUGIN_PUBLIC,

    new WebpackRemoveEmptyJSChunksPlugin(),
    // 提取 css 文件
    new MiniCssExtractPlugin({
        filename: "css/[name].dll.css",
        chunkFilename: "css/[name].dll.css",
    }),

    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
            path.resolve(process.env.CURRENT_PROJECT, "dll/*"),
        ],
    }),
    new webpack.DllPlugin({
        name: "[name]_dll",
        path: path.resolve(
            process.env.CURRENT_PROJECT,
            "dll/[name].manifest.json"
        ),
    }),
];

const WEBPACK_PUBLIC_CONFIG = {
    mode: "production",
    entry: {
        vendor: [
            "jquery/dist/jquery.js",
            "sanitize.css",
            "sanitize.css/forms.css",
            "sanitize.css/typography.css",
        ],
    },
    output: {
        publicPath: "/",
        filename: "js/[name].dll.js",
        path: path.resolve(process.env.CURRENT_PROJECT, "dll"),
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
        alias: WEBPACK_ALIAS,
        extensions: [".ts", ".tsx", ".js", ".jsx", "scss", ".json"],
    },
    // plugins的配置
    optimization: {
        ...WEBPACK_MINIMIZE,
    },
    plugins: WEBPACK_PLUGIN_DLL,
};

// webpack 配置
module.exports = merge(WEBPACK_PUBLIC_CONFIG, WEBPACK_PROJECT_CONFIG);
