/*
 * @Description:
 * @Author: Fu Fei
 * @Date: 2020-08-05 11:45:53
 * @LastEditTime: 2020-12-21 17:39:57
 * @LastEditors: Fu Fei
 * @FilePath: \test-generate-file\postcss.config.js
 */

// Automatically append content property for viewport-units-buggyfill.
// viewport-units-buggyfill [https://github.com/rodneyrehm/viewport-units-buggyfill]
/*
 * 使用 "postcss-viewport-units" 需要注意
 * viewport-units-buggyfill 的补充，将会对图片产生意外的影响，可以使用
 * img { content: normal !important; } 来解决问题
 */
"postcss-viewport-units";
module.exports = (api) => {
    if (
        /mobile\..*\.css$/.test(api.file) ||
        /mobile\..*\.s[ac]ss$/.test(api.file)
    ) {
        return {
            plugins: [
                "postcss-aspect-ratio-mini",
                "postcss-cssnext",
                [
                    "postcss-write-svg",
                    {
                        uft8: false,
                    },
                ],
                [
                    "postcss-px-to-viewport",
                    {
                        viewportWidth: 750, // 设计稿宽度
                        viewportHeight: 2416, // 设计稿高度，可以不指定
                        unitPrecision: 3, // px to vw无法整除时，保留几位小数
                        viewportUnit: "vw", // 转换成vw单位
                        selectorBlackList: [".ignore", ".hairlines"], // 不转换的类名
                        minPixelValue: 1, // 小于1px不转换
                        mediaQuery: true, // 允许媒体查询中转换
                        exclude: undefined,
                        include: undefined,
                    },
                ],

                "postcss-viewport-units",
            ],
        };
    }
    if (/pad\..*\.css$/.test(api.file) || /pad\..*\.s[ac]ss$/.test(api.file)) {
        return {
            plugins: [
                "postcss-aspect-ratio-mini",
                "postcss-cssnext",
                [
                    "postcss-write-svg",
                    {
                        uft8: false,
                    },
                ],
                [
                    "postcss-px-to-viewport",
                    {
                        viewportWidth: 750, // 设计稿宽度
                        viewportHeight: 2416, // 设计稿高度，可以不指定
                        unitPrecision: 3, // px to vw无法整除时，保留几位小数
                        viewportUnit: "vw", // 转换成vw单位
                        selectorBlackList: [".ignore", ".hairlines"], // 不转换的类名
                        minPixelValue: 1, // 小于1px不转换
                        mediaQuery: true, // 允许媒体查询中转换
                        exclude: undefined,
                        include: [
                            /pages\\.*\\mobile.*\.css$/,
                            /pages\\.*\\mobile.*\.s[ac]ss$/i,
                        ],
                    },
                ],

                "postcss-viewport-units",
            ],
        };
    }
    return {
        plugins: ["postcss-aspect-ratio-mini", "postcss-cssnext"],
    };
};
