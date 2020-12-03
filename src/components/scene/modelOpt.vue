<template>
  <view class="layer">
    <kivicube-scene
      class="kivicube"
      scene-id="XOTxEGb44JTJnh7pcTQC3HB0qsC2ggEi"
      @error="error"
      @ready="ready"
      @downloadAssetStart="downloadAssetStart"
      @downloadAssetProgress="downloadAssetProgress"
      @downloadAssetEnd="downloadAssetEnd"
      @loadSceneStart="loadSceneStart"
      @sceneStart="sceneStart"
      @loadSceneEnd="loadSceneEnd"
      hideTakePhoto
      hideLoading
      hideDownload
      hideScan
    />
    <cover-view class="bottom-btn-group" v-if="showOperate">
      <!-- 控制模型 -->
      <cover-view class="model-btn-group">
        <cover-view class="default-view-btn" @click="play('dance', false)"
          >循环播放</cover-view
        >
        <cover-view class="default-view-btn" @click="pause"
          >暂停播放</cover-view
        >
        <cover-view class="default-view-btn" @click="stopAll"
          >停止播放</cover-view
        >
        <cover-view class="default-view-btn" @click="play('dance')"
          >重新播放</cover-view
        >
      </cover-view>
    </cover-view>
  </view>
</template>

<script>
import scene from "@/mixins/scene.mixin";

export default {
  props: {},
  mixins: [scene],
  data: () => ({
    showOperate: false,
    playName: "",
    walkProudNum: 0
  }),
  computed: {},
  methods: {
    ready({ detail: view }) {
      this.view = view;
    },
    sceneStart() {
      this.$parent.changeShowFrame(false);
      this.showOperate = true;
      const { name } = this.view.sceneInfo.objects[0];
      const model = this.view.getObject(name);
      model.addEventListener("click", () => {
        wx.showToast({ icon: "none", title: "模型被点击" });
        setTimeout(() => {
          this.play("walk_proud");
        }, 100);
      });
      model.addEventListener("play", () => {
        wx.showToast({ icon: "none", title: "模型动画开始播放" });
      });
      model.addEventListener("animationEnded", ({ animationName }) => {
        wx.showToast({
          icon: "none",
          title: `模型动画(${animationName})播放完毕`
        });
      });
      model.addEventListener("animationLoop", ({ animationName }) => {
        if (animationName === "walk_proud") {
          if (this.walkProudNum === 2) {
            this.stopAll();
            wx.navigateTo({
              url: `../web/index?url=${encodeURIComponent(
                "https://www.kivicube.com"
              )}`
            });
          } else {
            this.walkProudNum++;
          }
          // TODO:跳转实例小程序，此处计数有bug
        }
        wx.showToast({
          icon: "none",
          title: `模型动画(${animationName})循环播放`
        });
      });

      this.model = model;
      const [aname] = this.model.getAnimationNames();
      this.playName = aname;
    },
    // 因为有多个动画，所以要全部停止
    stopAll() {
      const animations = this.model.getAnimationNames();
      animations.forEach(name => {
        this.model.stopAnimation(name);
      });
    },
    pause() {
      const animations = this.model.getAnimationNames();
      if (animations.indexOf(this.playName) !== -1) {
        this.model.pauseAnimation(this.playName);
      } else {
        console.warn(`模型(${this.model.name})没有动画`);
      }
    },
    play(name, needStop = true) {
      this.walkProudNum = 0;
      const animations = this.model.getAnimationNames();

      if (animations.indexOf(name) === -1) {
        return;
      }
      if (needStop || this.playName !== name) {
        this.stopAll();
      }
      this.playName = name;

      this.model.playAnimation({
        name, // 动画名称
        loop: true, // 是否循环播放
        clampWhenFinished: false // 播放完毕后是否停留在动画最后一帧
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
