<template>
  <view class="layer bg">
    <kivi-cloudar
      v-if="showCloudar"
      collectionId="nw4uq2"
      class="layer"
      @error="error"
    ></kivi-cloudar>
    <cover-image
      v-if="showFrame"
      class="frame frame-up-left"
      src="/static/Up_Left@2x.png"
    ></cover-image>
    <cover-image
      v-if="showFrame"
      class="frame frame-up-right"
      src="/static/Up_Left@2x.png"
    ></cover-image>
    <cover-image
      v-if="showFrame"
      class="frame frame-bottom-left"
      src="/static/Up_Left@2x.png"
    ></cover-image>
    <cover-image
      v-if="showFrame"
      class="frame frame-bottom-right"
      src="/static/Up_Left@2x.png"
    ></cover-image>
    <cover-view v-if="showAlert" class="show-alert"
      >移近一点，保持扫描</cover-view
    >
  </view>
</template>

<script>
const { startCloudar } = requirePlugin("kivicube");
import share from "@/mixins/share.mixin";
export default {
  mixins: [share],
  components: {},
  data() {
    return {
      showFrame: true,
      showCloudar: false,
      isInit: false,
      showAlert: false
    };
  },
  onLoad() {
    this.showCloudar = true;
    setTimeout(() => {
      this.start();
    }, 2000);
  },
  onShow() {
    if (this.isInit) {
      this.showCloudar = true;
      setTimeout(() => {
        this.start();
      }, 1000);
    }
  },
  onHide() {},
  methods: {
    async start() {
      console.log("开始识别");
      setTimeout(() => {
        if (this.showCloudar) {
          this.showAlert = true;
        }
      }, 3000);
      const { metadata } = await startCloudar();
      const {
        data: { projectId, sceneId }
      } = JSON.parse(metadata);

      console.log("sceneId", projectId, sceneId);

      uni.setStorageSync("sceneData", {
        id: 99,
        name: "autoEnter",
        from: "cloudar",
        type: "scene",
        sceneId: sceneId
      });
      wx.navigateTo({ url: "../scene/index" });
      this.isInit = true;
      this.showCloudar = false;
      this.showAlert = false;
    },
    error(e) {
      console.error(e);
      if (e && e.detail && e.detail.detail && e.detail.detail.errMsg) {
        if (e.detail.detail.errMsg.includes("auth")) {
          // 如果是权限问题，则向用户申请权限。
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
    }
  }
};
</script>

<style scoped>
.bg {
  background-color: dimgray;
}
.frame {
  width: 16.8vw;
  height: 16.8vw;
  position: absolute;
  z-index: 2;
}
.frame-up-left {
  left: 4.27vw;
  top: 14.13vw;
}
.frame-up-right {
  right: 4.27vw;
  top: 14.13vw;
  transform: rotate(90deg);
}
.frame-bottom-left {
  left: 4.27vw;
  bottom: 14.67vw;
  transform: rotate(270deg);
}
.frame-bottom-right {
  right: 4.27vw;
  bottom: 14.67vw;
  transform: rotate(180deg);
}
.show-alert {
  width: 42.67vw;
  height: 8.53vw;
  position: absolute;
  left: 0;
  right: 0;
  top: 19.2vw;
  background: rgba(111, 111, 111, 0.8);
  border-radius: 1vw;
  margin: 0 auto;
  font-size: 3.73vw;
  font-weight: 400;
  line-height: 8.53vw;
  color: #ffffff;
  text-align: center;
  z-index: 2;
}
</style>
