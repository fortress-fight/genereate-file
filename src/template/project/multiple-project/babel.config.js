/*
 * @Description: babel-config
 * @Author: Fu Fei
 * @Date: 2020-12-21 01:44:05
 * @LastEditTime: 2020-12-21 17:43:10
 * @LastEditors: Fu Fei
 * @FilePath: \test-generate-file\babel.config.js
 */
// const prodPlugins = [
//     [
//         "@babel/plugin-transform-runtime",
//         {
//             absoluteRuntime: false,
//             corejs: { version: 3, proposals: true },
//             helpers: true,
//             regenerator: true,
//             useESModules: false,
//         },
//     ],
//     // 用以解析识别import()动态导入语法---并非转换，而是解析识别
//     "@babel/plugin-syntax-dynamic-import",
// ];
module.exports = {
    presets: ["@babel/preset-env"],
    plugins: ["@babel/plugin-transform-runtime"],
};
