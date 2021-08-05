// pages/feedback-web/feedback-web.js
Page({
  data: {
    statusBarHeight: 0,
    title: ''
  },
  onLoad: function () {
    // 客户端 6.7.2 版本开始，navigationStyle: custom 对 web-view 组件无效
    // const sceneData = wx.getStorageSync("sceneData");
    // this.setData({ title: sceneData.title });
    // wx.setNavigationBarTitle({
    //   title: sceneData.title
    // })
    wx.getSystemInfoAsync({
      success: res => {
        this.setData({statusBarHeight: res.statusBarHeight})
      }
    })
  },
  handleBack(){
    const pagesArr = getCurrentPages()
    if(pagesArr.length === 1) {
      wx.reLaunch({
        url: '/pages/index/index'
      })
    } else {
      wx.navigateBack();
    }
  },
  onShareAppMessage: function () {
    return {
      title: "Kivicube企业版高级API示例 - WebView反馈",
      path: "/pages/feedback-web/feedback-web",
      imageUrl: "/assets/images/share.jpg"
    };
  }
})