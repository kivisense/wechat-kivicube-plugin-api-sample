// pages/material-special/sprite-image/sprite-image.js
const {
  cameraErrorHandler,
  takePhoto,
  downloadImage,
  requestFile,
  errorHandler
} = require("../../../utils/util.js");
Page({
  data: {
    startLoad: false,
    progress: 0, // 下载进度
    showProgressNum: false, // 显示下载进度
    showTakePhoto: false, // 显示拍照UI
    sceneId: "GhWYjw8rRxjrtkp6SCIQ8Hju1p8JcMmQ", // 场景ID
    sceneData: { from: "list" },
    photo: "", // 拍照生成的图片地址
    isPlay: true
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
    this.audio = this.view.getObject(name);
    this.audio.loop = true; // 是否循环播放
    this.audio.play();
    this.addSprite();
  },
  async addSprite() {
    try {
      const spriteName = "show";
      const image = await requestFile(
        "https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-sample/music-effect.png"
      );
      const imageSprite = await this.view.addImageSprite({
        images: image,
        type: "png",
        sprite: spriteName,
        col: 16,
        row: 16,
        lastRowEmptyCol: 2,
        width: 1,
        height: 1,
        fps: 30
      });

      // imageSprite.position.y = 2.5;
      imageSprite.rotation.y = -Math.PI / 4;
      imageSprite.scale.setScalar(1);

      imageSprite.addEventListener("spriteEnded", ({ sprites }) => {
        wx.showToast({
          title: `精灵图自然播放完毕，序列名称：${sprites.join(",")}`,
          icon: "none"
        });
      });

      imageSprite.addEventListener("spriteLoop", ({ sprites, loopDelta }) => {
        wx.showToast({
          title: `精灵图循环播放完毕${loopDelta}次，序列名称：${sprites.join(
            ","
          )}`,
          icon: "none"
        });
      });

      imageSprite.addEventListener("click", () => {
        if (this.data.isPlay) {
          this.setPlayStatus("pause");
        } else {
          this.setPlayStatus("play");
        }
        this.setData({ isPlay: !this.data.isPlay });
      });

      this.imageSprite = imageSprite;
      this.spriteName = spriteName;
      this.imageSprite.playSprite(this.spriteName, true);
    } catch (e) {
      errorHandler(e);
    }
  },
  setPlayStatus(type) {
    if (type === "pause") {
      this.audio.pause();
      this.imageSprite.pauseSprite();
    }
    if (type === "play") {
      this.audio.play();
      this.imageSprite.playSprite(this.spriteName, true);
    }
  }
});
