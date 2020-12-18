/*
 * @Description:
 * @Author: Fu Fei
 * @Date: 2020-12-17 16:43:23
 * @LastEditTime: 2020-12-18 13:01:31
 * @LastEditors: Fu Fei
 * @FilePath: \generate-file\src\tools\createFile.ts
 */
import fs from "fs";

/**
 *创建文件
 *
 * @export
 * @param {string} path 文件路径
 * @param {string} data 写入内容
 * @return {*}  {(Promise<{
 *     code: 0 | 1;
 *     data: { path: string; data: string };
 *     msg: string;
 * }>)}
 */
export default function createFile(
    path: string,
    data: string
): Promise<{
    code: 0 | 1;
    data: { path: string; data: string };
    msg: string;
}> {
    return new Promise((res, rej) => {
        fs.writeFile(path, data, (err) => {
            if (err) {
                rej({
                    code: 0,
                    data: err,
                    msg: "创建文件失败",
                });
            } else {
                res({
                    code: 1,
                    data: { path, data },
                    msg: "创建成功",
                });
            }
        });
    });
}
