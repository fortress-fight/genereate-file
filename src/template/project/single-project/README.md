# EMIT-PROJECT

## CLI

1.  preload-webpack-plugin

    `preload-webpack-plugin` 尚未支持 `webpack5` 直接运行会报错。

    ```shell
    TypeError: compiler.plugin is not a function
    ```

    可以修改 `node_modules\preload-webpack-plugin\index.js`

    ```js
     apply(compiler) {
        const options = this.options;
        compiler.hooks.run.tap('compilation', compilation => {
            compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, cb) => {
                if (this.options.excludeHtmlNames.indexOf(htmlPluginData.plugin.options.filename) > -1) {
                    cb(null, htmlPluginData);
                    return;
                }
                //...
            }
        }
     }
    ```
