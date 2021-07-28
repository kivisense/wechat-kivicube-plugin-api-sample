// pages/camera-preview/camera-preview.js
const { downloadImage, promisify } = require("../../utils/util.js");
const phonePic = "../../assets/images/scene1/frame.png";
const bottomPic = "../../assets/images/scene1/bottom.png";
Page({
  data: {
    tempFilePaths: "",
    showImg: "",
    canvasWidth: "",
    canvasHeight: ""
  },
  onLoad: function(options) {
    this.setData({ tempFilePaths: decodeURIComponent(options.photo) }, () => {
      console.log(this.data.tempFilePaths);
      this.getCanvasInformation();
    });
  },
  onReady: function() {},
  saveImg() {
    downloadImage(this.data.showImg);
  },
  getCanvasInformation() {
    const query = wx.createSelectorQuery();
    query
      .select("#syntheticPic")
      .fields({ node: true })
      .exec(res => {
        const canvas = res[0].node;
        const ctx = canvas.getContext("2d");
        const { screenWidth, windowHeight } = wx.getSystemInfoSync();
        this.setData({
          canvasWidth: screenWidth,
          canvasHeight: windowHeight
        });
        canvas.width = screenWidth * 2;
        canvas.height = windowHeight * 2;
        this.composite(canvas, ctx);
      });
  },
  async composite(canvas, ctx) {
    try {
      await this.addCameraPic(canvas, ctx);
      await this.addFramePic(canvas, ctx);
      await this.addBottomCowPic(canvas, ctx);
      const { tempFilePath } = await this.generatePicPath(canvas);
      this.setData({ showImg: tempFilePath });
    } catch (e) {
      wx.showToast({ icon: "none", title: e.message });
    }
  },
  loadImg(canvas, imgPath) {
    return new Promise((resolve, reject) => {
      let img = canvas.createImage();
      img.src = imgPath;
      img.onload = () => {
        resolve(img);
      };
      img.onError = e => {
        reject(new Error(e.message + +"(图片路径错误)"));
      };
    });
  },
  async addCameraPic(canvas, ctx) {
    const img = await this.loadImg(canvas, this.data.tempFilePaths);
    console.log(img);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  },
  async addFramePic(canvas, ctx) {
    const img = await this.loadImg(canvas, phonePic);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  },
  async addBottomCowPic(canvas, ctx) {
    const img = await this.loadImg(canvas, bottomPic);
    let imgThreeHeight = (canvas.width / 100) * 85.24;
    let top = canvas.height - imgThreeHeight;
    ctx.drawImage(img, 0, top, canvas.width, imgThreeHeight);
  },
  generatePicPath(canvas) {
    return promisify(wx.canvasToTempFilePath)({
      x: 0,
      y: 0,
      width: canvas.width,
      height: canvas.height,
      destWidth: canvas.width,
      destHeight: canvas.height,
      canvas: canvas,
      fileType: "image/jpg",
      quality: 1
    });
  }
});
