/*
 * @Description:创建 nvmrc 文件
 * @Author: Fu Fei
 * @Date: 2020-12-18 13:05:53
 * @LastEditTime: 2020-12-18 13:15:00
 * @LastEditors: Fu Fei
 * @FilePath: \generate-file\src\fun-unit\set-nvmrc.ts
 */

import path from "path";
import testFileIsExit from "@/tools/testFileIsExit";
import createFile from "@/tools/createFile";

/**
 * 创建 .nvmrc
 *
 * @export
 * @param {string} targetPath 输出路径
 * @return {*}  {Promise<void>}
 */
export default function createNvmrc(targetPath: string): Promise<void> {
    return testFileIsExit(path.join(targetPath, ".nvmrc")).then(
        (res) => {
            console.log("文件" + res.data.param.path + "已经存在");
        },
        (err) => {
            createFile(err.data.param.path, global.process.version);
        }
    );
}
