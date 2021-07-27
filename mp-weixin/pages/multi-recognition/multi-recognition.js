// pages/multi-recognition/multi-recognition.js
const { startCloudar } = requirePlugin("kivicube");
const { cameraErrorHandler } = require("../../utils/util.js");
Page({
  data: {
    showFrame: true,
    showCloudar: false,
    isInit: false,
    showAlert: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.setData({ showCloudar: true });
    setTimeout(() => {
      this.start();
    }, 2000);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (this.data.isInit) {
      this.setData({ showCloudar: true });
      setTimeout(() => {
        this.start();
      }, 1000);
    }
  },
  async start() {
    console.log("开始识别");
    setTimeout(() => {
      if (this.data.showCloudar) {
        this.setData({ showAlert: true });
      }
    }, 3000);
    const { metadata } = await startCloudar();
    const {
      data: { projectId, sceneId }
    } = JSON.parse(metadata);

    console.log("sceneId", projectId, sceneId);

    wx.setStorageSync("sceneData", {
      id: 99,
      name: "autoEnter",
      from: "cloudar",
      type: "scene",
      sceneId: sceneId
    });
    wx.navigateTo({
      url: "/pages/started/kivicube-scene/kivicube-scene?showBackIcon=true"
    });
    this.setData({
      isInit: true,
      showCloudar: false,
      showAlert: false
    });
  },
  error(e) {
    const { detail } = e;
    const page = this;
    // 判定是否camera权限问题，是则向用户申请权限。
    cameraErrorHandler(detail, page);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: "Kivicube企业版高级API示例：使用kivi-cloudar实现",
      path: "/pages/multi-recognition/multi-recognitionx",
      imageUrl: "/assets/images/share.jpg"
    };
  }
});
