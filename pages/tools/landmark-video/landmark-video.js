const {
  promisify,
  downloadVideo,
  systemInfo,
} = require("../../../utils/util.js");
Page({
  data: {
    showUI: false,
    showPosterLoading: false,
    timeout: 30,
    videoUrl: "",
    windowWidth: "",
    windowHeight: "",
  },
  onLoad() {
    const { windowWidth, windowHeight } = systemInfo;
    this.setData({
      windowWidth,
      windowHeight,
    });
    this.cameraCtx = wx.createCameraContext();
  },
  onUnload() {
    this.cameraCtx = null;
  },

  onInit() {
    this.getAuth();
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
              title: "获取相机权限失败，请重新进入",
              icon: "none",
            });
            setTimeout(() => {
              wx.navigateBack();
            }, 500);
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
    wx.authorize({
      scope: "scope.record",
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
          } else {
            wx.showToast({
              title: "初始化失败，请重新进入",
              icon: "none",
            });
            setTimeout(() => {
              wx.navigateBack();
            }, 500);
          }
        } else {
          console.log("请求麦克风权限失败：", err);
          wx.showToast({
            title: "初始化失败，请重新进入",
            icon: "none",
          });
          setTimeout(() => {
            wx.navigateBack();
          }, 500);
        }
      },
    });
  },
  startRecord() {
    if (this.startRecording) return;
    this.startRecording = true;
    const shootControl = this.selectComponent("#shootControl");
    this.cameraCtx.startRecord({
      timeout:
        systemInfo.platform === "android"
          ? this.data.timeout + 1
          : this.data.timeout,
      timeoutCallback: ({ tempVideoPath }) => {
        console.log("timeoutCallback", tempVideoPath);
        this.setData({
          videoUrl: tempVideoPath,
          showPosterLoading: false,
        });
        shootControl.stopRecord();
        this.startRecording = false;
      },
      success: () => {
        this.startTime = new Date().getTime();
        shootControl.startRecord();
        this.startRecording = false;
      },
      fail: (err) => {
        console.error("startRecord error:", err);
        this.startRecording = false;
      },
    });
  },
  stopRecord() {
    if (this.stopRecording) return;
    this.stopRecording = true;
    this.setData({
      showPosterLoading: true,
    });
    const shootControl = this.selectComponent("#shootControl");
    this.cameraCtx.stopRecord({
      success: ({ tempVideoPath }) => {
        this.setData({
          videoUrl: tempVideoPath,
          showPosterLoading: false,
        });
        shootControl.stopRecord();
        this.stopRecording = false;
      },
      fail: (err) => {
        this.setData({
          showPosterLoading: false,
        });
        shootControl.stopRecord();
        this.stopRecording = false;

        if (new Date().getTime() - this.startTime > 2000) {
          wx.showToast({
            title: "录制失败，请重新开始录制",
            icon: "none",
          });
        }
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
