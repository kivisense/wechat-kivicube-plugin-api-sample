<template>
  <view class="layer">
    <kivicube-collection
      class="kivicube"
      :collectionId="collectionId"
      @error="error"
      @ready="ready"
      hideTakePhoto
      @sceneReady="sceneReady"
      @sceneDestroy="sceneDestroy"
    />
    <!-- <cover-image
      v-if="cancelScanning"
      src="/static/scanning.png"
      class="icon-top"
    ></cover-image>
    <cover-image
      v-if="cancelScanning"
      src="/static/scanning.png"
      class="icon-middle"
      :style="{ top: scanProgress + 'vh' }"
    ></cover-image>
    <cover-image
      v-if="cancelScanning"
      src="/static/scanning.png"
      class="icon-bottom"
    ></cover-image> -->
  </view>
</template>

<script>
import scene from "@/mixins/scene.mixin";

export default {
  props: {},
  data: () => ({
    collectionId: "",
    sceneData: { from: "list" },
    scanProgress: 20,
    timer: null,
    cancelScanning: false
  }),
  mixins: [scene],
  beforeCreate() {
    wx.showLoading({ title: "加载中..." });
  },
  mounted() {
    this.sceneData = uni.getStorageSync("sceneData");
    console.log("jinru");
    this.collectionId = this.sceneData.collectionId;
    // this.timer = setInterval(() => {
    //   if (this.scanProgress >= 70) {
    //     this.scanProgress = 20;
    //   } else {
    //     this.scanProgress += 0.1;
    //   }
    // }, 10);
  },
  beforeDestroyed() {
    this.timer = null;
  },
  methods: {
    ready({ detail: view }) {
      wx.hideLoading();
      // this.cancelScanning = true;
      this.view = view;
    },
    sceneReady() {
      // this.cancelScanning = false;
      this.timer = null;
    },
    sceneDestroy() {}
  }
};
</script>

<style scoped>
.kivicube {
  display: block;
  width: 100vw;
  height: 100vh;
}
/* .layerC {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
} */
.icon-top {
  width: 100vw;
  height: 16vw;
  position: absolute;
  top: 15vh;
  z-index: 2;
}
.icon-middle {
  width: 100vw;
  height: 16vw;
  position: absolute;
  top: 40vh;
  z-index: 2;
}
.icon-bottom {
  width: 100vw;
  height: 16vw;
  position: absolute;
  top: 70vh;
  z-index: 2;
}
</style>
