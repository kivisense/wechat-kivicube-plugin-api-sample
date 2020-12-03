<template>
  <view class="layer">
    <kivicube-scene
      class="kivicube"
      scene-id="2AzAoec4Ojw9G84NA4DFouYAgHP4Q5YT"
      @error="error"
      @ready="ready"
      @downloadAssetProgress="downloadAssetProgress"
      @sceneStart="sceneStart"
      @loadSceneEnd="loadSceneEnd"
      @tracked="tracked"
      @lostTrack="lostTrack"
      hideTakePhoto
      hideLoading
      hideDownload
      hideScan
    />
    <cover-view :hidden="showTip" class="tip">
      <cover-view class="scan-img-box">
        <cover-image class="scan-img" src="/static/marker.jpg"></cover-image>
      </cover-view>
      <cover-view class="scan-font">请对准识别图</cover-view>
    </cover-view>
  </view>
</template>

<script>
import scene from "@/mixins/scene.mixin";
const { setOptions } = requirePlugin("kivicube");
setOptions({
  license:
    "jwD727H1wtZYvnOtS4QMLr1KJxVHTQ/+BhH4aLak1ktRLCaSWvffWudfIzSK0uYU0XUlZMSnPBj/dNO3n6+H3+qr+f9xV+F/J05ZN8dD1+VYdRIvjA8grYO/PqhuWJFGGvn+XlOPANh6BIAzJavPgo/SY03lwjwVWBpulEDjtUVtIE7kS9vaszBMIKSp9iCRle5V6/Dj0gyJ1A4opB5JmYLxPzkDw/nXfTwj0SyAocwXfTwpQyyd3Di/MoWOcae747az9sNSjeHy7ovXx4ssxY2A145KfuVACbXHYr/uOXlQDhKQyYhEfKLFkl26f4a1bpvUXRHQhsgx7ZVRogWsVA=="
});
export default {
  props: {},
  data: () => ({
    showTip: true
  }),
  mixins: [scene],
  computed: {},
  methods: {
    ready({ detail: view }) {
      this.view = view;
    },
    sceneStart() {
      this.showTip = false;
      this.$parent.changeProgress(1);
      this.$parent.changeShowFrame(true);
      this.showScanAlert();
    },
    showScanAlert() {
      setTimeout(() => {
        if (!this.showTip) {
          this.$parent.changeShowAlert(true);
        }
      }, 3000);
    },
    tracked() {
      this.showTip = true;
      this.$parent.changeShowFrame(false);
      this.$parent.changeShowAlert(false);
    },
    lostTrack() {
      this.showTip = false;
      this.$parent.changeShowFrame(true);
      this.showScanAlert();
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
    /* 入了模糊, 安卓不支持 */
    backdrop-filter: blur(2px);
    border-radius: 1vw;
  }
  .scan-img {
    margin: 0 auto;
    width: 70vw;
    height: auto;
    // opacity: 0.35;
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
