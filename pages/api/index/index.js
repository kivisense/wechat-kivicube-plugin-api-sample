// index.js
// 获取应用实例
Page({
  data: {
    apiOptions: [],
    showList: false,
  },
  async onLoad() {
    try {
      const { apiOptions } = await require.async('../../../subpackage-common/sceneOptions.js')
      this.setData({ apiOptions, showList: true })
    } catch (error) {
      this.setData({ showList: false })
      wx.showToast({
        title: 'API选项加载失败',
        icon: 'none'
      });
    }
  },
  onShow() {
    // 打开页面后开启屏幕常亮
    wx.setKeepScreenOn({
      keepScreenOn: false,
    });
  },
  onShareAppMessage: function () {
    return {
      title: "Kivicube企业版高级API示例",
      path: "/pages/index/index",
      imageUrl: "https://meta.kivisense.com/wechat-kivicube-plugin-api-sample/images/share.jpg",
    };
  },
});
