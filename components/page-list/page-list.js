import { getPrivate } from "../../utils/util";
Component({
  behaviors: [],
  properties: {
    list: {
      type: Array,
    },
  },
  data: {
    modalHidden: true,
  },
  methods: {
    // 事件处理函数
    handleTap(e) {
      const modal = this.selectComponent("#modal");
      const info = e.currentTarget.dataset.item;
      try {
        wx.uma.trackEvent(info.startMta);
      } catch (err) {
        console.warn(err);
      }
      if (info.type === "feedback") {
        wx.setStorageSync("sceneData", info);
        wx.navigateTo({ url: info.url });
        return false;
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
    async handleBtnTap() {
      try {
        await getPrivate();
        const modal = this.selectComponent("#modal");
        const modalInfo = modal.data.info;
        try {
          wx.uma.trackEvent(modalInfo.clickMta);
        } catch (err) {
          console.warn(err.message);
        }
        if (modalInfo.type === "web") {
          return this.copyLink(modalInfo.url);
        }
        this.immediateExperience(modalInfo);
      } catch (error) {
        console.log(error);
      }
    },
    immediateExperience(info) {
      this.hideModal();
      wx.setStorageSync("sceneData", info);
      wx.navigateTo({
        url: info.url,
        success: () => {
          try {
            // 打开页面后开启屏幕常亮
            wx.setKeepScreenOn({
              keepScreenOn: true,
            });
          } catch (err) {
            console.warn("屏幕常亮开启失败", err);
          }
          wx.setNavigationBarTitle({
            title: info.title,
          });
        },
      });
    },
    /**
     * 跳转其他小程序按钮被点击
     */
    handleMiniprogramBtnTap({ detail: { miniprogram } }) {
      console.log(`miniprogram`, miniprogram);
      if (!miniprogram || !miniprogram.appId) {
        wx.showToast({
          title: `跳转失败`,
          icon: "none",
        });
        return;
      }
      wx.navigateToMiniProgram({
        appId: miniprogram.appId,
        path: miniprogram.path,
        fail(err) {
          console.error(err);
          wx.showToast({
            title: `跳转失败`,
            icon: "none",
          });
        },
      });
    },
    /**
     * web场景复制链接
     */
    copyLink(url) {
      wx.setClipboardData({
        data: url,
        success(res) {
          console.log("copy_result", res);
        },
      });
    },
  },
});
