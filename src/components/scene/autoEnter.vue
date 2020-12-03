<template>
  <view class="layer">
    <kivicube-scene
      v-if="sceneId"
      class="kivicube"
      :scene-id="sceneId"
      @error="error"
      @ready="ready"
      @downloadAssetStart="downloadAssetStart"
      @downloadAssetProgress="downloadAssetProgress"
      @downloadAssetEnd="downloadAssetEnd"
      @loadSceneStart="loadSceneStart"
      @loadSceneEnd="loadSceneEnd"
      @sceneStart="sceneStart"
      hideLoading
      hideDownload
      hideScan
      hideTakePhoto
    />
    <cover-image
      src="/static/back.png"
      @click="back"
      v-if="sceneData.from === 'cloudar'"
      class="icon-back"
    ></cover-image>
  </view>
</template>

<script>
import scene from "@/mixins/scene.mixin";

export default {
  props: {},
  mixins: [scene],
  data: () => ({
    sceneId: "",
    sceneData: { from: "list" }
  }),
  computed: {},
  mounted() {
    this.sceneData = uni.getStorageSync("sceneData");
    this.sceneId = this.sceneData.sceneId;
  },
  methods: {
    ready({ detail: view }) {
      this.view = view;
    },
    sceneStart() {
      this.$parent.changeShowFrame(false);
    },
    back() {
      wx.navigateBack();
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
.icon-back {
  width: 16vw;
  height: 16vw;
  position: absolute;
  left: 3.2vw;
  top: 3.2vw;
  z-index: 2;
}
</style>
