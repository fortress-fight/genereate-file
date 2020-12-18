/*
 * @Description:全局类型
 * @Author: Fu Fei
 * @Date: 2020-12-18 14:56:02
 * @LastEditTime: 2020-12-18 17:37:55
 * @LastEditors: Fu Fei
 * @FilePath: \generate-file\src\typings\index.d.ts
 */

type TYPE_FILE_PARAM =
    | {
          name: string;
          data?: string;
          template?: string;
      }
    | string;

/** projectTree 表示项目结构的 JSON */
type TYPE_PROJECT_TREE = {
    [param: string]: TYPE_PROJECT_TREE;
} & { files: TYPE_FILE_PARAM[] | TYPE_FILE_PARAM } & { desc: string };
interface TYPE_CONFIG {
    template?: string;
    author: string;
    plugins: Array<"eslint" | "tslint">;
    /** 项目名称 */
    name: string;
    /** 表示项目的结构 */
    tree: TYPE_PROJECT_TREE;
}
