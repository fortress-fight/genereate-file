/*
 * @Description:处理项目复制
 * @Author: Fu Fei
 * @Date: 2020-12-18 17:39:25
 * @LastEditTime: 2020-12-18 18:16:50
 * @LastEditors: Fu Fei
 * @FilePath: \generate-file\src\fun-unit\copy-template-project.ts
 */

import fs from "fs";
import path from "path";
import templateConfig from "@/config/template-config";

function copy(from, to): void {
    const fromPath = path.resolve(from);
    const toPath = path.resolve(to);
    fs.access(toPath, function (err) {
        if (err) {
            fs.mkdirSync(toPath);
        }
    });
    fs.readdir(fromPath, function (err, paths) {
        if (err) {
            console.log(err);
            return;
        }
        paths.forEach(function (item) {
            const newFromPath = fromPath + "/" + item;
            const newToPath = path.resolve(toPath + "/" + item);

            fs.stat(newFromPath, function (err, stat) {
                if (err) return;
                if (stat.isFile()) {
                    copyFile(newFromPath, newToPath);
                }
                if (stat.isDirectory()) {
                    copy(newFromPath, newToPath);
                }
            });
        });
    });
}

function copyFile(from, to) {
    fs.copyFileSync(from, to);
}
export default function copyTemplateProject(
    templateName: string,
    outDir: string
): void {
    copy(
        path.resolve(__dirname, templateConfig.template[templateName]),
        outDir
    );
}
