// pages/material/model-control/model-control.js
const {
  cameraErrorHandler,
  takePhoto,
  downloadImage
} = require("../../../utils/util.js");
Page({
  data: {
    startLoad: false,
    progress: 0, // 下载进度
    showProgressNum: false, // 显示下载进度
    showTakePhoto: false, // 显示拍照UI
    sceneId: "XOTxEGb44JTJnh7pcTQC3HB0qsC2ggEi", // 场景ID
    sceneData: { from: "list" },
    photo: "", // 拍照生成的图片地址
    playName: "",
    walkProudNum: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    const sceneData = wx.getStorageSync("sceneData");
    this.setData({ sceneData });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},
  back() {
    wx.navigateBack();
  },
  // 开始下载场景所需的素材。
  downloadAssetStart() {
    this.setData({ startLoad: true });
    setTimeout(() => {
      if (this.data.startLoad) {
        this.showProgress();
      }
    }, 5000);
  },
  // 下载素材时的进度通知。event.detail的值范围为0.0 - 1.0，代表下载的进度。
  downloadAssetProgress(e) {
    const progress = e.detail * 0.9;
    this.changeProgress(progress);
  },
  // 素材下载完毕。
  downloadAssetEnd() {},
  // 开始将素材加载进场景。
  loadSceneStart() {},
  // 场景加载完毕。
  loadSceneEnd() {
    this.setData({ startLoad: false });
    this.changeProgress(1);
    this.changeShowTakePhoto(true);
  },
  // 错误判断
  error(e) {
    const { detail } = e;
    const page = this;
    // 判定是否camera权限问题，是则向用户申请权限。
    cameraErrorHandler(detail, page);
  },
  // 显示素材下载进度
  showProgress() {
    this.setData({ showProgressNum: true });
  },
  changeProgress(progress) {
    this.setData({ progress });
  },
  changeShowTakePhoto(status = true) {
    this.setData({ showTakePhoto: status });
  },
  handleTakephoto() {
    console.log("take photo");
    takePhoto(this.view).then(photo => {
      this.setData({ photo });
    });
  },
  clearPhoto() {
    this.setData({ photo: "" });
  },
  saveImg() {
    const path = this.data.photo;
    downloadImage(path);
  },
  ready({ detail: view }) {
    this.view = view;
  },
  sceneStart() {
    const { name } = this.view.sceneInfo.objects[0];
    const model = this.view.getObject(name);
    model.addEventListener("click", () => {
      wx.showToast({ icon: "none", title: "模型被点击" });
      setTimeout(() => {
        this.play("walk_proud");
      }, 100);
    });
    model.addEventListener("play", () => {
      wx.showToast({ icon: "none", title: "模型动画开始播放" });
    });
    model.addEventListener("animationEnded", ({ animationName }) => {
      wx.showToast({
        icon: "none",
        title: `模型动画(${animationName})播放完毕`
      });
    });
    model.addEventListener("animationLoop", ({ animationName }) => {
      if (animationName === "walk_proud") {
        if (this.walkProudNum === 2) {
          this.stopAll();
          wx.navigateTo({
            url: `../web/index?url=${encodeURIComponent(
              "https://www.kivicube.com"
            )}`
          });
        } else {
          this.walkProudNum++;
        }
        // TODO:跳转实例小程序，此处计数有bug
      }
      wx.showToast({
        icon: "none",
        title: `模型动画(${animationName})循环播放`
      });
    });

    this.model = model;
    const [aname] = this.model.getAnimationNames();
    this.playName = aname;
  },
  // 因为有多个动画，所以要全部停止
  stopAll() {
    const animations = this.model.getAnimationNames();
    animations.forEach(name => {
      this.model.stopAnimation(name);
    });
  },
  pause() {
    const animations = this.model.getAnimationNames();
    if (animations.indexOf(this.playName) !== -1) {
      this.model.pauseAnimation(this.playName);
    } else {
      console.warn(`模型(${this.model.name})没有动画`);
    }
  },
  play(e) {
    const name = e.currentTarget.dataset.name;
    const needStop = e.currentTarget.dataset.flag === "true";
    this.walkProudNum = 0;
    const animations = this.model.getAnimationNames();

    if (animations.indexOf(name) === -1) {
      return;
    }
    if (needStop || this.playName !== name) {
      this.stopAll();
    }
    this.playName = name;

    this.model.playAnimation({
      name, // 动画名称
      loop: true, // 是否循环播放
      clampWhenFinished: false // 播放完毕后是否停留在动画最后一帧
    });
  }
});
