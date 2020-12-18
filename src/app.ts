/*
 * @Description:
 * @Author: Fu Fei
 * @Date: 2020-12-17 14:38:33
 * @LastEditTime: 2020-12-17 19:58:32
 * @LastEditors: Fu Fei
 * @FilePath: \generate-file\src\app.ts
 */
import path from "path";
import moduleAlias from "module-alias";

moduleAlias.addAlias("@", (fromPath: string) => {
    if (fromPath.startsWith(__dirname + "/build")) {
        return path.resolve(__dirname, "../build");
    } else {
        return path.resolve(__dirname, "../src");
    }
});

import testFileIsExit from "@/tool/testFileIsExit";
import createFile from "@/tool/createFile";

testFileIsExit(path.join(process.cwd(), ".nvmrc")).then(
    (res) => {
        createFile(res.data.param.path, global.process.version);
    },
    (err) => {
        console.log("err:", err);
    }
);
