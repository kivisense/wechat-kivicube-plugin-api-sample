const { downloadImage, promisify } = require("../../../utils/util.js");
Page({
  data: {
    showUI: false,
    imgUrl: "",
  },
  onLoad() {
    this.cameraCtx = wx.createCameraContext();
  },
  onUnload() {
    this.cameraCtx = null;
  },

  onInit() {
    this.setData({
      showUI: true,
    });
  },

  async error() {
    // 用户不允许使用摄像头时触发
    const { confirm } = await promisify(wx.showModal)({
      title: "提示",
      content: "请给予“摄像头”权限",
      confirmText: "去开启",
    });

    if (confirm) {
      wx.openSetting({
        success: ({ authSetting: { "scope.camera": isGrantedCamera } }) => {
          if (isGrantedCamera) {
            wx.redirectTo({ url: "/" + this.__route__ });
          } else {
            wx.showToast({
              title: "获取“摄像头”权限失败！",
              icon: "none",
            });
          }
        },
      });
    } else {
      wx.showToast({
        title: "获取相机权限失败，请重新进入",
        icon: "none",
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 500);
    }
  },

  takePhoto() {
    this.cameraCtx.takePhoto({
      quality: "high",
      success: ({ tempImagePath }) => {
        console.log(`res`, tempImagePath);
        this.setData({
          imgUrl: tempImagePath,
        });
      },
    });
  },
  again() {
    this.setData({
      imgUrl: "",
    });
  },
  save() {
    downloadImage(this.data.imgUrl);
  },
});
