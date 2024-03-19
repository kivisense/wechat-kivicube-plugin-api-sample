// pages/scene-setup/setup-tracking.js
const {
  takePhoto,
  cameraErrorHandler,
  downloadImage,
  resUrl
} = require("../../../utils/util.js");

Page({
  data: {
    hideTip: true,
    startLoad: false,
    showFrame: true, // 显示相机外框
    progress: 0, // 下载进度
    showProgressNum: false, // 显示下载进度
    showTakePhoto: false, // 显示拍照UI
    sceneId: "2AzAoec4Ojw9G84NA4DFouYAgHP4Q5YT", // 场景ID
    sceneData: { from: "list" },
    photo: "", // 拍照生成的图片地址
    trackImage: resUrl("images/track-image.jpg"),
  },
  onLoad: function() {
    const sceneData = wx.getStorageSync("sceneData");
    this.setData({ sceneData });
  },
  ready({ detail: view }) {
    this.view = view;
  },
  // 场景内容开始出现并可体验
  sceneStart() {
    this.setData({ hideTip: false });
  },
  // 场景加载完毕。
  loadSceneEnd() {
    this.startLoad = false;
    this.changeProgress(1);
    this.changeShowTakePhoto(true);
  },
  // 追踪到识别图
  tracked() {
    this.setData({ hideTip: true, showFrame: false, showAlert: false });
  },
  // 丢失追踪
  lostTrack() {
    this.setData({ hideTip: false, showFrame: true });
    this.showScanAlert();
  },
  // 下载素材时的进度通知。event.detail的值范围为0.0 - 1.0，代表下载的进度。
  downloadAssetProgress(e) {
    const progress = e.detail * 0.9;
    this.changeProgress(progress);
  },
  changeProgress(progress) {
    this.setData({ progress });
  },
  changeShowTakePhoto(status = true) {
    this.setData({ showTakePhoto: status });
  },
  handleTakephoto() {
    takePhoto(this.view).then(photo => {
      this.setData({ photo, showFrame: false });
    });
  },
  clearPhoto() {
    this.setData({ photo: "", showFrame: true });
  },
  saveImg() {
    const path = this.data.photo;
    downloadImage(path);
  },
  showScanAlert() {
    setTimeout(() => {
      if (!this.data.hideTip) {
        this.setData({ showAlert: true });
      }
    }, 3000);
  },
  // 错误判断
  error(e) {
    const { detail } = e;
    const page = this;
    // 判定是否camera权限问题，是则向用户申请权限。
    cameraErrorHandler(detail, page);
  },
  onShareAppMessage() {
    return {
      title: `Kivicube企业版高级API示例：${this.data.sceneData.title}`,
      path: `/pages/scene-setup/setup-tracking/setup-tracking?id=${this.data.sceneData.id}`,
      imageUrl: "/assets/images/share.jpg"
    };
  }
});
