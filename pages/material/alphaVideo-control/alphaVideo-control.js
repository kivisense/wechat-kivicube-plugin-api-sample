// pages/material/alphaVideo-control/alphaVideo-control.js
const { takePhoto, downloadImage } = require("../../../utils/util.js");
Page({
  data: {
    startLoad: false,
    progress: 0, // 下载进度
    showProgressNum: false, // 显示下载进度
    showTakePhoto: false, // 显示拍照UI
    sceneId: "lu1zB3xiVd1oVpqIFRNtk8Mt3h2XH1ox", // 场景ID
    sceneData: { from: "list" },
    photo: "" // 拍照生成的图片地址
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
    this.video.pause();
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
    console.log("scene", this.view.sceneInfo);
    const { name } = this.view.sceneInfo.objects[0];
    const video = this.view.getObject(name);
    video.addEventListener("click", () => {
      wx.showToast({ icon: "none", title: "视频被点击" });
      video.stop();
    });
    video.addEventListener("play", () => {
      wx.showToast({ icon: "none", title: "视频开始播放" });
    });
    video.addEventListener("pause", () => {
      wx.showToast({ icon: "none", title: "视频暂停播放" });
      console.log("video", video);
    });
    video.addEventListener("ended", () => {
      wx.showToast({ icon: "none", title: "视频播放完毕" });
    });
    this.video = video;
  },
  error(e) {
    console.log(e);
  },
  handleControl(e) {
    const type = e.currentTarget.dataset.type;
    if (type === "pause") {
      this.video.pause();
    }
    if (type === "stop") {
      this.video.stop();
    }
    if (type === "play") {
      this.video.loop = true; // 是否循环播放
      this.video.play();
    }
    if (type === "playback") {
      this.video.play();
      this.video.seek(0);
      this.video.loop = false; // 是否循环播放
    }
  },
  onShareAppMessage: function() {
    return {
      title: `Kivicube企业版高级API示例：${this.data.sceneData.title}`,
      path: `/pages/material/alphaVideo-control/alphaVideo-control?id=${this.data.sceneData.id}`,
      imageUrl: "/assets/images/share.jpg"
    };
  }
});
