"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildProjectFiles = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
let projectConfig;
function createProjectConfig(config) {
    return {
        replace: (data) => {
            if (typeof data != "string" || !data.length) {
                return "";
            }
            return data.replace(/\$0\b/gi, config.name);
        },
    };
}
function buildProjectFiles(projectTree, outDir, config) {
    if (config && !projectConfig) {
        projectConfig = createProjectConfig(config);
    }
    for (const key of Object.keys(projectTree)) {
        if (key == "files") {
            if (Array.isArray(projectTree.files)) {
                projectTree.files.forEach((file) => {
                    createFile(outDir, file, projectConfig);
                });
            }
            else {
                createFile(outDir, projectTree.files, projectConfig);
            }
        }
        else if (key == "desc") {
            createFile(outDir, {
                name: "README.md",
                data: projectTree[key],
            }, projectConfig);
        }
        else {
            fs_1.default.mkdirSync(outDir + "/" + key);
            buildProjectFiles(projectTree[key], outDir + "/" + key);
        }
    }
}
exports.buildProjectFiles = buildProjectFiles;
function createFile(path, param, config) {
    if (typeof param == "string") {
        fs_1.default.writeFileSync(path + "/" + param, "");
    }
    else {
        fs_1.default.writeFileSync(path + "/" + param.name, config.replace(param.data));
    }
}
