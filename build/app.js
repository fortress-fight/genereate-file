"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const module_alias_1 = tslib_1.__importDefault(require("module-alias"));
module_alias_1.default.addAlias("@", (fromPath) => {
    if (fromPath.startsWith(path_1.default.resolve(__dirname, "../build"))) {
        return path_1.default.resolve(__dirname, "../build");
    }
    else {
        return path_1.default.resolve(__dirname, "../src");
    }
});
const collect_argv_1 = tslib_1.__importDefault(require("@/fun-unit/collect-argv"));
const { o, f } = collect_argv_1.default;
const outDir = process.cwd() + "\\" + o.replace("/", "\\");
const configFile = process.cwd() + "\\" + f.toString().replace("/", "\\");
const testFileIsExit_1 = tslib_1.__importDefault(require("@/tools/testFileIsExit"));
const fs_1 = tslib_1.__importDefault(require("fs"));
testFileIsExit_1.default(configFile)
    .then((res) => {
    const ext = path_1.default.extname(configFile);
    if (ext != ".json") {
        console.log("[配置文件只支持JSON格式文件]", configFile);
    }
    else {
        return testFileIsExit_1.default(outDir).then((res) => {
            console.log("[目标文件夹存在]" + res.data.param.path);
        }, () => {
            fs_1.default.mkdirSync(outDir);
            fs_1.default.readFile(configFile, "utf8", (err, data) => {
                if (err)
                    throw err;
                initProject(JSON.parse(data), outDir);
            });
            return Promise.resolve(res);
        });
    }
}, () => {
    console.log("[配置文件不存在]" + configFile);
})
    .catch((err) => {
    throw err;
});
const set_nvmrc_1 = tslib_1.__importDefault(require("@/fun-unit/set-nvmrc"));
const build_project_files_1 = require("./fun-unit/build-project-files");
function initProject(config, outDir) {
    set_nvmrc_1.default(outDir);
    build_project_files_1.buildProjectFiles(config.tree, outDir, config);
}
