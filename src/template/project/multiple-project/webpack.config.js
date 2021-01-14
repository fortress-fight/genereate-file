/*
 * @Description: webpack 的配置文件
 * @Author: Fu Fei
 * @Date: 2020-12-20 15:23:22
 * @LastEditTime: 2020-12-30 16:28:07
 * @LastEditors: Fu Fei
 * @FilePath: \uemo-project\webpack.config.js
 */

const envConfig = require("./webpack/webpack.env");

for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const path = require("path");
const { WEBPACK_PLUGIN } = require("./webpack/webpack.plugin");
const WEBPACK_RULES = require("./webpack/webpack.rules");
const WEBPACK_MINIMIZE = require("./webpack/webpack.min");
const WEBPACK_SERVER_CONFIG = require("./webpack/webpack.devserver");
const WEBPACK_ALIAS = require("./webpack/webpack.alias.js");

// 独立项目
const { merge } = require("webpack-merge");
const WEBPACK_PROJECT_CONFIG = require(path.resolve(
    process.env.CURRENT_PROJECT,
    "webpack.config.js"
));

const WEBPACK_PUBLIC_CONFIG = {
    // ["webpack-dev-server": "^3.11.0","webpack-fix-style-only-entries": "^0.6.0"]
    // 问题：在缺少 target 将会导致 webpack-dev-server hot 失效
    // https://github.com/webpack/webpack-dev-server/issues/2758
    target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
    devtool: process.env.DEV_MODEL ? "eval-source-map" : undefined,
    devServer: WEBPACK_SERVER_CONFIG,
    cache: !!process.env.DEV_MODEL,
    watchOptions: {
        poll: 1000, //监测修改的时间(ms)
        aggregateTimeout: 500, //防止重复按键，500毫秒内算按一次
        ignored: /node_modules/, //不监测
    },
    // 模式
    mode: process.env.NODE_ENV || "development",
    // 入口起点
    entry: {
        app: path.resolve(process.env.CURRENT_PROJECT, "src/app.ts"),
    },
    // 输出
    output: {
        filename: "js/[name].js",
        chunkFilename: "js/[name].js",
        publicPath: process.env.PUBLIC_PATH,
        path: path.resolve(process.env.CURRENT_PROJECT, "dist"),
    },
    // loader的配置
    // watch: true,
    resolveLoader: {
        modules: [path.resolve(process.env.WORKSPACE_FOLDER, "node_modules")],
    },
    module: {
        rules: WEBPACK_RULES,
    },
    resolve: {
        alias: WEBPACK_ALIAS,
        extensions: [".ts", ".tsx", ".js", ".jsx", "scss", ".json"],
    },
    // plugins的配置
    plugins: WEBPACK_PLUGIN,
    optimization: {
        ...WEBPACK_MINIMIZE,

        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: "vendors",
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: "all",
                    minChunks: 1,
                },
                lib: {
                    test: /[\\/]node_modules[\\/].+\.js$/,
                    priority: 10,
                    chunks: "all",
                    minChunks: 1,
                    name: "lib",
                    // minSize: 1000,
                    enforce: true,
                },
            },
        },
    },
};

// webpack 配置
module.exports = merge(WEBPACK_PUBLIC_CONFIG, WEBPACK_PROJECT_CONFIG);
