"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const testFileIsExit_1 = tslib_1.__importDefault(require("@/tools/testFileIsExit"));
const createFile_1 = tslib_1.__importDefault(require("@/tools/createFile"));
function createNvmrc(targetPath) {
    return testFileIsExit_1.default(path_1.default.join(targetPath, ".nvmrc")).then((res) => {
        console.log("文件" + res.data.param.path + "已经存在");
    }, (err) => {
        createFile_1.default(err.data.param.path, global.process.version);
    });
}
exports.default = createNvmrc;
