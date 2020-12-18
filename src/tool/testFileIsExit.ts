/*
 * @Description: 验证文件是否存在
 * @Author: Fu Fei
 * @Date: 2020-12-17 19:35:45
 * @LastEditTime: 2020-12-17 20:44:34
 * @LastEditors: Fu Fei
 * @FilePath: \generate-file\src\tool\testFileIsExit.ts
 */

import fs from "fs";

/**
 *测试文件是否存在
 *
 * @param {*} path 文件目录
 * @param {*} [mode=fs.constants.F_OK | fs.constants.W_OK]
 * @return {*}
 */
export default function testFileIsExit(
    path: string,
    mode = fs.constants.F_OK
): Promise<{
    code: number;
    data: { exit: 0 | 1; param: { path: string; mode: number } };
    msg: string;
}> {
    return new Promise((res, rej) => {
        fs.access(path, mode, (err) => {
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
