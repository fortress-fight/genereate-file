/*
 * @Description: webpack 的配置文件
 * @Author: Fu Fei
 * @Date: 2020-12-20 15:23:22
 * @LastEditTime: 2020-12-22 10:10:27
 * @LastEditors: Fu Fei
 * @FilePath: \generate-file\src\template\project\single-project\webpack.config.js
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

// webpack 配置
module.exports = {
    // ["webpack-dev-server": "^3.11.0","webpack-fix-style-only-entries": "^0.6.0"]
    // 问题：在缺少 target 将会导致 webpack-dev-server hot 失效
    // https://github.com/webpack/webpack-dev-server/issues/2758
    target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
    devtool: "source-map",
    devServer: WEBPACK_SERVER_CONFIG,

    watchOptions: {
        poll: 1000, //监测修改的时间(ms)
        aggregateTimeout: 500, //防止重复按键，500毫秒内算按一次
        ignored: /node_modules/, //不监测
    },
    // 模式
    mode: process.env.NODE_ENV || "development",
    // 入口起点
    entry: {
        app: "./src/app.ts",
    },
    // 输出
    output: {
        filename: "js/[name].js",
        chunkFilename: "js/[name].js",
        publicPath: process.env.PUBLIC_PATH,
        path: path.resolve(process.env.WORKSPACE_FOLDER, "dist"),
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
        alias: {
            "@": path.resolve(process.env.WORKSPACE_FOLDER, "src"),
        },
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
                    chunks: "initial",
                    minChunks: 2,
                },
                common: {
                    name: "chunk-common",
                    minChunks: 2,
                    priority: -20,
                    chunks: "initial",
                    reuseExistingChunk: true,
                },
                lib: {
                    test: /[\\/]node_modules[\\/].+\.js$/,
                    priority: 10,
                    minChunks: 1,
                    minSize: 1000,
                    enforce: true,
                },
            },
        },
    },
};
