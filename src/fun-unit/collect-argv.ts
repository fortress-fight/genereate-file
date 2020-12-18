/*
 * @Description:收集参数
 * @Author: Fu Fei
 * @Date: 2020-12-18 11:33:35
 * @LastEditTime: 2020-12-18 13:21:27
 * @LastEditors: Fu Fei
 * @FilePath: \generate-file\src\fun-unit\collect-argv.ts
 */

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

/** @type {f:string, o: string} f 解析的文件路径 o 输出文件的路径*/
const argv = yargs(hideBin(process.argv))
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

export default argv as {
    /**
     *f 解析的文件路径
     *
     * @type {string}
     */
    f: string;

    /**
     * o 输出文件的路径
     *
     * @type {string}
     */
    o: string;
};
