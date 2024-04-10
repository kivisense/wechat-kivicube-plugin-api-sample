Page({
  data: {
    showUI: false,
    imgUrl: "",
  },
  onLoad() {
    this.cameraCtx = wx.createCameraContext();
  },
  onUnload() {
    this.cameraCtx = null;
  },

  onInit() {
    this.setData({
      showUI: true,
    });
  },

  takePhoto() {
    this.cameraCtx.takePhoto({
      quality: "high",
      success: ({ tempImagePath }) => {
        console.log(`res`, tempImagePath);
        this.setData({
          imgUrl: tempImagePath,
        });
      },
    });
  },
  again() {
    this.setData({
      imgUrl: "",
    });
  },
  save() {
    wx.saveVideoToPhotosAlbum({
      filePath: this.data.imgUrl,
      success(res) {
        wx.showToast({
          title: "保存成功",
        });
      },
    });
  },
});
