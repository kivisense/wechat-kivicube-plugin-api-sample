<template>
  <view class="layer">
    <kivicube-scene
      class="kivicube"
      scene-id="oUtNGtjYDlAU4BhqH40z1UeUNkmOZKbL"
      @error="error"
      @ready="ready"
      @downloadAssetStart="downloadAssetStart"
      @downloadAssetProgress="downloadAssetProgress"
      @downloadAssetEnd="downloadAssetEnd"
      @loadSceneStart="loadSceneStart"
      @loadSceneEnd="loadSceneEnd"
      @sceneStart="sceneStart"
      hideTakePhoto
      hideLoading
      hideDownload
      hideScan
    />
    <cover-view class="bottom-btn-group" v-if="showOperate">
      <cover-view class="model-btn-group">
        <cover-view class="default-view-btn" @click="panorama"
          >增加PBR贴图</cover-view
        >
        <cover-view class="default-view-btn" @click="remove"
          >移除环境贴图</cover-view
        >
      </cover-view>
    </cover-view>
  </view>
</template>

<script>
import { requestFile } from "@/utils/asset";
import scene from "@/mixins/scene.mixin";

export default {
  props: {},
  mixins: [scene],
  data: () => ({
    showOperate: false
  }),
  computed: {},
  methods: {
    ready({ detail: view }) {
      this.view = view;
    },
    async sceneStart() {
      this.panoramaAb = await requestFile(
        "https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-demo/panorama-map/panorama.jpg"
      );

      this.panoramaEnvMap = await this.view.generateEnvMapByPanorama(
        this.panoramaAb,
        "jpg",
        () => {}
      );

      this.showOperate = true;
      console.log("scene", this.view.sceneInfo);
      const { name } = this.view.sceneInfo.objects[0];
      const model = this.view.getObject(name);
      this.model = model;
    },
    panorama() {
      this.model.useEnvMap(this.panoramaEnvMap);
    },
    remove() {
      this.model.useEnvMap(null);
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
.bottom-btn-group {
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 35vw;
}
.model-btn-group {
  display: flex;
  justify-content: center;
}
</style>
