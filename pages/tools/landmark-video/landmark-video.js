const { promisify, downloadVideo } = require("../../../utils/util.js");
Page({
  data: {
    showUI: false,
    videoUrl: "",
  },
  onLoad() {
    this.getAuth();
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

  getAuth() {
    console.log(`in getAuth`);
    wx.authorize({
      scope: "scope.record",
      success() {
        console.log(`scope.record success`);
      },
      fail: async (err) => {
        if (
          err.errMsg &&
          (err.errMsg.includes("auth deny") ||
            err.errMsg.includes("authorize no response"))
        ) {
          const { confirm } = await promisify(wx.showModal)({
            title: "提示",
            content: "开启麦克风权限后，就可以开始录制视频啦！",
            confirmText: "去开启",
          });
          if (confirm) {
            const { authSetting } = await promisify(wx.openSetting)();
            if (authSetting["scope.record"]) {
              this.getAuth();
            }
          }
        } else {
          console.log("保存失败", err);
        }
      },
    });
  },
  startRecord() {
    console.log(`startRecord`);
    this.cameraCtx.startRecord({
      timeoutCallback: ({ tempVideoPath }) => {
        console.log("timeoutCallback", tempVideoPath);
        this.setData({
          videoUrl: tempVideoPath,
        });
      },
      fail: (err) => {
        console.error(err);
      },
    });
  },
  stopRecord() {
    console.log(`stopRecord`);
    this.cameraCtx.stopRecord({
      success: ({ tempVideoPath }) => {
        console.log("stopRecord", tempVideoPath);
        this.setData({
          videoUrl: tempVideoPath,
        });
      },
    });
  },

  again() {
    this.setData({
      videoUrl: "",
    });
  },
  save() {
    downloadVideo(this.data.videoUrl);
  },
});
