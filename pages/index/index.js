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
    wx.uma.trackEvent(info.startMta);
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
    wx.uma.trackEvent(modalInfo.clickMta);
    if (modalInfo.type === "web") {
      return this.copyLink(modalInfo.url);
    }
    this.immediateExperience(modalInfo);
  },
  immediateExperience(info) {
    this.hideModal();
    wx.setStorageSync("sceneData", info);
    wx.navigateTo({ url: info.url });
  },
  /**
   * web场景复制链接
   */
  copyLink(url) {
    wx.setClipboardData({
      data: url,
      success(res) {
        console.log("copy_result", res);
      }
    });
  },
  onLoad() {}
});
