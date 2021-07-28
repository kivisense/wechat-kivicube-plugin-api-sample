// pages/case/image-scan.js
const {
  cameraErrorHandler,
  takePhoto,
  downloadImage,
  fetchBatch
} = require("../../utils/util.js");
Page({
  data: {
    sceneId: "E6zfUsOupl9zgyOvtylKMl3jTHIeKxz9",
    startLoad: false,
    showFrame: false, // 显示相机外框
    photoList: {},
    isStart: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.changeShowTakePhoto(false);
    let downloadList = [];
    for (let i = 0; i <= 74; i++) {
      const name = `${i}`.padStart(5, "0");
      downloadList.push(
        `https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-sample/images/RedPacket_${name}.png`
      );
    }
    let progress = 0;
    fetchBatch(downloadList, 5, () => {
      progress += 0.01;
      this.changeProgress(progress);
    }).then(list => {
      this.setData({ photoList: list });
      this.changeProgress(1);
      this.setData({ showFrame: true });
      setTimeout(() => {
        if (!this.data.isStart) {
          this.changeShowAlert(true);
        }
      }, 3000);
    });
  },
  ready({ detail: view }) {
    this.view = view;
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
  sceneStart() {
    this.setData({ isStart: true, showFrame: false });
    this.changeShowTakePhoto(true);
    this.changeShowAlert(false);
    this.drawImg(this.data.photoList);
  },
  async drawImg(giftLoading) {
    const { width: canvasWidth, height: canvasHeight } = await new Promise(
      r => {
        const query = wx.createSelectorQuery();
        query
          .in(this)
          .select("#sequence")
          .boundingClientRect(r);
        query.exec();
      }
    );

    const imgs = Object.keys(giftLoading);
    const { width: imageWidth, height: imageHeight } = await new Promise(
      (resolve, reject) => {
        wx.getImageInfo({
          src: giftLoading[imgs[0]],
          success(res) {
            resolve(res);
          },
          fail(e) {
            reject(e);
          }
        });
      }
    );
    const drawWidth = canvasWidth * 0.7;
    const ctx = wx.createCanvasContext("image-sequence", this);
    let frameIndex = 0;
    const render = () => {
      if (frameIndex >= imgs.length) {
        wx.navigateTo({ url: "/pages/land-page/land-page" });
        return;
        // frameIndex = 0;
      }
      ctx.drawImage(
        giftLoading[imgs[frameIndex++]],
        0,
        0,
        imageWidth,
        imageHeight,
        (canvasWidth - drawWidth) / 2,
        canvasHeight * 0.3,
        drawWidth,
        drawWidth
      );
      ctx.draw(false);
      setTimeout(render, 1000 / 30);
    };
    render();
  },
  changeShowAlert(show = true) {
    this.setData({ showAlert: show });
  },
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
  },
  error(e) {
    const { detail } = e;
    const page = this;
    // 判定是否camera权限问题，是则向用户申请权限。
    cameraErrorHandler(detail, page);
  }
});
