// pages/tools/web-feedback/web-feedback.js
Page({
  data: {
    list: [],
  },
  onLoad() {
    const webviewUrl = `https://project.kivisense.com/helper-tools/feedback.html?feedback=1`;
    this.setData({ webviewUrl });
  },
  onShareAppMessage: function () {
    return {
      title: "Kivicube企业版高级API示例 - web兼容反馈",
      path: "/pages/tools/web-feedback/web-feedback",
      imageUrl: "/assets/images/share.jpg",
    };
  },
});
