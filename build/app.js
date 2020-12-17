"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const module_alias_1 = tslib_1.__importDefault(require("module-alias"));
module_alias_1.default.addAlias("@", (fromPath) => {
    console.log("__dirname:", __dirname);
    if (fromPath.startsWith(path_1.default.resolve(__dirname, "../build"))) {
        return path_1.default.resolve(__dirname, "../build");
    }
    else {
        return path_1.default.resolve(__dirname, "../src");
    }
});
const findfile_1 = tslib_1.__importDefault(require("@/tool/findfile"));
findfile_1.default();
