/*
 * @Description:收集参数
 * @Author: Fu Fei
 * @Date: 2020-12-18 11:33:35
 * @LastEditTime: 2020-12-18 18:25:30
 * @LastEditors: Fu Fei
 * @FilePath: \generate-file\src\fun-unit\collect-argv.ts
 */

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

/** @type {f:string, o: string} f 解析的文件路径 o 输出文件的路径*/
const argv = yargs(hideBin(process.argv))
    .usage("Usage: $0 <command> [option]")
    .command("start", "start project")
    .alias("t", "template")
    .nargs("t", 1)
    .describe("t", "template name: 'normal'")
    .alias("f", "file")
    .nargs("f", 1)
    .describe("f", "Load a file")
    .alias("o", "out-dir")
    .nargs("o", 1)
    .describe("o", "Output dir")
    .demandOption(["o"])
    .help("h")
    .alias("h", "help")
    .epilog("copyright 2019").argv;

export default argv as {
    /**
     *f 解析的文件路径
     *
     * @type {string}
     */
    f?: string;

    /**
     *t templateName
     *
     * @type {string}
     */
    t?: "normal";

    /**
     * o 输出文件的路径
     *
     * @type {string}
     */
    o: string;
};
