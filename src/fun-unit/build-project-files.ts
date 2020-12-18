/*
 * @Description:创建文件目录
 * @Author: Fu Fei
 * @Date: 2020-12-18 15:31:25
 * @LastEditTime: 2020-12-18 16:39:55
 * @LastEditors: Fu Fei
 * @FilePath: \generate-file\src\buildProjectFiles.ts
 */
import fs from "fs";
interface TYPE_PROJECT_CONFIG {
    replace: (data: string) => string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [param: string]: any;
}

let projectConfig: TYPE_PROJECT_CONFIG;

function createProjectConfig(config: TYPE_CONFIG): TYPE_PROJECT_CONFIG {
    return {
        replace: (data) => {
            if (typeof data != "string" || !data.length) {
                return "";
            }
            return data.replace(/\$0\b/gi, config.name);
        },
    };
}

/**
 *创建项目结构
 *
 * @param {TYPE_PROJECT_TREE} projectTree 表示项目结构的 JSON
 * @param {string} outDir 输出路径
 */
export function buildProjectFiles(
    projectTree: TYPE_PROJECT_TREE,
    outDir: string,
    config?: TYPE_CONFIG
): void {
    if (config && !projectConfig) {
        projectConfig = createProjectConfig(config);
    }
    for (const key of Object.keys(projectTree)) {
        if (key == "files") {
            if (Array.isArray(projectTree.files)) {
                projectTree.files.forEach((file) => {
                    createFile(outDir, file, projectConfig);
                });
            } else {
                createFile(outDir, projectTree.files, projectConfig);
            }
        } else if (key == "desc") {
            createFile(
                outDir,
                {
                    name: "README.md",
                    data: projectTree[key],
                },
                projectConfig
            );
        } else {
            fs.mkdirSync(outDir + "/" + key);
            buildProjectFiles(projectTree[key], outDir + "/" + key);
        }
    }
}

function createFile(
    path: string,
    param: TYPE_FILE_PARAM,
    config: TYPE_PROJECT_CONFIG
): void {
    if (typeof param == "string") {
        fs.writeFileSync(path + "/" + param, "");
    } else {
        fs.writeFileSync(path + "/" + param.name, config.replace(param.data));
    }
}
