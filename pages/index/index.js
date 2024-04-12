// index.js
// 获取应用实例
import { sceneOptions } from "../../utils/sceneOptions";
Page({
  data: {
    sceneOptions,
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
      imageUrl: "/assets/images/share.jpg",
    };
  },
});
