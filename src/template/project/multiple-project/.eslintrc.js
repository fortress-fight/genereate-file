/*
 * @Description:
 * @Author: Fu Fei
 * @Date: 2020-08-05 11:45:53
 * @LastEditTime: 2020-12-24 15:42:19
 * @LastEditors: Fu Fei
 * @FilePath: \emit\.eslintrc.js
 */
module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        parser: "@typescript-eslint/parser",
    },
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    rules: {
        "prettier/prettier": [
            "off",
            {
                endOfLine: "auto",
            },
        ],
        "no-console": "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    },
    overrides: [
        {
            files: ["**/*.ts"],
            extends: [
                "eslint:recommended",
                "plugin:@typescript-eslint/recommended",
                "prettier/@typescript-eslint",
                "plugin:prettier/recommended",
            ],
        },
        {
            files: ["**/*.d.ts"],
            rules: {
                "@typescript-eslint/no-explicit-any": 0,
            },
        },
    ],
    globals: {},
};
