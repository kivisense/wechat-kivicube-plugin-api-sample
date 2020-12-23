<template>
  <view class="layer">
    <kivicube-scene
      class="kivicube"
      scene-id="56zMCrpB9ftDB8aKdXDTzFOgVQwHq4EN"
      @error="error"
      @ready="ready"
      @sceneStart="sceneStart"
      @downloadAssetStart="downloadAssetStart"
      @downloadAssetProgress="downloadAssetProgress"
      @downloadAssetEnd="downloadAssetEnd"
      @loadSceneEnd="loadSceneEnd"
      @tracked="tracked"
      @lostTrack="lostTrack"
      hideTakePhoto
      hideLoading
      hideDownload
      hideScan
    />
    <cover-view v-if="showTip" class="tip">
      <cover-view class="scan-img-box">
        <cover-image class="scan-img" src="/static/weita.jpg"></cover-image>
      </cover-view>
      <cover-view class="scan-font">请对准识别图</cover-view>
    </cover-view>
  </view>
</template>

<script>
import scene from "@/mixins/scene.mixin";

export default {
  props: {},
  data: () => ({
    showTip: false,
    trackTimer: null
  }),
  mixins: [scene],
  computed: {},
  beforeCreate() {
    // this.$parent.changeProgress(1);
    // wx.showLoading({ title: "加载中..." });
  },
  methods: {
    ready({ detail: view }) {
      this.view = view;
    },
    downloadAssetStart() {
      this.$parent.playLoading();
      setTimeout(() => {
        if (this.startLoad) {
          this.$parent.showProgress();
        }
      }, 5000);
    },
    downloadAssetEnd() {},
    loadSceneEnd() {
      this.$parent.changeProgress(1);
      this.lostTrack();
    },
    sceneStart() {
      const model = this.view.getObject("Occluder");
      // 设置遮罩
      model.setEnableMask();
    },
    tracked() {
      this.showTip = false;
      this.$parent.changeShowFrame(false);
      if (this.trackTimer) {
        clearTimeout(this.trackTimer);
      }
      this.$parent.changeShowAlert(false);
    },
    lostTrack() {
      this.showTip = true;
      this.$parent.changeShowFrame(true);
      this.trackTimer = setTimeout(() => {
        this.$parent.changeShowAlert(true);
      }, 3000);
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
.tip {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .scan-img-box {
    padding: 2.76vw;
    background: rgba(255, 255, 255, 0.4);
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
</style>
