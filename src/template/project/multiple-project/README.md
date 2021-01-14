# EMIT-PROJECT

## CLI

1.  [preload-webpack-plugin](https://www.npmjs.com/package/preload-webpack-plugin)

    `preload-webpack-plugin` 尚未支持 `webpack5` 直接运行会报错。

    ```shell
    TypeError: compiler.plugin is not a function
    ```

    使用方式：

    ```js
    new PreloadWebpackPlugin({
        rel: "preload",
        fileBlacklist: [/\.map$/, /hot-update\.js$/],
        include: "allChunks", // or 'initial'
    }),
    new PreloadWebpackPlugin({
        rel: "preload",
        include: "allAssets",
    }),
    ```

    适配方式加载配置：

    ```js
    {
      rel: 'prefetch',
      includeHtmlNames: [
        'login.html'
      ],
       media: '(min-width: 600px)'
       fileWhitelist:[],
      include: {
        type: 'asyncChunks',
        entries: [
          'login'
        ]
      }
    }
    ```

2.  [speed-measure-webpack-plugin](https://www.npmjs.com/package/speed-measure-webpack-plugin)

    测试 webpack-plugin 消耗的时间

    由于当前版本不适配与 `webpack5` 所以计划在以后尝试使用

    使用方式

    ```js
    // 速度测试
    const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

    const smp = new SpeedMeasurePlugin();
    smp.wrap(webpack.config);
    ```

3.  [webpack-remove-empty-js-chunks-plugin](https://www.npmjs.com/package/webpack-remove-empty-js-chunks-plugin)

    清除空的 chunks

    由于使用 [webpack-fix-style-only-entries](https://www.npmjs.com/package/webpack-fix-style-only-entries) 并不适配 `webpack5` 所以改用该插件的一个 fork [webpack-remove-empty-js-chunks-plugin](https://www.npmjs.com/package/webpack-remove-empty-js-chunks-plugin)
