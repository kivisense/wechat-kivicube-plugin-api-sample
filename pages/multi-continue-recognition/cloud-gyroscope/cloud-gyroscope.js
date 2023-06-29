// pages/multi-continue-recognition/cloud-gyroscope/cloud-gyroscope.js
const { cameraErrorHandler } = require("../../../utils/util.js");
Page({
  data: {
    startLoad: false,
    collectionId: "",
    sceneData: {},
    showBtn: false,
    recordSceneId: "",
    isShark: false,
    loadingTimer: null,
    progress: 1,
    showProgressNum: false,
    showAlert: false,
    animationData: {},
    timer: null,
    scanProgress: 20,
    showScanning: false, // 显示相机扫描动画
    titleTimer: null,
  },
  onLoad() {
    wx.showLoading({ title: "加载中..." });
    const sceneData = wx.getStorageSync("sceneData");
    this.setData({ sceneData, collectionId: sceneData.collectionId });
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
  // 场景加载完毕。
  downloadAssetEnd() {
    this.changeProgress(1);
    if (this.data.loadingTimer) {
      clearTimeout(this.data.loadingTimer);
    }
    this.closeProgress();
  },
  // 场景加载完毕。
  loadSceneEnd() {
    this.setData({ startLoad: false });
    this.changeProgress(1);
  },
  ready({ detail: collection }) {
    wx.hideLoading();
    this.collection = collection;
    setTimeout(() => {
      this.startScanning();
    }, 100);
  },
  sceneReady({ detail }) {
    this.setData({ recordSceneId: detail.sceneInfo.sceneId }, () => {
      this.setData({
        isShark: this.data.recordSceneId === "6tcju7u0xlTbR44BQY4fchjiI4mt8TQ7",
      });
    });
    this.stopScanning();
  },
  // 场景加载完毕。
  sceneStart() {
    this.setData({ showBtn: true });
    this.changeProgress(1);
    if (this.loadingTimer) {
      clearTimeout(this.loadingTimer);
    }
    this.closeProgress();
  },
  sceneDestroy() {
    this.setData({ showBtn: false });
  },
  showProgress() {
    this.setData({ showProgressNum: true });
  },
  closeProgress() {
    this.setData({ showProgressNum: false });
  },
  changeProgress(progress) {
    this.setData({ progress });
  },
  startScanning(time = 6, num = 0.1) {
    const timer = setInterval(() => {
      if (this.data.scanProgress >= 65) {
        this.setData({ scanProgress: 20 });
      } else {
        const count = this.data.scanProgress + num;
        this.setData({ scanProgress: count });
      }
    }, time);
    this.setData({
      timer,
      showScanning: true,
      titleTimer: setTimeout(() => {
        this.setData({ showAlert: true });
      }, 3000),
    });
  },
  stopScanning() {
    clearInterval(this.data.timer);
    if (this.data.titleTimer) clearTimeout(this.data.titleTimer);
    this.setData({
      showAlert: false,
      showScanning: false,
      scanProgress: 20,
    });
  },
  backToScan() {
    // 此方法只有云识别类型合辑有效。
    if (this.collection.collectionInfo.functionType === "cloud-ar") {
      this.startScanning();
      this.collection.backToScan();
    }
  },
  tyrannosaurusClick() {
    this.openScene("zhgOzfNgAyMzD4gMdC7rXRzKIIj4C8JC");
  },
  sharkClick() {
    this.openScene("6tcju7u0xlTbR44BQY4fchjiI4mt8TQ7");
  },
  openScene(sceneId) {
    this.stopScanning();
    this.collection.openScene(sceneId).then(
      () => {
        console.log("已准备好场景信息，且sceneReady事件已触发");
      },
      (err) => {
        wx.hideLoading();
        console.error("打开场景失败：", err);
      }
    );
  },
  error(e) {
    const { detail } = e;
    const page = this;
    // 判定是否camera权限问题，是则向用户申请权限。
    cameraErrorHandler(detail, page);
  },
  onUnload: function () {
    clearInterval(this.data.loadingTimer);
    clearInterval(this.data.timer);
  },
  onShareAppMessage() {
    return {
      title: `Kivicube企业版高级API示例：${this.data.sceneData.title}`,
      path: `/pages/multi-continue-recognition/cloud-gyroscope/cloud-gyroscope?id=${this.data.sceneData.id}`,
      imageUrl: "/assets/images/share.jpg",
    };
  },
});
