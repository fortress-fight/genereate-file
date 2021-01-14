/*
 * @Description:
 * @Author: Fu Fei
 * @Date: 2020-08-05 11:45:53
 * @LastEditTime: 2020-12-30 16:10:07
 * @LastEditors: Fu Fei
 * @FilePath: \uemo-project\postcss.config.js
 */

// Automatically append content property for viewport-units-buggyfill.
// viewport-units-buggyfill [https://github.com/rodneyrehm/viewport-units-buggyfill]
/*
 * 使用 "postcss-viewport-units" 需要注意
 * viewport-units-buggyfill 的补充，将会对图片产生意外的影响，可以使用
 * img { content: normal !important; } 来解决问题
 */

// "autoprefixer",
// postcss-cssnext found a duplicate plugin ('autoprefixer') in your postcss plugins. This might be inefficient. You should remove 'autoprefixer' from your postcss plugin list since it's already included by postcss-cssnext
const defaultPlugins = [
    "postcss-aspect-ratio-mini",
    "postcss-custom-properties",
    [
        "postcss-cssnext",
        {
            features: {
                customProperties: {
                    warnings: false,
                },
            },
        },
    ],
];
if (!process.env.DEV_MODEL) {
    defaultPlugins.push([
        "cssnano",
        {
            preset: [
                "default",
                {
                    discardComments: {
                        removeAll: true,
                    },
                },
            ],
        },
    ]);
}
module.exports = (api) => {
    if (
        /mobile[/\\].+\.css$/.test(api.file) ||
        /mobile[/\\].+\.s[ca]ss$/.test(api.file)
    ) {
        return {
            plugins: [
                ...defaultPlugins,

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
                [
                    "postcss-viewport-units",
                    {
                        filterRule: (rule) =>
                            rule.nodes.findIndex(
                                (i) => i.prop === "content"
                            ) === -1,
                    },
                ],
            ],
        };
    }
    if (
        /pad[/\\].+\.css$/.test(api.file) ||
        /pad[/\\].+\.s[ca]ss$/.test(api.file)
    ) {
        return {
            plugins: [
                ...defaultPlugins,
                [
                    "postcss-write-svg",
                    {
                        uft8: false,
                    },
                ],
                [
                    "postcss-px-to-viewport",
                    {
                        viewportWidth: 1024, // 设计稿宽度
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

                [
                    "postcss-viewport-units",
                    {
                        filterRule: (rule) =>
                            rule.nodes.findIndex(
                                (i) => i.prop === "content"
                            ) === -1,
                    },
                ],
            ],
        };
    }
    return {
        plugins: defaultPlugins,
    };
};
