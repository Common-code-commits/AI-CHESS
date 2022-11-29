module.exports = {
    publicPath: "./",//设置打包后的文件路径
    outputDir: "dist", // build时构建文件的目录构建时传入
    assetsDir: "static", // 静态资源目录（js, css, img）
    lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
    // css相关配置
    css: {
        modules: false, // 是否开启支持‘foo.module.css’样式
        extract: true, // 是否使用css分离插件
        sourceMap: false, // 开启 CSS source maps?
        loaderOptions: {}, // css预设器配置项
    },
    // webpack-dev-server 相关配置
    devServer: {
        open: false, // 是否自动打开浏览器页面
        host: "localhost", // 指定使用一个 host。默认是 localhost
        port: 3030, // 端口地址
        https: false, // 使用https提供服务
        hotOnly: false, // 热更新
        proxy: null // 设置代理
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
}
