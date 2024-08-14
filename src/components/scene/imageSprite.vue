<template>
  <view class="layer">
    <kivicube-scene
      class="kivicube"
      scene-id="GhWYjw8rRxjrtkp6SCIQ8Hju1p8JcMmQ"
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
  </view>
</template>

<script>
import { requestFile } from "@/utils/asset";
import { errorHandler } from "@/utils/helper";
import scene from "@/mixins/scene.mixin";

export default {
  props: {},
  mixins: [scene],
  data: () => ({
    isPlay: true
  }),
  computed: {},
  methods: {
    ready({ detail: view }) {
      this.view = view;
    },
    sceneStart() {
      this.$parent.changeShowFrame(false);
      const { name } = this.view.sceneInfo.objects[0];
      this.audio = this.view.getObject(name);
      this.audio.loop = true; // 是否循环播放
      this.audio.play();
      this.addSprite();
    },
    async addSprite() {
      try {
        const spriteName = "show";
        const image = await requestFile(
          "https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-sample/music-effect.png"
        );
        const imageSprite = await this.view.createImageSprite({
          images: image,
          type: "png",
          sprite: spriteName,
          col: 16,
          row: 16,
          lastRowEmptyCol: 2,
          width: 1,
          height: 1,
          fps: 30
        });

        this.view.add(imageSprite);

        // imageSprite.position.y = 2.5;
        imageSprite.rotation.y = -Math.PI / 4;
        imageSprite.scale.setScalar(1);

        imageSprite.addEventListener("spriteEnded", ({ sprites }) => {
          wx.showToast({
            title: `精灵图自然播放完毕，序列名称：${sprites.join(",")}`,
            icon: "none"
          });
        });

        imageSprite.addEventListener("spriteLoop", ({ sprites, loopDelta }) => {
          wx.showToast({
            title: `精灵图循环播放完毕${loopDelta}次，序列名称：${sprites.join(
              ","
            )}`,
            icon: "none"
          });
        });

        imageSprite.addEventListener("click", () => {
          if (this.isPlay) {
            this.playOpt("pause");
          } else {
            this.playOpt("play");
          }
          this.isPlay = !this.isPlay;
        });

        this.imageSprite = imageSprite;
        this.spriteName = spriteName;
        this.imageSprite.playSprite(this.spriteName, true);
      } catch (e) {
        errorHandler(e);
      }
    },
    playOpt(type) {
      if (type === "pause") {
        this.audio.pause();
        this.imageSprite.pauseSprite();
      }
      if (type === "play") {
        this.audio.play();
        this.imageSprite.playSprite(this.spriteName, true);
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
.bottom-btn-group {
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 35vw;
}
.model-btn-group {
  display: flex;
}
</style>
