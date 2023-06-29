Page({
  data: {
    collectionId: "",
    sceneData: {},
  },
  onLoad: function () {
    const sceneData = wx.getStorageSync("sceneData");
    this.setData({ sceneData, collectionId: sceneData.collectionId });
  },
  ready({ detail: view }) {
    this.view = view;
  },
  onShareAppMessage: function () {
    return {
      title: `Kivicube企业版高级API示例：${this.data.sceneData.title}`,
      path: `/pages/started/kivicube-collection/kivicube-collection?id=${this.data.sceneData.id}`,
      imageUrl: "/assets/images/share.jpg",
    };
  },
});
