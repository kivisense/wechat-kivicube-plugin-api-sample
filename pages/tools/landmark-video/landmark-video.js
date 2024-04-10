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

  getAuth() {
    console.log(`in getAuth`);
    wx.authorize({
      scope: "scope.record",
      success() {
        console.log(`success`);
        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        // wx.startRecord();
      },
      fail(err) {
        console.log(`fail`, err);
      },
    });
  },
  startRecord() {
    console.log(`startRecord`);
    this.cameraCtx.startRecord({
      timeoutCallback: ({ tempVideoPath }) => {
        console.log("res", tempVideoPath);
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
        console.log("res", tempVideoPath);
        this.setData({
          videoUrl: tempVideoPath,
        });
      },
    });
  },
});
