"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const yargs_1 = tslib_1.__importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const argv = yargs_1.default(helpers_1.hideBin(process.argv))
    .usage("Usage: $0 <command> [option]")
    .command("start", "start project")
    .alias("f", "file")
    .nargs("f", 1)
    .describe("f", "Load a file")
    .alias("o", "out-dir")
    .nargs("o", 1)
    .describe("o", "Output dir")
    .demandOption(["f", "o"])
    .help("h")
    .alias("h", "help")
    .epilog("copyright 2019").argv;
exports.default = argv;
