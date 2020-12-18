/*
 * @Description: 配置文件
 * @Author: Fu Fei
 * @Date: 2020-12-18 17:11:30
 * @LastEditTime: 2020-12-18 19:51:56
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
        init: {
            name: "init",
            template: getPath(["../template/config/.browserslistrc"]),
        },
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
            packageConfig: {
                devDependencies: {
                    "@types/node": "^14.14.14",
                    prettier: "^2.2.1",
                    "eslint-config-prettier": "^7.0.0",
                    "eslint-plugin-prettier": "^3.3.0",
                    eslint: "^7.15.0",
                },
                dependencies: {},
            },
        },
        tslint: {
            name: "tslint",
            template: getPath([
                "../template/config/tsconfig.json",
                "../template/config/.eslintrc.js",
                "../template/config/.prettierrc",
            ]),
            packageConfig: {
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
        commitlint: {
            name: "commitlint",
            template: getPath([
                "../template/config/.cz-config.js",
                "../template/config/commitlint.config.js",
            ]),
            packageConfig: {
                config: {
                    commitizen: {
                        path: "cz-customizable",
                    },
                },
                husky: {
                    hooks: {
                        "pre-commit": "lint-staged",
                        "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
                        "post-commit": "git push origin --all",
                    },
                },
                devDependencies: {
                    husky: "^3.1.0",
                    "lint-staged": "^9.5.0",
                    commitizen: "^4.0.3",
                    commitlint: "^8.2.0",
                    "cz-customizable": "^6.2.0",
                    "@commitlint/cli": "^8.2.0",
                    "@commitlint/config-angular": "^8.2.0",
                    "@commitlint/config-conventional": "^8.2.0",
                },
                "lint-staged": {
                    "src/**/*.{js,ts}": [
                        "eslint --rule \"no-console: ['warn', { allow: ['warn', 'error'] }]\"",
                    ],
                },
            },
        },
    },
};
