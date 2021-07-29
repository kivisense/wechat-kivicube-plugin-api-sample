// pages/material/tween-control/tween-control.js
const { takePhoto, downloadImage } = require("../../../utils/util.js");
const TWEEN = require("@tweenjs/tween.js");
Page({
  data: {
    startLoad: false,
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
    const { name } = this.view.sceneInfo.objects[0];
    const model = this.view.getObject(name);

    const toDeg = num => (num * Math.PI) / 180;
    const toAngle = deg => (deg * 180) / Math.PI;

    const originScale = model.scale.x;
    const changeScale = model.scale.x * 0.6;

    const originRotationY = toAngle(model.rotation.y);
    const changeRotationY = originRotationY - 30;

    model.rotation.y = toDeg(changeRotationY);
    model.scale.setScalar(changeScale);

    model.onBeforeRender = () => {
      TWEEN.update();
    };
    const startTransform = {
      scale: changeScale,
      angle: changeRotationY
    };
    const endTransform = {
      scale: originScale,
      angle: originRotationY
    };
    const duration = 1000;
    new TWEEN.Tween(startTransform)
      .to(endTransform, duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(({ scale, angle }) => {
        model.rotation.set(0, toDeg(angle), 0);
        model.scale.setScalar(scale);
      })
      .repeat(0)
      .start();
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
  }
});
