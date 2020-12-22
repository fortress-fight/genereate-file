/*
 * @Description: 用于管理webpack的插件
 * @Author: Fu Fei
 * @Date: 2020-12-21 10:08:41
 * @LastEditTime: 2020-12-21 19:47:41
 * @LastEditors: Fu Fei
 * @FilePath: \emit\webpack\webpack.plugin.js
 */

const path = require("path");
const webpack = require("webpack");

// 每次打包前删除输出目录
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// 加快eslint检查，配合thread-loader+happyPackMode将会为其单独分配一个线程进行处理
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

// 提取 CSS 文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 输出打包分享
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

// 根据 .env 文件 添加环境变量
const Dotenv = require("dotenv-webpack");

// 创建 HTML 文件
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 拷贝目录文件
const CopyPlugin = require("copy-webpack-plugin");
// Friendly-errors-webpack-plugin识别某些类别的webpack错误，并清理，聚合和优先级，以提供更好的开发人员体验。
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

// 这个Webpack插件将强制所有必需模块的整个路径与磁盘上实际路径的确切情况相匹配。使用此插件有助于缓解OSX上的开发人员不遵循严格的路径区分大小写的情况，
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

// const PreloadWebpackPlugin = require("preload-webpack-plugin");
const OptimizeCssnanoPlugin = require("@intervolga/optimize-cssnano-plugin");

const {
    WebpackRemoveEmptyJSChunksPlugin,
} = require("webpack-remove-empty-js-chunks-plugin");

const WEBPACK_PLUGIN_PUBLIC = [
    new CaseSensitivePathsPlugin(),
    new FriendlyErrorsWebpackPlugin(),

    // 去除打包 scss 时多出的 js 文件
    // new FixStyleOnlyEntriesPlugin(),

    // new webpack.HotModuleReplacementPlugin(),
    // 详细的plugins的配置
    new webpack.ProgressPlugin(),

    // // 默认清除 webpack output - path
    // new CleanWebpackPlugin(),

    // 提取 css 文件
    new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "css/[name].css",
    }),

    // 通过 .env 设置环境变量，只能在 web-app 中使用
    new Dotenv({
        path: ".env", // load this now instead of the ones in '.env'
        safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
        allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
        systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
        silent: true, // hide any errors
        defaults: false, // load '.env.defaults' as the default values if empty.
    }),

    new ForkTsCheckerWebpackPlugin({
        typescript: {
            diagnosticOptions: {
                semantic: true,
                syntactic: true,
            },
        },
    }),
];
const WEBPACK_PLUGIN_DLL = [
    ...WEBPACK_PLUGIN_PUBLIC,
    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
            path.resolve(process.env.WORKSPACE_FOLDER, "dll/*"),
        ],
    }),
    new webpack.DllPlugin({
        name: "[name]_dll",
        path: path.resolve(
            process.env.WORKSPACE_FOLDER,
            "dll/[name].manifest.json"
        ),
    }),
];
const WEBPACK_PLUGIN = [
    ...WEBPACK_PLUGIN_PUBLIC,
    //   {
    //     rel: 'prefetch',
    //     includeHtmlNames: [
    //       'login.html'
    //     ],
    //      media: '(min-width: 600px)'
    //      fileWhitelist:[],
    //     include: {
    //       type: 'asyncChunks',
    //       entries: [
    //         'login'
    //       ]
    //     }
    //   }
    new webpack.DllReferencePlugin({
        context: process.env.WORKSPACE_FOLDER,
        manifest: path.resolve(
            process.env.WORKSPACE_FOLDER,
            "dll/vendor.manifest.json"
        ),
    }),
    // new PreloadWebpackPlugin({
    //     rel: "preload",
    //     fileBlacklist: [/\.map$/, /hot-update\.js$/],
    //     include: "allChunks", // or 'initial'
    // }),
    // new PreloadWebpackPlugin({
    //     rel: "preload",
    //     include: "allAssets",
    // }),
    new WebpackRemoveEmptyJSChunksPlugin(),

    // 无需引入就能直接使用变量，webpack 在遇到对应变量的时候 将会自动导入文件
    new webpack.ProvidePlugin({
        $: "jquery",
        // uuid: "@/helper/random_string.js",
    }),

    // 设置环境变量信息
    new webpack.DefinePlugin({
        // 默认浏览器环境下 process.env 会通过 webpack.mode 进行取值
    }),

    // 默认清除 webpack output - path
    new CleanWebpackPlugin(),

    // 拷贝文件
    new CopyPlugin({
        patterns: [
            {
                from: path.resolve(process.env.WORKSPACE_FOLDER, "public"),
                to: path.resolve(process.env.WORKSPACE_FOLDER, "dist"),
                toType: "dir",
                globOptions: {
                    ignore: process.env.DEV_MODEL
                        ? [".DS_Store"]
                        : [".DS_Store", "dist/pages/**/*"],
                },
            },
            {
                from: path.resolve(process.env.WORKSPACE_FOLDER, "dll"),
                to: path.resolve(process.env.WORKSPACE_FOLDER, "dist"),
                toType: "dir",
                globOptions: {
                    ignore: [".DS_Store", "**/*manifest.json"],
                },
            },
        ],
    }),
    new HtmlWebpackPlugin({
        title: "index",
        minify: false,
        template: path.resolve(
            process.env.WORKSPACE_FOLDER,
            "public/pages/index/index.hbs"
        ),
        chunks: "all",
        excludeChunks: [],
        filename: "index.html",
    }),
];

if (process.env.DEV_MODEL) {
    WEBPACK_PLUGIN.push(
        ...[
            new BundleAnalyzerPlugin({
                analyzerPort: 8888,
                openAnalyzer: false,
            }),
            new OptimizeCssnanoPlugin({
                sourceMap: true,
                cssnanoOptions: {
                    preset: [
                        "default",
                        {
                            mergeLonghand: false,
                            cssDeclarationSorter: false,
                        },
                    ],
                    map: {
                        inline: false,
                    },
                },
            }),
        ]
    );
}

module.exports = {
    WEBPACK_PLUGIN,
    WEBPACK_PLUGIN_DLL,
};
