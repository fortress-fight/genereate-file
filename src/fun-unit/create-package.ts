/*
 * @Description:创建 package.json
 * @Author: Fu Fei
 * @Date: 2020-12-18 17:14:47
 * @LastEditTime: 2020-12-18 19:55:17
 * @LastEditors: Fu Fei
 * @FilePath: \generate-file\src\fun-unit\create-package.ts
 */
import fs from "fs";
import path from "path";
import templateConfig from "@/config/template-config";
import createFile from "@/tools/createFile";
const packageTemplate = {
    name: "",
    version: "0.0.1",
    description: "根据JSON结构创建目录",
    main: "app.js",
    scripts: {},
    author: "",
    license: "ISC",
    devDependencies: {},
    dependencies: {},
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mergeConfig(origin, target): any {
    if (!target) return origin;
    for (const key of Object.keys(target)) {
        const originData = typeof origin[key] == "object" ? origin[key] : {};
        if (typeof target[key] == "string") {
            origin[key] = target[key];
        } else {
            origin[key] = {
                ...target[key],
                ...originData,
            };
        }
    }
    return origin;
}
export default function createPackageJson(
    config: TYPE_CONFIG,
    outDir: string
): void {
    packageTemplate.name = config.name;
    packageTemplate.author = config.author;

    const plugins = ["init", "gitignore", "commitlint", ...config.plugins];
    let result = packageTemplate;

    plugins.forEach((name) => {
        const pluginParam = templateConfig.plugins[name];

        const templates = pluginParam.template;
        templates.forEach((tpl) => {
            const targetFile = path.resolve(__dirname, tpl);
            fs.copyFile(
                targetFile,
                outDir + "/" + path.basename(targetFile),
                (err) => {
                    if (err) {
                        throw err;
                    }
                }
            );
        });
        result = mergeConfig(result, pluginParam.packageConfig);
    });

    createFile(outDir + "/" + "package.json", JSON.stringify(result));
}
