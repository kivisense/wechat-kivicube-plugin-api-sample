<template>
  <view class="layer">
    <kivicube-collection
      class="kivicube"
      :collectionId="collectionId"
      @error="error"
      @ready="ready"
      @sceneReady="sceneReady"
      @sceneDestroy="sceneDestroy"
      @sceneStart="sceneStart"
      @downloadAssetStart="downloadAssetStart"
      @downloadAssetProgress="downloadAssetProgress"
      @tracked="tracked"
      @lostTrack="lostTrack"
      @cloudarStart="cloudarStart"
      hideTakePhoto
      hideBackToScan
      hideLoading
      hideDownload
      hideScan
    />

    <cover-view v-if="showTracking && titleScanning" class="show-tracking"
      >移近一点，保持扫描</cover-view
    >
    <cover-view v-if="showTracking" class="tip">
      <cover-view class="scan-img-box">
        <cover-image
          v-if="showScene"
          class="scan-img"
          src="../static/image/tyrannosaurus.jpg"
        ></cover-image>
        <cover-image
          v-if="!showScene"
          class="scan-img"
          src="../static/image/shark.jpg"
        ></cover-image>
      </cover-view>
      <cover-view class="scan-font">请对准识别图</cover-view>
    </cover-view>
    <cover-view v-if="btnShow" class="btn">
      <cover-view
        class="default-view-add-btn"
        @click="scanningOtherClick"
        v-if="showScanning"
        >扫描其它卡片</cover-view
      >
      <cover-view
        class="default-view-add-btn"
        @click="tyrannosaurusClick"
        v-if="!showScene"
        >切换到霸王龙场景</cover-view
      >
      <cover-view
        v-if="showScene"
        class="default-view-add-btn"
        @click="sharkClick"
        >切换到鲨鱼场景</cover-view
      >
    </cover-view>

    <cover-image
      v-if="showTracking"
      class="frame frame-up-left"
      src="/static/Up_Left@2x.png"
    ></cover-image>
    <cover-image
      v-if="showTracking"
      class="frame frame-up-right"
      src="/static/Up_Left@2x.png"
    ></cover-image>
    <cover-image
      v-if="showTracking"
      class="frame frame-bottom-left"
      src="/static/Up_Left@2x.png"
    ></cover-image>
    <cover-image
      v-if="showTracking"
      class="frame frame-bottom-right"
      src="/static/Up_Left@2x.png"
    ></cover-image>
  </view>
</template>

<script>
import collectScene from "../mixins/collectScene.mixin";

export default {
  props: {},
  mixins: [collectScene],
  data: () => ({
    collectionId: "",
    sceneData: {},
    // 按钮展示
    btnShow: false,
    // 打开跟踪ui
    showTracking: false,
    ifClickModal: false,
    // 跟踪场景的时候，取消扫描
    showScanning: false,
    // 记录当前场景id
    recordSceneId: "",
    showScene: null,
    titleScannTimer: null,
    titleScanning: false
  }),
  beforeCreate() {
    wx.showLoading({ title: "加载中..." });
  },
  watch: {
    recordSceneId(val) {
      this.showScene =
        val === "Znr2xURGhdlQeFKikcIKfxG8VhjKKwXF" ? true : false;
    }
  },
  mounted() {
    this.sceneData = uni.getStorageSync("sceneData");
    this.collectionId = this.sceneData.collectionId;
  },
  methods: {
    async ready({ detail: collection }) {
      wx.hideLoading();
      this.collection = collection;
      this.$parent.changeProgress(1);
      setTimeout(() => {
        this.$parent.scaningStartAnimation();
      }, 100);
    },
    // 场景准备
    sceneReady({ target }) {
      // 记录场景id
      this.recordSceneId = target.sceneInfo.sceneId;
      this.$parent.scaningStopAnimation();
      // 判断是否点击按钮切换
      this.showTracking = this.ifClickModal;
    },
    downloadAssetStart() {
      this.showTracking = false;
      this.$parent.playLoading();
    },
    // 场景内容开始出现并可体验
    sceneStart() {
      this.$parent.changeProgress(1);
      this.btnShow = true;
      this.showTracking = this.ifClickModal;
      setTimeout(() => {
        this.collection.stopCloudar();
      });
      if (this.loaddingTimer) {
        clearTimeout(this.loaddingTimer);
      }
      this.$parent.closeProgress();
    },
    tracked() {
      this.showScanning = false;
      this.$parent.scaningStopAnimation();
      this.showTracking = false;
      this.btnShow = true;
      if (this.titleScanning) {
        clearTimeout(this.titleScannTimer);
      }
      this.titleScanning = false;
    },
    lostTrack() {
      this.showScanning = true;
      this.showTracking = true;
      // 丢失目标后，自动开启云识别
      setTimeout(() => {
        this.collection.stopCloudar();
      });
      this.titleScannTimer = setTimeout(() => {
        this.titleScanning = true;
      }, 3000);
    },
    sceneDestroy() {},
    async scanningOtherClick() {
      this.$parent.scaningStartAnimation();
      this.ifClickModal = false;
      this.showTracking = false;
      (this.showScanning = false), (this.btnShow = false);
      // 开启云识别
      const sceneId = await this.collection.startCloudar();
      if (sceneId) {
        await this.collection.openScene(sceneId); // 注意：插件版本>=1.5.1开始支持
        this.$parent.scaningStopAnimation();
      }
    },
    cloudarStart() {},
    tyrannosaurusClick() {
      this.openScene("Znr2xURGhdlQeFKikcIKfxG8VhjKKwXF");
    },
    sharkClick() {
      this.openScene("T8z00V3DB0KjwS9CLew7mo8c9DTBrFJU");
    },
    // 点击按钮过后 出现跟踪
    showTrackImg() {
      this.$parent.scaningStopAnimation();
      this.showTracking = true;
    },
    openScene(sceneId) {
      this.ifClickModal = true;
      this.btnShow = false;
      this.showTrackImg();
      this.collection.openScene(sceneId).then(
        () => {
          console.log("已准备好场景信息，且sceneReady事件已触发");
        },
        err => {
          console.error("打开场景失败：", err);
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.kivicube {
  display: block;
  width: 100vw;
  height: 100vh;
}
.btn {
  width: 100vw;
  position: absolute;
  bottom: 17.67vw;
  z-index: 3;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.tip {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .scan-img-box {
    padding: 2.76vw;
    background: rgba(255, 255, 255, 0.4);
    /* 入了模糊, 安卓不支持 */
    backdrop-filter: blur(2px);
    border-radius: 1vw;
  }
  .scan-img {
    margin: 0 auto;
    width: 70vw;
    height: auto;
  }
  .scan-font {
    margin-top: 2.4vw;
    text-align: center;
    color: white;
    font-size: 3.73vw;
    font-weight: 500;
  }
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
.show-tracking {
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
