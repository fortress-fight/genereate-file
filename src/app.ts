/*
 * @Description:
 * @Author: Fu Fei
 * @Date: 2020-12-17 14:38:33
 * @LastEditTime: 2020-12-17 19:21:13
 * @LastEditors: Fu Fei
 * @FilePath: \generate-file\src\app.ts
 */
import path from "path";
import moduleAlias from "module-alias";

moduleAlias.addAlias("@", (fromPath: string) => {
    // console.log("fromPath:", fromPath);
    console.log("__dirname:", __dirname);
    if (fromPath.startsWith(path.resolve(__dirname, "../build"))) {
        return path.resolve(__dirname, "../build");
    } else {
        return path.resolve(__dirname, "../src");
    }
});

// path.
import fn from "@/tool/findfile";
fn();
