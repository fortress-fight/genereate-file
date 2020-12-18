/*
 * @Description:创建 package.json
 * @Author: Fu Fei
 * @Date: 2020-12-18 17:14:47
 * @LastEditTime: 2020-12-18 17:51:17
 * @LastEditors: Fu Fei
 * @FilePath: \generate-file\src\fun-unit\create-package.ts
 */
import fs from "fs";
import path from "path";
import templateConfig from "@/config/template-config";
const template = {
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

export default function createPackageJson(
    config: TYPE_CONFIG,
    outDir: string
): void {
    template.name = config.name;
    template.author = config.author;

    const plugins = ["gitignore", ...config.plugins];

    let devDependencies = {};
    let dependencies = {};

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

        if (pluginParam.devDependencies) {
            devDependencies = {
                ...pluginParam.devDependencies,
                ...devDependencies,
            };
        }

        if (pluginParam.dependencies) {
            dependencies = {
                ...pluginParam.dependencies,
                ...dependencies,
            };
        }
    });

    template.dependencies = dependencies;
    template.devDependencies = devDependencies;
}
