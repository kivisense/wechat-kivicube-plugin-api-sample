<template>
  <view class="layer">
    <kivicube-scene
      class="kivicube"
      scene-id="Pd6b9beoc2ZgSZVMuMajAoRdhq79rday"
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
      <cover-view class="model-btn-group">
        <cover-view class="default-view-btn" @click="audioOpt('pause')"
          >暂停</cover-view
        >
        <cover-view class="default-view-btn" @click="audioOpt('play')"
          >播放</cover-view
        >
        <cover-view class="default-view-btn" @click="audioOpt('stop')"
          >停止</cover-view
        >
        <cover-view class="default-view-btn" @click="audioOpt('playback')"
          >重放</cover-view
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
    showOperate: false
  }),
  computed: {},
  methods: {
    ready({ detail: view }) {
      this.view = view;
    },
    sceneStart() {
      this.$parent.changeShowFrame(false);
      this.showOperate = true;
      console.log("scene", this.view.sceneInfo);
      const { name } = this.view.sceneInfo.objects[0];
      const audio = this.view.getObject(name);

      audio.addEventListener("play", () => {
        wx.showToast({ icon: "none", title: "音乐开始播放" });
      });
      audio.addEventListener("pause", () => {
        wx.showToast({
          icon: "none",
          title: `音乐暂停播放，当前时间：${audio.currentTime}`
        });
      });
      audio.addEventListener("ended", () => {
        wx.showToast({
          icon: "none",
          title: `音乐播放完毕，总时长：${audio.duration}`
        });
      });

      this.audio = audio;
    },
    audioOpt(type) {
      if (type === "pause") {
        this.audio.pause();
      }
      if (type === "stop") {
        this.audio.stop();
      }
      if (type === "play") {
        this.audio.loop = false; // 是否循环播放
        this.audio.play();
      }
      if (type === "playback") {
        this.audio.loop = false; // 是否循环播放
        this.audio.playback();
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
