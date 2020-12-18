/*
 * @Description:
 * @Author: Fu Fei
 * @Date: 2020-12-17 14:38:33
 * @LastEditTime: 2020-12-18 18:43:32
 * @LastEditors: Fu Fei
 * @FilePath: \generate-file\src\app.ts
 */
import path from "path";
import moduleAlias from "module-alias";

moduleAlias.addAlias("@", (fromPath: string) => {
    if (fromPath.startsWith(path.resolve(__dirname, "../build"))) {
        return path.resolve(__dirname, "../build");
    } else {
        return path.resolve(__dirname, "../src");
    }
});

import fs from "fs";
import argv from "@/fun-unit/collect-argv";
import testFileIsExit from "@/tools/testFileIsExit";

const { o, f, t } = argv;

if (!f && !t) {
    throw new Error("[缺少配置文件或者 templateName] 使用 -h 查看帮助");
}

const outDir = path.resolve(process.cwd(), o.toString());

// main handler area
if (f) {
    const configFile = path.resolve(process.cwd(), f.toString());
    testFileIsExit(configFile).then(
        () => {
            const ext = path.extname(configFile);
            if (ext != ".json") {
                console.log("[配置文件只支持JSON格式文件]", configFile);
            } else {
                return testOutDir(outDir).then(() => {
                    fs.readFile(configFile, "utf8", (err, data) => {
                        if (err) throw err;
                        initProject(JSON.parse(data), outDir);
                    });
                });
            }
        },
        () => {
            console.log("[配置文件不存在]" + configFile);
        }
    );
    // .then(() => {
    //     return testOutDir(outDir).then(() => {
    //         fs.readFile(configFile, "utf8", (err, data) => {
    //             if (err) throw err;
    //             initProject(JSON.parse(data), outDir);
    //         });
    //     });
    // });
} else if (t) {
    testOutDir(outDir).then(() => {
        copyTemplateProject(t, outDir);
    });
}

// method area

function testOutDir(outDir) {
    return testFileIsExit(outDir).then(
        (res) => {
            console.log("[目标文件夹存在]" + res.data.param.path);
        },
        () => {
            fs.mkdirSync(outDir);
            return Promise.resolve();
        }
    );
}

import createNvmrc from "@/fun-unit/set-nvmrc";
import { buildProjectFiles } from "./fun-unit/build-project-files";
import createPackageJson from "@/fun-unit/create-package.ts";
import copyTemplateProject from "@/fun-unit/copy-template-project.ts";
/**
 * 初始化
 *
 * @param {TYPE_CONFIG} config 项目配置
 * @param {*} outDir 输出路径
 */
function initProject(config: TYPE_CONFIG, outDir: string) {
    if (config.template) {
        copyTemplateProject(config.template, outDir);
    } else {
        createNvmrc(outDir);
        buildProjectFiles(config.tree, outDir, config);
        createPackageJson(config, outDir);
    }
}
