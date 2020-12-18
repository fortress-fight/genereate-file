/*
 * @Description:
 * @Author: Fu Fei
 * @Date: 2020-12-18 12:31:51
 * @LastEditTime: 2020-12-18 12:35:35
 * @LastEditors: Fu Fei
 * @FilePath: \generate-file\src\type\argv.d.ts
 */

declare namespace yargs {
    type Arguments<T> = T & {
        /** Non-option arguments */
        _: Array<string | number>;
        /** The script name or node command */
        $0: string;
        f: string;
        /** All remaining options */
        [argName: string]: unknown;
    };
}
