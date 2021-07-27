// pages/scene-setup/setup-skip/setup-skip.js
const util = require("../../../utils/util.js");
Page({
  data: {
    startLoad: false,
    showFrame: false, // 显示相机外框
    progress: 0, // 下载进度
    showProgressNum: false, // 显示下载进度
    showTakePhoto: false, // 显示拍照UI
    sceneId: "qcAluuIz6JGQU0ArD2HS4fAytPPaLoZp", // 场景ID
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
  // 已获取到场景数据，并准备开始去打开场景
  ready({ detail: view }) {
    this.view = view;
  },
  // 场景内容开始出现并可体验
  sceneStart() {
    this.setData({ showFrame: false });
    this.changeShowTakePhoto(true);

    const { name } = this.view.sceneInfo.objects[0];
    const obj = this.view.getObject(name);
    obj.addEventListener("click", () => {
      // 点击后跳转示例小程序
      wx.navigateToMiniProgram({
        appId: "wx667be9ee0e001ef2",
        path: "/pages/lemma/lemma?ch=wx.item&lid=4169539"
      });
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
    this.changeProgress(1);
    // 只有云识别类型的场景，才具备api：skipCloudar。
    console.log(this.view.sceneInfo);
    if (this.view.sceneInfo.mode === "cloud-ar") {
      // 立即跳过识别，插件版本 <= 1.3.4时，需要延时执行才有效。
      setTimeout(() => {
        // this.view.skipCloudar();
      }, 0);
      // 或者实现为识别超时5s，就自动跳过。
      // setTimeout(() => {
      //   this.view.skipCloudar();
      // }, 5000);
    }
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
  }
});
