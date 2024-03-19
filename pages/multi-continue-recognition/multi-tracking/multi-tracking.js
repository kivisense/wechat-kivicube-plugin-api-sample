// pages/multi-continue-recognition/multi-tracking/multi-tracking.js
const { resUrl } = require("../../../utils/util.js");
Page({
  data: {
    startLoad: false,
    collectionId: "",
    sceneData: {},
    // 按钮展示
    showBtn: false,
    // 打开跟踪ui
    showTracking: false,
    ifClickModal: false,
    // 跟踪场景的时候，取消扫描
    showScanning: false, // 显示相机扫描动画
    // 记录当前场景id
    recordSceneId: "",
    isShark: false,
    loadingTimer: null,
    titleScanTimer: null,
    titleScanning: false,
    timer: null,
    scanProgress: 20,
    titleTimer: null,
    scanningImage: resUrl("scanning.png"),
    sharkImage: resUrl("shark.jpg"),
    tyrannosaurusImage: resUrl("tyrannosaurus.jpg"),
  },
  onLoad() {
    wx.showLoading({ title: "加载中..." });
    const sceneData = wx.getStorageSync("sceneData");
    this.setData({ sceneData, collectionId: sceneData.collectionId });
  },
  async ready({ detail: collection }) {
    wx.hideLoading();
    this.collection = collection;
    this.changeProgress(1);
    setTimeout(() => {
      this.startScanning();
    }, 100);
  },
  // 场景准备
  sceneReady({ detail }) {
    // 记录场景id
    this.setData({ recordSceneId: detail.sceneInfo.sceneId }, () => {
      this.setData({
        isShark: this.data.recordSceneId === "T8z00V3DB0KjwS9CLew7mo8c9DTBrFJU",
      });
    });
    this.stopScanning();
    // 判断是否点击按钮切换
    this.setData({ showTracking: this.data.ifClickModal });
  },
  downloadAssetStart() {
    this.setData({ startLoad: true, showTracking: false });
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
  // 场景内容开始出现并可体验
  sceneStart() {
    this.changeProgress(1);
    this.setData({ showBtn: true, showTracking: this.data.ifClickModal });
    setTimeout(() => {
      this.collection.stopCloudar();
    });
    if (this.data.loadingTimer) {
      clearTimeout(this.data.loadingTimer);
    }
    this.closeProgress();
  },
  tracked() {
    this.stopScanning();
    this.setData({ showScanning: false, showTracking: false, showBtn: true });
    if (this.data.titleScanning) {
      clearTimeout(this.data.titleScanTimer);
    }
    this.setData({ titleScanning: false });
  },
  lostTrack() {
    this.setData({ showTracking: true });
    this.startScanning();
    // 丢失目标后，自动开启云识别
    setTimeout(() => {
      this.collection.stopCloudar();
    });
    this.data.titleScanTimer = setTimeout(() => {
      this.setData({ titleScanning: true });
    }, 3000);
  },
  sceneDestroy() {},
  async back2Scan() {
    // 此方法只有云识别类型合辑有效。
    if (this.collection.collectionInfo.functionType === "cloud-ar") {
      this.startScanning();
      this.collection.backToScan();
    }
    this.setData({
      ifClickModal: false,
      showTracking: false,
      showScanning: false,
      showBtn: false,
    });
    this.startScanning();
    // 开启云识别
    const sceneId = await this.collection.startCloudar();
    if (sceneId) {
      await this.collection.openScene(sceneId); // 注意：插件版本>=1.5.1开始支持
      this.stopScanning();
    }
  },
  cloudarStart() {},
  tyrannosaurusClick() {
    this.openScene("Znr2xURGhdlQeFKikcIKfxG8VhjKKwXF");
  },
  sharkClick() {
    this.openScene("T8z00V3DB0KjwS9CLew7mo8c9DTBrFJU");
  },
  // 点击按钮过后 出现跟踪
  showTrackImg() {
    this.stopScanning();
    this.setData({ showTracking: true });
  },
  openScene(sceneId) {
    this.setData({ ifClickModal: true, showBtn: false });
    this.showTrackImg();
    this.collection.openScene(sceneId).then(
      () => {
        console.log("已准备好场景信息，且sceneReady事件已触发");
      },
      (err) => {
        console.error("打开场景失败：", err);
      }
    );
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
  onUnload: function () {
    clearInterval(this.data.loadingTimer);
    clearInterval(this.data.timer);
  },
  onShareAppMessage() {
    return {
      title: `Kivicube企业版高级API示例：${this.data.sceneData.title}`,
      path: `/pages/multi-continue-recognition/multi-tracking/multi-tracking?id=${this.data.sceneData.id}`,
      imageUrl: resUrl("share.jpg"),
    };
  },
});
