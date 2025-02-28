// pages/scene-setup/setup-ui/setup-ui.js
const { takePhoto, cameraErrorHandler, resUrl } = require("../../../utils/util.js");
const bottomPic = resUrl("images/bottom.png");
const framePic = resUrl("images/frame.png");
Page({
  data: {
    startLoad: false,
    progress: 0, // 下载进度
    showProgressNum: false, // 显示下载进度
    showTakePhoto: false, // 显示拍照UI
    sceneId: "hDcL74ud0j1aUd8tSUtJs702EzpiULAA", // 场景ID
    sceneData: { from: "list" },
    photo: "", // 拍照生成的图片地址
    defaultPosition: "back",
    bottomPic,
    framePic,
  },
  onLoad() {
    const sceneData = wx.getStorageSync("sceneData");
    this.setData({ sceneData });
  },
  // 已获取到场景数据，并准备开始去打开场景
  ready({ detail: view }) {
    this.view = view;
  },
  // 场景内容开始出现并可体验
  sceneStart() {
    this.setData({ progress: 1 });
  },
  changerCamera() {
    const position = this.data.defaultPosition === "front" ? "back" : "front";
    this.view.switchCamera(position);
    this.setData({ defaultPosition: position });
  },
  // 显示素材下载进度
  showProgress() {
    this.setData({ showProgressNum: true });
  },
  changeProgress(progress) {
    this.setData({ progress });
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
  // 下载素材时的进度通知。event.detail.progress 的值范围为0.0 - 1.0，代表下载的进度。
  downloadAssetProgress(e) {
    const progress = e.detail.progress * 0.9;
    this.changeProgress(progress);
  },
  // 素材下载完毕。
  downloadAssetEnd() {},
  // 开始将素材加载进场景。
  loadSceneStart() {},
  // 拍照
  handleTakephoto() {
    takePhoto(this.view).then((photo) => {
      wx.navigateTo({
        url: `/pages/camera-preview/camera-preview?photo=${encodeURIComponent(
          photo
        )}`,
      });
    });
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
      path: `/pages/scene-setup/setup-ui/setup-ui?id=${this.data.sceneData.id}`,
      imageUrl: "/assets/images/share.jpg",
    };
  },
});
