// index.js
// 获取应用实例
// const app = getApp();
import sceneOptions from "../../utils/sceneOptions";
Page({
  data: {
    sceneOptions,
    modalHidden: true
  },
  // 事件处理函数
  handleTap(e) {
    const modal = this.selectComponent("#modal");
    const info = e.currentTarget.dataset.item;
    if (!info.url) {
      return wx.showToast({ title: "正在开发中", icon: "none" });
    }
    modal.setInfo(info, () => {
      this.setData({ modalHidden: false });
    });
  },
  hideModal() {
    this.setData({ modalHidden: true });
  },
  /**
   * modal按钮被点击
   */
  handleBtnTap() {
    const modal = this.selectComponent("#modal");
    const modalInfo = modal.data.info;
    if (modalInfo.type === "web") {
      return this.copyLink(modalInfo.url);
    }
    this.immediateExperience(modalInfo);
  },
  immediateExperience(info) {
    // this.$uma.trackEvent(this.showData.startMta);
    // uni.setStorageSync("sceneData", this.showData);
    this.hideModal();
    wx.setStorageSync("sceneData", info);
    wx.navigateTo({ url: info.url });
    // const type = info.type;
    // switch(type) {
    //   case "scene":
    //     break;
    //   case "collectScene":
    //     break;
    //   default:
    //     break;
    // }
    // if (this.showData.type === "scene") {
    //   wx.navigateTo({ url: "../scene/index" });
    // } else if (this.showData.type === "collectScene") {
    //   wx.navigateTo({
    //     url: "/collect/pages/collectScene/index"
    //   });
    // } else {
    //   wx.navigateTo({ url: "../cloudar/index" });
    // }
  },
  /**
   * web场景复制链接
   */
  copyLink(url) {
    // this.$uma.trackEvent(this.showData.startMta);
    wx.setClipboardData({
      data: url,
      success(res) {
        console.log("copy_result", res);
      }
    });
  },
  onLoad() {}
});
