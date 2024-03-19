// pages/material/audio-control/audio-control.js
const { takePhoto, downloadImage, resUrl } = require("../../../utils/util.js");
Page({
  data: {
    startLoad: false,
    progress: 0, // 下载进度
    showProgressNum: false, // 显示下载进度
    showTakePhoto: false, // 显示拍照UI
    sceneId: "Pd6b9beoc2ZgSZVMuMajAoRdhq79rday", // 场景ID
    sceneData: { from: "list" },
    photo: "", // 拍照生成的图片地址
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const sceneData = wx.getStorageSync("sceneData");
    this.setData({ sceneData });
  },
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
    takePhoto(this.view).then((photo) => {
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
    console.log("scene", this.view.sceneInfo);
    const { name } = this.view.sceneInfo.objects[0];
    const audio = this.view.getObject(name);
    audio.addEventListener("play", () => {
      wx.showToast({ icon: "none", title: "音乐开始播放" });
    });
    audio.addEventListener("pause", () => {
      wx.showToast({
        icon: "none",
        title: `音乐暂停播放，当前时间：${audio.currentTime}`,
      });
    });
    audio.addEventListener("ended", () => {
      wx.showToast({
        icon: "none",
        title: `音乐播放完毕，总时长：${audio.duration}`,
      });
    });
    this.audio = audio;
  },
  error(e) {
    console.log(e);
  },
  handleControl(e) {
    const type = e.currentTarget.dataset.type;
    if (type === "pause") {
      this.audio.pause();
    }
    if (type === "stop") {
      this.audio.stop();
    }
    if (type === "play") {
      this.audio.loop = false; // 是否循环播放
      this.audio.play();
    }
    if (type === "playback") {
      this.audio.loop = false; // 是否循环播放
      this.audio.playback();
    }
  },
  onShareAppMessage: function () {
    return {
      title: `Kivicube企业版高级API示例：${this.data.sceneData.title}`,
      path: `/pages/material/audio-control/audio-control?id=${this.data.sceneData.id}`,
      imageUrl: resUrl("share.jpg"),
    };
  },
});
