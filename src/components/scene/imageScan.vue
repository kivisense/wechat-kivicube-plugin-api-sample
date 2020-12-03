<template>
  <view class="layer">
    <kivicube-scene
      class="kivicube"
      scene-id="E6zfUsOupl9zgyOvtylKMl3jTHIeKxz9"
      @error="error"
      @ready="ready"
      @downloadAssetStart="downloadAssetStart"
      @downloadAssetEnd="downloadAssetEnd"
      @loadSceneStart="loadSceneStart"
      @sceneStart="sceneStart"
      hideLoading
      hideDownload
      hideScan
      hideTakePhoto
    />
    <canvas id="sequence" class="layer" canvas-id="image-sequence"></canvas>
  </view>
</template>

<script>
import scene from "@/mixins/scene.mixin";
import { fetchBatch } from "@/utils/asset";

export default {
  props: {},
  mixins: [scene],
  data: () => ({
    photoList: {},
    isStart: false
  }),
  computed: {},
  mounted() {
    this.$parent.changeShowTakePhoto(false);
    let downloadList = [];
    for (let i = 0; i <= 74; i++) {
      const name = `${i}`.padStart(5, "0");
      downloadList.push(
        `https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-sample/images/RedPacket_${name}.png`
      );
    }
    let progress = 0;
    fetchBatch(downloadList, 5, () => {
      progress += 0.01;
      this.$parent.changeProgress(progress);
    }).then(list => {
      this.photoList = list;
      this.$parent.changeProgress(1);
      this.$parent.changeShowFrame(true);
      setTimeout(() => {
        if (!this.isStart) {
          this.$parent.changeShowAlert(true);
        }
      }, 3000);
    });
  },
  methods: {
    ready({ detail: view }) {
      this.view = view;
    },
    sceneStart() {
      this.isStart = true;
      this.$parent.changeShowFrame(false);
      this.$parent.changeShowTakePhoto(true);
      this.$parent.changeShowAlert(false);
      this.drawImg(this.photoList);
    },
    async drawImg(giftLoading) {
      const { width: canvasWidth, height: canvasHeight } = await new Promise(
        r => {
          const query = wx.createSelectorQuery();
          query
            .in(this)
            .select("#sequence")
            .boundingClientRect(r);
          query.exec();
        }
      );

      const imgs = Object.keys(giftLoading);
      const { width: imageWidth, height: imageHeight } = await new Promise(
        (resolve, reject) => {
          wx.getImageInfo({
            src: giftLoading[imgs[0]],
            success(res) {
              resolve(res);
            },
            fail(e) {
              reject(e);
            }
          });
        }
      );
      const drawWidth = canvasWidth * 0.7;
      const cxt = wx.createCanvasContext("image-sequence", this);
      let frameIndex = 0;
      const render = () => {
        if (frameIndex >= imgs.length) {
          wx.navigateTo({ url: `../some/index` });
          return;
          // frameIndex = 0;
        }
        cxt.drawImage(
          giftLoading[imgs[frameIndex++]],
          0,
          0,
          imageWidth,
          imageHeight,
          (canvasWidth - drawWidth) / 2,
          canvasHeight * 0.3,
          drawWidth,
          drawWidth
        );
        cxt.draw(false);
        setTimeout(render, 1000 / 30);
      };
      render();
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
