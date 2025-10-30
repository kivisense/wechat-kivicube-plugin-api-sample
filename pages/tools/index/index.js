// index.js
// 获取应用实例
Page({
  data: {
    toolsOptions: [],
    showList: false,
  },
  async onLoad() {
    try {
      const { toolsOptions } = await require.async('../../../subpackage-common/sceneOptions.js')
      this.setData({ toolsOptions, showList: true })
    } catch (error) {
      this.setData({ showList: false })
      wx.showToast({
        title: '工具选项加载失败',
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
