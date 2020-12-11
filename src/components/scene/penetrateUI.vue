<template>
  <view class="layer">
    <kivicube-scene
      class="kivicube"
      scene-id="hDcL74ud0j1aUd8tSUtJs702EzpiULAA"
      @error="error"
      @ready="ready"
      @downloadAssetStart="downloadAssetStart"
      @downloadAssetProgress="downloadAssetProgress"
      @downloadAssetEnd="downloadAssetEnd"
      @loadSceneStart="loadSceneStart"
      @sceneStart="sceneStart"
      hideLoading
      hideDownload
      hideScan
      hideTakePhoto
    />
    <cover-view class="layer" style="z-index: 2;">
      <cover-image class="layer" src="/static/scene1/frame.png"></cover-image>
      <cover-image
        class="bottom-img"
        src="/static/scene1/bottom.png"
      ></cover-image>
      <cover-image
        @click="getTakephoto"
        class="camera-img"
        src="/static/scene1/camera.png"
      ></cover-image>
      <cover-image
        @click="changerCamera"
        class="camera-change-img"
        src="/static/scene1/camera-change.png"
      ></cover-image>
    </cover-view>
  </view>
</template>

<script>
import scene from "@/mixins/scene.mixin";

export default {
  props: {},
  mixins: [scene],
  data: () => ({
    defaultPosition: "back"
  }),
  computed: {},
  mounted() {
    this.$parent.hiddenAllUI();
  },
  methods: {
    ready({ detail: view }) {
      this.view = view;
    },
    sceneStart() {
      this.$parent.changeProgress(1);
    },
    changerCamera() {
      const position = this.defaultPosition === "front" ? "back" : "front";
      this.view.switchCamera(position);
      this.defaultPosition = position;
    },
    getTakephoto() {
      this.takePhoto().then(photo => {
        wx.navigateTo({
          url: `../../pages/scene/mergePic/index?photo=${encodeURIComponent(
            photo
          )}`
        });
      });
    }
  }
};
</script>

<style scoped>
.kivicube {
  display: block;
  width: 100vw;
  height: 100vh;
}
.bottom-img {
  width: 100vw;
  height: 85.24vw;
  position: absolute;
  bottom: 0;
  left: 0;
}
.camera-img {
  width: 16vw;
  height: 16vw;
  position: absolute;
  bottom: 10vw;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.camera-change-img {
  width: 13vw;
  height: 13vw;
  position: absolute;
  top: 7.22vw;
  right: 6.22vw;
}
</style>
