<template>
  <view class="layer">
    <kivicube-collection
      class="kivicube"
      :collectionId="collectionId"
      @error="error"
      @ready="ready"
      hideTakePhoto
    />
  </view>
</template>
<script>
export default {
  data: () => ({
    collectionId: "",
    sceneData: {}
  }),
  beforeCreate() {
    wx.showLoading({ title: "加载中..." });
  },
  mounted() {
    this.sceneData = uni.getStorageSync("sceneData");
    this.collectionId = this.sceneData.collectionId;
  },
  methods: {
    ready({ detail: view }) {
      wx.hideLoading();
      this.view = view;
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
</style>
