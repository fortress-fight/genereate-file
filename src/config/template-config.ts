/*
 * @Description: 配置文件
 * @Author: Fu Fei
 * @Date: 2020-12-18 17:11:30
 * @LastEditTime: 2020-12-18 18:10:49
 * @LastEditors: Fu Fei
 * @FilePath: \generate-file\src\config\template-config.ts
 */

import path from "path";
function getPath(paths: string): string;
function getPath(paths: string[]): string[];
function getPath(paths: string | string[]) {
    if (Array.isArray(paths)) {
        return paths.map((filePath) => {
            return path.resolve(__dirname, filePath);
        });
    } else {
        return path.resolve(__dirname, paths);
    }
}
export default {
    template: {
        normal: getPath("../template/project/normal/"),
    },
    plugins: {
        gitignore: {
            name: "eslint",
            template: getPath(["../template/config/.gitignore"]),
        },
        eslint: {
            name: "eslint",
            template: getPath([
                "../template/config/.eslintrc.js",
                "../template/config/.prettierrc",
            ]),
            devDependencies: {
                "@types/node": "^14.14.14",
                prettier: "^2.2.1",
                "eslint-config-prettier": "^7.0.0",
                "eslint-plugin-prettier": "^3.3.0",
                eslint: "^7.15.0",
            },
            dependencies: {},
        },
        tslint: {
            name: "tslint",
            template: getPath([
                "../template/config/.eslintrc.js",
                "../template/config/.prettierrc",
            ]),
            devDependencies: {
                "@types/node": "^14.14.14",
                prettier: "^2.2.1",
                "eslint-config-prettier": "^7.0.0",
                "eslint-plugin-prettier": "^3.3.0",
                eslint: "^7.15.0",
                "@typescript-eslint/eslint-plugin": "^4.10.0",
                "@typescript-eslint/parser": "^4.10.0",
                typescript: "^4.1.3",
            },
            dependencies: {},
        },
    },
};
