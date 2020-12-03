<template>
  <view class="layer">
    <kivicube-scene
      class="kivicube"
      scene-id="X8LOjkgMGN7iAn1U7uk8eB02sOKRL7cI"
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
      <cover-view
        class="default-view-btn"
        style="margin: 0 auto;"
        v-if="!showModel && !isControl"
        @click="addModel"
        >增加模型</cover-view
      >
      <cover-view
        class="default-view-btn"
        style="margin: 2vw auto;"
        v-if="!showVideo && !isControl"
        @click="addVideo"
        >增加视频</cover-view
      >
      <!-- 控制模型 -->
      <cover-view class="model-btn-group" v-if="showModel">
        <cover-view class="default-view-btn" @click="modelOpt('scale-up')"
          >增大</cover-view
        >
        <cover-view class="default-view-btn" @click="modelOpt('scale-down')"
          >缩小</cover-view
        >
        <cover-view class="default-view-btn" @click="modelOpt('rotation')"
          >旋转</cover-view
        >
        <cover-view
          class="default-view-btn"
          @click="modelOpt('change-position')"
          >改变位置</cover-view
        >
        <cover-view class="default-view-btn" @click="removeModel"
          >移除模型</cover-view
        >
      </cover-view>
      <!-- 控制视频 -->
      <cover-view class="model-btn-group" v-if="showVideo">
        <cover-view class="default-view-btn" @click="videoOpt('play')"
          >循环播放</cover-view
        >
        <cover-view class="default-view-btn" @click="videoOpt('pause')"
          >暂停播放</cover-view
        >
        <cover-view class="default-view-btn" @click="videoOpt('stop')"
          >停止播放</cover-view
        >
        <cover-view class="default-view-btn" @click="videoOpt('full-screen')"
          >全屏播放</cover-view
        >
        <cover-view class="default-view-btn" @click="removeVideo"
          >移除视频</cover-view
        >
      </cover-view>
    </cover-view>
  </view>
</template>

<script>
import { requestFile, downloadFile } from "@/utils/asset";
import { errorHandler } from "@/utils/helper";
import scene from "@/mixins/scene.mixin";

export default {
  props: {},
  mixins: [scene],
  data: () => ({
    showOperate: false,
    showModel: false,
    showVideo: false,
    isControl: false
  }),
  computed: {},
  methods: {
    ready({ detail: view }) {
      this.view = view;
    },
    sceneStart() {
      this.$parent.changeShowFrame(false);
      this.showOperate = true;
    },
    async addModel() {
      const toDeg = num => (num * Math.PI) / 180;
      this.showModel = true;
      this.isControl = true;
      wx.showLoading({ title: "下载中...", mask: true });
      try {
        const modelUrl =
          "https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-sample/tyrannosaurus-rex.glb";
        const modelAb = await requestFile(modelUrl);
        // 如果模型是gltf格式，则必须传递第二个参数。否则可为空
        const model = await this.view.addModel(modelAb, null, () => {});

        // model.position.set(-0.8, -2.5, 0);
        model.position.set(0, 0, 0);
        model.rotation.set(0, toDeg(45), 0);
        model.scale.setScalar(0.5);

        const [name] = model.getAnimationNames();
        model.playAnimation({
          name,
          loop: true
        });

        this.model = model;

        wx.hideLoading();
      } catch (e) {
        wx.hideLoading();
        errorHandler(e);
      }
    },
    async addVideo() {
      this.showVideo = true;
      this.isControl = true;
      wx.showLoading({ title: "下载中...", mask: true });
      try {
        // 既支持下载为本地文件路径，也支持直接使用url。
        const videoUrlOrPath = await downloadFile(
          "https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-sample/tyrannosaurus-rex.mp4"
        );
        const defaultThumbnailUrl = ""; // 如果视频显示不出来，则显示默认的缩略图。传递为空则不显示缩略图。

        const video = await this.view.addVideo(
          videoUrlOrPath,
          defaultThumbnailUrl,
          () => {}
        );
        // video.position.set(0, 1.65, 0);
        video.position.set(0, 0, 0);
        video.rotation.set(0, 0, 0);
        video.scale.setScalar(1.4);

        // 设置事件监听
        video.addEventListener("click", () => {
          wx.showToast({ icon: "none", title: "视频被点击" });
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

        wx.hideLoading();
      } catch (e) {
        wx.hideLoading();
        errorHandler(e);
      }
    },
    // 模型操作
    modelOpt(type) {
      const deg = num => (num * Math.PI) / 180;
      const angle = deg => (deg * 180) / Math.PI;
      const random = () => Math.random();
      if (type === "scale-up") {
        const scaleX = this.model.scale.x;
        this.model.scale.setScalar(scaleX + 0.1);
      }
      if (type === "scale-down") {
        const scaleX = this.model.scale.x;
        this.model.scale.setScalar(scaleX - 0.1);
      }
      if (type === "change-position") {
        this.model.position.set(random(), random(), random());
      }
      if (type === "rotation") {
        // 沿y轴旋转
        const AngleY = angle(this.model.rotation.y);
        this.model.rotation.set(0, deg(AngleY + 10), 0);
      }
    },
    // 视频操作
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
      if (type === "full-screen") {
        this.video.loop = false; // 是否循环播放
        this.video.play();
        this.video.requestFullScreen();
        // 退出全屏API
        // this.video.exitFullScreen();
      }
    },
    // 移除模型
    removeModel() {
      if (this.model) {
        this.view.remove(this.model);
        this.model = null;
        this.showModel = false;
        this.isControl = false;
      }
    },
    // 移除视频
    removeVideo() {
      if (this.video) {
        this.view.remove(this.video);
        this.video = null;
        this.showVideo = false;
        this.isControl = false;
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
