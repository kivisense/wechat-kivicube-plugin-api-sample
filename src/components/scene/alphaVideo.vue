<template>
  <view class="layer">
    <kivicube-scene
      class="kivicube"
      scene-id="lu1zB3xiVd1oVpqIFRNtk8Mt3h2XH1ox"
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
        <cover-view class="default-view-btn" @click="videoOpt('play')"
          >循环播放</cover-view
        >
        <cover-view class="default-view-btn" @click="videoOpt('pause')"
          >暂停播放</cover-view
        >
        <cover-view class="default-view-btn" @click="videoOpt('stop')"
          >停止播放</cover-view
        >
        <cover-view class="default-view-btn" @click="videoOpt('playback')"
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
      const video = this.view.getObject(name);
      video.addEventListener("click", () => {
        wx.showToast({ icon: "none", title: "视频被点击" });
        video.stop();
      });
      video.addEventListener("play", () => {
        wx.showToast({ icon: "none", title: "视频开始播放" });
      });
      video.addEventListener("pause", () => {
        wx.showToast({ icon: "none", title: "视频暂停播放" });
      });
      video.addEventListener("ended", () => {
        wx.showToast({ icon: "none", title: "视频播放完毕" });
      });

      this.video = video;
    },
    error(e) {
      console.log(e);
    },
    videoOpt(type) {
      if (type === "pause") {
        this.video.pause();
      }
      if (type === "stop") {
        this.video.stop();
      }
      if (type === "play") {
        this.video.loop = true; // 是否循环播放
        this.video.play();
      }
      if (type === "playback") {
        this.video.seek(0.1);
        // seek需要一段时间起作用
        setTimeout(() => {
          this.video.loop = false; // 是否循环播放
          this.video.play();
        }, 50);
      }
    },
    takePhoto() {
      return new Promise(async (resolve, reject) => {
        wx.showLoading({ title: "拍照中...", mask: true });
        this.view
          .takePhoto()
          .then(photoPath => {
            wx.hideLoading();
            resolve(photoPath);
          })
          .catch(e => {
            wx.hideLoading();
            reject("error", e);
          });
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
