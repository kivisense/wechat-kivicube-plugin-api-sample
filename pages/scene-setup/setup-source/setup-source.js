// pages/scene-setup/setup-source/setup-source.js
const util = require("../../../utils/util.js");
Page({
  data: {
    startLoad: false,
    progress: 0, // 下载进度
    showProgressNum: false, // 显示下载进度
    showTakePhoto: false, // 显示拍照UI
    sceneId: "X8LOjkgMGN7iAn1U7uk8eB02sOKRL7cI", // 场景ID
    sceneData: { from: "list" },
    photo: "", // 拍照生成的图片地址
    showModel: false,
    showVideo: false,
    isControl: false
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
    util.cameraErrorHandler(detail, page);
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
    util.takePhoto(this.view).then(photo => {
      this.setData({ photo });
    });
  },
  clearPhoto() {
    this.setData({ photo: "" });
  },
  saveImg() {
    const path = this.data.photo;
    util.downloadImage(path);
  },
  ready({ detail: view }) {
    this.view = view;
  },
  sceneStart() {},
  async addModel() {
    const toDeg = num => (num * Math.PI) / 180;
    this.setData({
      showModel: true,
      isControl: true
    });
    wx.showLoading({ title: "下载中...", mask: true });
    try {
      const modelUrl =
        "https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-sample/tyrannosaurus-rex.glb";
      const modelAb = await util.requestFile(modelUrl);
      // 如果模型是gltf格式，则必须传递第二个参数。否则可为空
      const model = await this.view.addModel(modelAb, null, () => {});

      // model.position.set(-0.8, -2.5, 0);
      model.position.set(0, 0, 0);
      model.rotation.set(0, toDeg(45), 0);
      model.scale.setScalar(0.5);

      const [name] = model.getAnimationNames();
      model.playAnimation({
        name,
        loop: true
      });
      this.model = model;
      wx.hideLoading();
    } catch (e) {
      wx.hideLoading();
      util.errorHandler(e);
    }
  },
  async addVideo() {
    this.setData({ showVideo: true, isControl: true });
    wx.showLoading({ title: "下载中...", mask: true });
    try {
      // 既支持下载为本地文件路径，也支持直接使用url。
      const videoUrlOrPath = await util.downloadFile(
        "https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-sample/tyrannosaurus-rex.mp4"
      );
      const defaultThumbnailUrl = ""; // 如果视频显示不出来，则显示默认的缩略图。传递为空则不显示缩略图。

      const video = await this.view.addVideo(
        videoUrlOrPath,
        defaultThumbnailUrl,
        () => {}
      );
      // video.position.set(0, 1.65, 0);
      video.position.set(0, 0, 0);
      video.rotation.set(0, 0, 0);
      video.scale.setScalar(1.4);

      // 设置事件监听
      video.addEventListener("click", () => {
        wx.showToast({ icon: "none", title: "视频被点击" });
      });
      video.addEventListener("play", () => {
        wx.showToast({ icon: "none", title: "视频开始播放" });
      });
      video.addEventListener("pause", () => {
        wx.showToast({ icon: "none", title: "视频暂停播放" });
      });
      video.addEventListener("ended", () => {
        wx.showToast({ icon: "none", title: "视频播放完毕" });
      });
      this.video = video;
      wx.hideLoading();
    } catch (e) {
      wx.hideLoading();
      util.errorHandler(e);
    }
  },
  // 模型操作
  handleModelControl(e) {
    const type = e.currentTarget.dataset.type;
    const deg = num => (num * Math.PI) / 180;
    const angle = deg => (deg * 180) / Math.PI;
    const random = () => Math.random();
    if (type === "scale-up") {
      const scaleX = this.model.scale.x;
      this.model.scale.setScalar(scaleX + 0.1);
    }
    if (type === "scale-down") {
      const scaleX = this.model.scale.x;
      this.model.scale.setScalar(scaleX - 0.1);
    }
    if (type === "change-position") {
      this.model.position.set(random(), random(), random());
    }
    if (type === "rotation") {
      // 沿y轴旋转
      const AngleY = angle(this.model.rotation.y);
      this.model.rotation.set(0, deg(AngleY + 10), 0);
    }
  },
  // 视频操作
  handleVideoControl(e) {
    const type = e.currentTarget.dataset.type;
    switch (type) {
      case "pause":
        this.video.pause();
        break;
      case "stop":
        this.video.stop();
        break;
      case "play":
        this.video.loop = true; // 是否循环播放
        this.video.play();
        break;
      case "full-screen":
        this.video.loop = false; // 是否循环播放
        this.video.play();
        this.video.requestFullScreen();
        // 退出全屏API
        // this.video.exitFullScreen();
        break;
      default:
        break;
    }
  },
  // 移除模型
  removeModel() {
    if (this.model) {
      this.view.remove(this.model);
      this.model = null;
      this.setData({ showModel: false, isControl: false });
    }
  },
  // 移除视频
  removeVideo() {
    if (this.video) {
      this.view.remove(this.video);
      this.video = null;
      this.setData({ showVideo: false, isControl: false });
    }
  },
  onShareAppMessage() {
    return {
      title: `Kivicube企业版高级API示例：${this.data.sceneData.title}`,
      path: `/pages/scene-setup/setup-source/setup-source?id=${this.data.sceneData.id}`,
      imageUrl: "/assets/images/share.jpg"
    };
  }
});
