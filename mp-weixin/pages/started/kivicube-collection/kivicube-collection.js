Page({
  data: {
    collectionId: "",
    sceneData: {}
  },
  onLoad: function() {
    const sceneData = wx.getStorageSync("sceneData");
    this.setData({ sceneData });
    this.setData({ collectionId: sceneData.collectionId });
  },
  ready({ detail: view }) {
    this.view = view;
  }
});
