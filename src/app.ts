/*
 * @Description:
 * @Author: Fu Fei
 * @Date: 2020-12-17 14:38:33
 * @LastEditTime: 2020-12-18 16:43:45
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

import argv from "@/fun-unit/collect-argv";

const { o, f } = argv;
const outDir = process.cwd() + "\\" + o.replace("/", "\\");
const configFile = process.cwd() + "\\" + f.toString().replace("/", "\\");

import testFileIsExit from "@/tools/testFileIsExit";
import fs from "fs";

testFileIsExit(configFile)
    .then(
        (res) => {
            const ext = path.extname(configFile);
            if (ext != ".json") {
                console.log("[配置文件只支持JSON格式文件]", configFile);
            } else {
                return testFileIsExit(outDir).then(
                    (res) => {
                        console.log("[目标文件夹存在]" + res.data.param.path);
                    },
                    () => {
                        fs.mkdirSync(outDir);

                        fs.readFile(configFile, "utf8", (err, data) => {
                            if (err) throw err;
                            initProject(JSON.parse(data), outDir);
                        });
                        return Promise.resolve(res);
                    }
                );
            }
        },
        () => {
            console.log("[配置文件不存在]" + configFile);
        }
    )
    .catch((err) => {
        throw err;
    });

import createNvmrc from "@/fun-unit/set-nvmrc";
import { buildProjectFiles } from "./fun-unit/build-project-files";

/**
 * 初始化
 *
 * @param {TYPE_CONFIG} config 项目配置
 * @param {*} outDir 输出路径
 */
function initProject(config: TYPE_CONFIG, outDir) {
    createNvmrc(outDir);
    buildProjectFiles(config.tree, outDir, config);
}
