/*
 * @Description: webpack-loader
 * @Author: Fu Fei
 * @Date: 2020-12-21 11:11:44
 * @LastEditTime: 2020-12-21 19:48:04
 * @LastEditors: Fu Fei
 * @FilePath: \emit\webpack\webpack.rules.js
 */

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [
    // 详细的loader配置
    {
        enforce: "pre",
        test: /\.((j|t)sx?)$/,
        exclude: [/node_modules/],
        use: [
            {
                loader: "eslint-loader",
                options: {
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                    cache: true,
                    cacheIdentifier: "30641bcb",
                    emitWarning: false,
                    emitError: true,
                },
            },
        ],
    },
    {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
            exposes: ["$", "jQuery"],
        },
    },
    {
        test: /\.(handlebars|hbs)$/,
        use: [
            {
                loader: "handlebars-loader",
                options: {
                    helperDirs: path.resolve(
                        process.env.WORKSPACE_FOLDER,
                        "hbs_helpers"
                    ),
                    inlineRequires: "@INLINE/",
                },
            },
        ],
    },
    {
        // 匹配文件
        test: /\.css$/,
        // 使用那些 loader 进行处理
        use: [
            // use中loader的执行顺序是从后到前
            // 创建 style 标签，将JS中的样式添加到head中生效
            process.env.DEV_MODEL
                ? "style-loader"
                : MiniCssExtractPlugin.loader,
            // 将 css 文件 => commonjs 模块加载JS中
            "css-loader",
            { loader: "postcss-loader" },
        ],
    },
    {
        test: /\.s[ac]ss$/i,
        use: [
            process.env.DEV_MODEL
                ? "style-loader"
                : MiniCssExtractPlugin.loader,
            "css-loader",
            // 处理静态资源路径
            {
                loader: "resolve-url-loader",
                options: {},
            },
            { loader: "postcss-loader" },
            {
                loader: "sass-loader",
                options: {
                    implementation: require("sass"),
                    webpackImporter: true,
                    sassOptions: {
                        fiber: require("fibers"),
                    },
                    additionalData:
                        "$env: " +
                        process.env.NODE_ENV +
                        ";" +
                        "$root:'" +
                        process.env.WORKSPACE_FOLDER +
                        "';" +
                        "@import '@/style/mixin.scss';" +
                        "@import '@/style/var.scss';",
                },
            },
        ],
    },
    /* config.module.rule('ts') */
    {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: "cache-loader",
                options: {
                    cacheDirectory: path.resolve(
                        process.env.WORKSPACE_FOLDER,
                        "node_modules/.cache/ts-loader"
                    ),
                    cacheIdentifier: "28fc2926",
                },
            },
            {
                loader: "thread-loader",
                options: {
                    // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                    workers: require("os").cpus().length - 1,
                    poolTimeout: Infinity, // set this to Infinity in watch mode - see https://github.com/webpack-contrib/thread-loader
                },
            },
            {
                loader: "babel-loader",
            },
            {
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                    happyPackMode: true,
                },
            },
        ],
    },

    /* config.module.rule('js') */
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: "cache-loader",
                options: {
                    cacheDirectory: path.resolve(
                        process.env.WORKSPACE_FOLDER,
                        "node_modules/.cache/babel-loader"
                    ),
                    cacheIdentifier: "42ec4c7a",
                },
            },
            {
                loader: "thread-loader",
                options: {
                    // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                    workers: require("os").cpus().length - 1,
                    poolTimeout: Infinity, // set this to Infinity in watch mode - see https://github.com/webpack-contrib/thread-loader
                },
            },
            {
                loader: "babel-loader",
            },
        ],
    },
    /* config.module.rule('images') */
    {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
            {
                loader: "url-loader",
                options: {
                    limit: 4096,
                    fallback: {
                        loader: "file-loader",
                        options: {
                            name: "img/[name].[hash:8].[ext]",
                        },
                    },
                    name: {
                        name: "image/[name].[hash:8].[ext]",
                    },
                },
            },
        ],
    },
    /* config.module.rule('svg') */
    {
        test: /\.(svg)(\?.*)?$/,
        use: [
            {
                loader: "file-loader",
                options: {
                    name: "img/[name].[hash:8].[ext]",
                },
            },
        ],
    },
    /* config.module.rule('media') */
    {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
            {
                loader: "url-loader",
                options: {
                    limit: 4096,
                    fallback: {
                        loader: "file-loader",
                        options: {
                            name: "media/[name].[hash:8].[ext]",
                        },
                    },
                },
            },
        ],
    },
    /* config.module.rule('fonts') */
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
            {
                loader: "url-loader",
                options: {
                    limit: 4096,
                    fallback: {
                        loader: "file-loader",
                        options: {
                            name: "fonts/[name].[ext]",
                        },
                    },
                },
            },
        ],
    },
];
