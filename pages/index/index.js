// index.js
// 获取应用实例
import sceneOptions from "../../utils/sceneOptions";
Page({
  data: {
    sceneOptions,
    modalHidden: true
  },
  onShow () {
    // 打开页面后开启屏幕常亮
    wx.setKeepScreenOn({
      keepScreenOn: false
    })
  },
  // 事件处理函数
  handleTap(e) {
    const modal = this.selectComponent("#modal");
    const info = e.currentTarget.dataset.item;
    try {
      wx.uma.trackEvent(info.startMta);
    } catch (err) {
      console.warn(err)
    }
    if(info.type === 'feedback'){
      wx.setStorageSync("sceneData", info);
      wx.navigateTo({ url: info.url });
      return false
    }
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
    try {
      wx.uma.trackEvent(modalInfo.clickMta);
    } catch (err) {
      console.warn(err.message)
    }
    if (modalInfo.type === "web") {
      return this.copyLink(modalInfo.url);
    }
    this.immediateExperience(modalInfo);
  },
  immediateExperience(info) {
    this.hideModal();
    wx.setStorageSync("sceneData", info);
    wx.navigateTo({ url: info.url , success: () => {
      try{
        // 打开页面后开启屏幕常亮
        wx.setKeepScreenOn({
          keepScreenOn: true
        })
      } catch (err) {
        console.warn("屏幕常亮开启失败", err)
      }
      wx.setNavigationBarTitle({
        title: info.title
      })
    }});
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
  onShareAppMessage: function() {
    return {
      title: "Kivicube企业版高级API示例",
      path: "/pages/index/index",
      imageUrl: "/assets/images/share.jpg"
    };
  }
});
