module.exports = {
  chainWebpack(config) {
    // 修改rule js|eslint，使其不解析转换追踪库代码。
    config.module
      .rule("js")
      .exclude.add(/libface/i)
      .end();
  },
  configureWebpack: config => {
    // 增加不解析模块的配置
    config.module.noParse = [config.module.noParse, /libface/i];
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: process.env.NODE_ENV === "production"
    }
  },
  devServer: {
    port: 8099,
  }
};
