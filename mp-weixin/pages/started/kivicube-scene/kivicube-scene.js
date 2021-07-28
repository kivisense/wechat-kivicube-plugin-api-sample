const {
  cameraErrorHandler,
  takePhoto,
  downloadImage
} = require("../../../utils/util.js");
Page({
  data: {
    showBackIcon: false, // 显示返回按钮
    startLoad: false,
    showFrame: false, // 显示相机外框
    progress: 0, // 下载进度
    showProgressNum: false, // 显示下载进度
    showTakePhoto: false, // 显示拍照UI
    sceneId: "", // 场景ID
    sceneData: { from: "list" },
    photo: "" // 拍照生成的图片地址
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const sceneData = wx.getStorageSync("sceneData");
    this.setData({ sceneData });
    this.setData({ sceneId: sceneData.sceneId });
    if (options.showBackIcon) {
      this.setData({ showBackIcon: true });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},
  // 已获取到场景数据，并准备开始去打开场景
  ready({ detail: view }) {
    this.view = view;
  },
  // 场景内容开始出现并可体验
  sceneStart() {
    console.log("scenestart");
    this.setData({ showFrame: false }, () => {
      console.log(this.data.showFrame);
    });
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
  }
});
