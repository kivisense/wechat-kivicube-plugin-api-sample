<template>
  <view class="layer">
    <kivicube-scene
      class="kivicube"
      scene-id="qcAluuIz6JGQU0ArD2HS4fAytPPaLoZp"
      @error="error"
      @ready="ready"
      @sceneStart="sceneStart"
      @downloadAssetStart="downloadAssetStart"
      @downloadAssetProgress="downloadAssetProgress"
      @downloadAssetEnd="downloadAssetEnd"
      @loadSceneStart="loadSceneStart"
      @loadSceneEnd="loadEnd"
      hideTakePhoto
      hideLoading
      hideDownload
      hideScan
    />
  </view>
</template>

<script>
import scene from "@/mixins/scene.mixin";

export default {
  props: {},
  mixins: [scene],
  data: () => ({}),
  computed: {},
  methods: {
    ready({ detail: view }) {
      this.view = view;
    },
    sceneStart() {
      this.$parent.changeShowFrame(false);
      this.$parent.changeShowTakePhoto(true);

      const { name } = this.view.sceneInfo.objects[0];
      const obj = this.view.getObject(name);
      obj.addEventListener("click", () => {
        // 点击后跳转示例小程序
        wx.navigateToMiniProgram({
          appId: "wx667be9ee0e001ef2",
          path: "/pages/lemma/lemma?ch=wx.item&lid=4169539"
        });
      });
    },
    loadEnd() {
      this.$parent.changeProgress(1);
      // 只有云识别类型的场景，才具备api：skipCloudar。
      console.log(this.view.sceneInfo);
      if (this.view.sceneInfo.mode === "cloud-ar") {
        // 立即跳过识别，插件版本 <= 1.3.4时，需要延时执行才有效。
        setTimeout(() => {
          // this.view.skipCloudar();
        }, 0);

        // 或者实现为识别超时5s，就自动跳过。
        // setTimeout(() => {
        //   this.view.skipCloudar();
        // }, 5000);
      }
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
