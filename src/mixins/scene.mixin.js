export default {
  methods: {
    // 开始下载场景所需的素材。
    downloadAssetStart() {
      this.startLoad = true;
      setTimeout(() => {
        if (this.startLoad) {
          this.$parent.showProgress();
        }
      }, 5000);
    },
    // 下载素材时的进度通知。event.detail.progress的值范围为0.0 - 1.0，代表下载的进度。
    downloadAssetProgress(e) {
      const progress = e.detail.progress * 0.9;
      this.$parent.changeProgress(progress);
    },
    // 素材下载完毕。
    downloadAssetEnd() {},
    // 开始将素材加载进场景。
    loadSceneStart() {},
    // 场景加载完毕。
    loadSceneEnd() {
      this.startLoad = false;
      this.$parent.changeProgress(1);
      this.$parent.changeShowTakePhoto(true);
    },
    // 拍照
    takePhoto() {
      return new Promise(async (resolve, reject) => {
        wx.showLoading({ title: "拍照中...", mask: true });
        this.view
          .takePhoto()
          .then(photoPath => {
            wx.hideLoading();
            resolve(photoPath);
          })
          .catch(e => {
            wx.hideLoading();
            reject("error", e);
          });
      });
    },
    // 错误判断
    error(e) {
      const { detail } = e;
      // 判定是否camera权限问题，是则向用户申请权限。
      if (detail && detail.isCameraAuthDenied) {
        const page = this;
        wx.showModal({
          title: "提示",
          content: "请给予“摄像头”权限",
          success() {
            wx.openSetting({
              success({ authSetting: { "scope.camera": isGrantedCamera } }) {
                if (isGrantedCamera) {
                  wx.redirectTo({ url: "/" + page.__route__ });
                } else {
                  wx.showToast({
                    title: "获取“摄像头”权限失败！",
                    icon: "none"
                  });
                }
              }
            });
          }
        });
      }
    }
  },
  beforeDestroy() {
    // 销毁组件的时候清除资源
    // const { clearSceneCache } = requirePlugin("kivicube");
    // clearSceneCache();
  }
};
