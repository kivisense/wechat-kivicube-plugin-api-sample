module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: process.env.NODE_ENV === "production"
    }
  },
  devServer: {
    port: 8099
  }
};
