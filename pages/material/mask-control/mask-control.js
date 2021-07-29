// pages/material/mask-control/mask-control.js
const { cameraErrorHandler } = require("../../../utils/util.js");
Page({
  data: {
    startLoad: false,
    showAlert: false,
    showFrame: false, // 显示相机外框
    progress: 0, // 下载进度
    showProgressNum: false, // 显示下载进度
    showTakePhoto: false, // 显示拍照UI
    sceneId: "56zMCrpB9ftDB8aKdXDTzFOgVQwHq4EN", // 场景ID
    sceneData: { from: "list" },
    showTip: false,
    trackTimer: null,
    animationName: ["柠檬-1", "柠檬-2", "柠檬-3"],
    animationInstance: []
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
    this.lostTrack();
  },
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
  ready({ detail: view }) {
    this.view = view;
  },
  sceneStart() {
    const model = this.view.getObject("Occluder");
    // 设置遮罩
    model.setEnableMask();
    this.data.animationName.map(v => {
      let lemonModel = this.view.getObject(v);
      this.data.animationInstance.push(lemonModel);
    });
  },
  stop(model) {
    const [name] = model.getAnimationNames();
    if (name) {
      model.stopAnimation(name);
    } else {
      console.warn(`模型(${model.name})没有动画`);
    }
  },
  play(model) {
    const [name] = model.getAnimationNames();
    // 如果name为假，说明此模型没有模型动画
    if (name) {
      model.playAnimation({
        name, // 动画名称
        loop: false, // 是否循环播放
        clampWhenFinished: true // 播放完毕后是否停留在动画最后一帧
      });
    } else {
      console.warn(`模型(${model.name})没有动画`);
    }
  },
  tracked() {
    this.data.animationInstance.map(model => {
      this.play(model);
    });
    this.setData({ showFrame: false, showTip: false, showAlert: false });
    if (this.trackTimer) {
      clearTimeout(this.trackTimer);
    }
  },
  lostTrack() {
    this.data.animationInstance.map(model => {
      this.stop(model);
    });
    this.setData({ showFrame: true, showTip: true });
    this.trackTimer = setTimeout(() => {
      this.setData({ showAlert: true });
    }, 3000);
  }
});
