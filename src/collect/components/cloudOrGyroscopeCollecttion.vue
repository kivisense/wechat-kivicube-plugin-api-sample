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
      hideTakePhoto
      hideBackToScan
      hideLoading
      hideDownload
      hideScan
    />
    <cover-view v-if="btnShow" class="btn">
      <cover-view class="default-view-add-btn" @click="returnClick"
        >扫描其它卡片</cover-view
      >
      <cover-view
        class="default-view-add-btn"
        v-if="!showScene"
        @click="tyrannosaurusClick"
        >切换到霸王龙场景</cover-view
      >
      <cover-view
        v-if="showScene"
        class="default-view-add-btn"
        @click="sharkClick"
        >切换到鲨鱼场景</cover-view
      >
    </cover-view>
  </view>
</template>

<script>
import collectScene from "@/collect/mixins/collectScene.mixin";

export default {
  props: {},
  mixins: [collectScene],
  data: () => ({
    collectionId: "",
    sceneData: {},
    returnBtn: false,
    btnShow: false,
    recordSceneId: "",
    showScene: ""
  }),
  beforeCreate() {
    wx.showLoading({ title: "加载中..." });
  },
  mounted() {
    this.sceneData = uni.getStorageSync("sceneData");
    this.collectionId = this.sceneData.collectionId;
  },
  watch: {
    recordSceneId(val) {
      this.showScene = val === "zhgOzfNgAyMzD4gMdC7rXRzKIIj4C8JC";
    }
  },
  methods: {
    ready({ detail: collection }) {
      wx.hideLoading();
      this.collection = collection;
      setTimeout(() => {
        this.$parent.scaningStartAnimation();
      }, 100);
    },
    sceneReady({ detail }) {
      this.recordSceneId = detail.sceneInfo.sceneId;
      this.$parent.scaningStopAnimation();
    },
    // 场景加载完毕。
    sceneStart() {
      this.btnShow = true;
      this.$parent.changeProgress(1);
      if (this.loaddingTimer) {
        clearTimeout(this.loaddingTimer);
      }
      this.$parent.closeProgress();
    },
    sceneDestroy() {
      this.btnShow = false;
    },
    returnClick() {
      // 此方法只有云识别类型合辑有效。
      if (this.collection.collectionInfo.functionType === "cloud-ar") {
        this.returnBtn = false;
        this.$parent.scaningStartAnimation();
        this.collection.backToScan();
      }
    },
    tyrannosaurusClick() {
      this.openScene("zhgOzfNgAyMzD4gMdC7rXRzKIIj4C8JC");
    },
    sharkClick() {
      this.openScene("6tcju7u0xlTbR44BQY4fchjiI4mt8TQ7");
    },
    openScene(sceneId) {
      this.$parent.scaningStopAnimation();
      this.collection.openScene(sceneId).then(
        () => {
          console.log("已准备好场景信息，且sceneReady事件已触发");
        },
        err => {
          wx.hideLoading();
          console.error("打开场景失败：", err);
        }
      );
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

.btn {
  width: 100vw;
  position: absolute;
  bottom: 6vh;
  z-index: 3;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
