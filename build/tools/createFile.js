"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
function createFile(path, data) {
    return new Promise((res, rej) => {
        fs_1.default.writeFile(path, data, (err) => {
            if (err) {
                rej({
                    code: 0,
                    data: err,
                    msg: "创建文件失败",
                });
            }
            else {
                res({
                    code: 1,
                    data: { path, data },
                    msg: "创建成功",
                });
            }
        });
    });
}
exports.default = createFile;
