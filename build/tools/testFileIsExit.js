"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
function testFileIsExit(path, mode = fs_1.default.constants.F_OK) {
    return new Promise((res, rej) => {
        fs_1.default.access(path, mode, (err) => {
            if (err) {
                rej({
                    code: 1,
                    data: {
                        err,
                        param: { path, mode },
                    },
                    msg: "不存在",
                });
            }
            res({
                code: 0,
                data: {
                    exit: 0,
                    param: { path, mode },
                },
                msg: "",
            });
        });
    });
}
exports.default = testFileIsExit;
