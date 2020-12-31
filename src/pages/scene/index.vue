<template>
  <view class="layer scene-box">
    <!-- 场景列表 -->
    <penetrateUI ref="scene" v-if="sceneData.name === 'penetrateUI'" />
    <skipCloudar ref="scene" v-if="sceneData.name === 'skipCloudar'" />
    <autoPlay ref="scene" v-if="sceneData.name === 'autoPlay'" />
    <objManage ref="scene" v-if="sceneData.name === 'objManage'" />
    <modelOpt ref="scene" v-if="sceneData.name === 'model'" />
    <videoOpt ref="scene" v-if="sceneData.name === 'video'" />
    <alpha-video ref="scene" v-if="sceneData.name === 'alphaVideo'" />
    <audioOpt ref="scene" v-if="sceneData.name === 'audio'" />
    <tweenAnimation ref="scene" v-if="sceneData.name === 'tweenAnimation'" />
    <maskModel ref="scene" v-if="sceneData.name === 'maskModel'"></maskModel>
    <envMap ref="scene" v-if="sceneData.name === 'envMap'" />
    <imageSprite ref="scene" v-if="sceneData.name === 'imageSprite'" />
    <autoEnter ref="scene" v-if="sceneData.name === 'autoEnter'" />
    <imageScan ref="scene" v-if="sceneData.name === 'imageScan'" />
    <penetrateUITracking
      ref="scene"
      v-if="sceneData.name === 'penetrateUITracking'"
    />
    <!-- 自定义默认UI -->
    <!-- 方便统一UI管理，所以暂时写在外面 -->
    <cover-image
      v-if="showFrame"
      class="frame frame-up-left"
      src="/static/Up_Left@2x.png"
    ></cover-image>
    <cover-image
      v-if="showFrame"
      class="frame frame-up-right"
      src="/static/Up_Left@2x.png"
    ></cover-image>
    <cover-image
      v-if="showFrame"
      class="frame frame-bottom-left"
      src="/static/Up_Left@2x.png"
    ></cover-image>
    <cover-image
      v-if="showFrame"
      class="frame frame-bottom-right"
      src="/static/Up_Left@2x.png"
    ></cover-image>
    <cover-image
      v-if="showTakePhoto"
      @click="takephoto"
      class="take-photo"
      src="/static/btn-takephoto.png"
    ></cover-image>

    <!-- 显示照片 -->
    <cover-view class="layer photo-frame" v-if="photo">
      <cover-image class="layer" :src="photo"></cover-image>
      <cover-image
        class="btn-close"
        @click="photo = ''"
        src="/static/btn-close.png"
      ></cover-image>
      <cover-image
        class="btn-download"
        @click="saveImg"
        src="/static/btn-download.png"
      ></cover-image>
    </cover-view>
    <cover-view class="layer loading" v-if="progress !== 1">
      <cover-image
        :animation="animationData"
        class="loading-icon"
        src="/static/loading2.png"
      ></cover-image>
      <cover-view
        class="loading-font"
        style="margin: 2.13vw 0 0; display: flex; justify-content: center; align-items: center;"
      >
        <cover-view>加载中...</cover-view>
        <cover-view v-if="showProgressNum"
          >{{ parseInt(progress * 100) }}%</cover-view
        >
      </cover-view>
    </cover-view>
    <cover-view v-if="showAlert && showFrame" class="show-alert"
      >移近一点，保持扫描</cover-view
    >
  </view>
</template>

<script>
import { promisify } from "@/utils/helper";
import { sceneOptions } from "@/components/scene/scene";

import penetrateUI from "@/components/scene/penetrateUI";
import skipCloudar from "@/components/scene/skipCloudar";
import autoPlay from "@/components/scene/autoPlay";
import objManage from "@/components/scene/objManage";
import tweenAnimation from "@/components/scene/tweenAnimation";
import envMap from "@/components/scene/envMap";
import imageSprite from "@/components/scene/imageSprite";
import autoEnter from "@/components/scene/autoEnter";
import imageScan from "@/components/scene/imageScan";
import penetrateUITracking from "@/components/scene/penetrateUITracking";
import modelOpt from "@/components/scene/modelOpt.vue";
import videoOpt from "@/components/scene/videoOpt.vue";
import AlphaVideo from "@/components/scene/alphaVideo.vue";
import audioOpt from "@/components/scene/audioOpt.vue";
import maskModel from "@/components/scene/maskModel.vue";

export default {
  components: {
    penetrateUI,
    skipCloudar,
    autoPlay,
    objManage,
    modelOpt,
    videoOpt,
    AlphaVideo,
    audioOpt,
    tweenAnimation,
    envMap,
    imageSprite,
    autoEnter,
    imageScan,
    penetrateUITracking,
    maskModel
  },
  data() {
    return {
      showFrame: false,
      showTakePhoto: false,
      sceneData: {},
      photo: "",
      progress: 0,
      showProgressNum: false,
      showAlert: false,
      animationData: {}
    };
  },
  onLoad(options) {
    this.sceneData = {};
    // 注册loading动画
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: "linear", // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 0,
      transformOrigin: "50% 50% 0"
    });
    if (options.id) {
      sceneOptions.map(v => {
        v.child.map(scene => {
          if (scene.id === Number(options.id)) {
            this.sceneData = scene;
          }
        });
      });
    } else {
      this.sceneData = uni.getStorageSync("sceneData");
    }
    if (this.sceneData.name !== "maskModel") {
      this.playLoading();
    }
  },
  onShow() {},
  onHide() {},
  watch: {
    progress(value) {
      if (value === 1) {
        clearInterval(this.loadingTimer);
      }
    }
  },
  methods: {
    onShareAppMessage() {
      return {
        title: `Kivicube企业版高级API示例：${this.sceneData.title}`,
        path: `/pages/scene/index?id=${this.sceneData.id}`,
        imageUrl: "/static/share.jpg"
      };
    },
    rotateAni(n) {
      //TODO: 部分手机存在问题
      this.animation.rotate(90 * n).step();
      this.animationData = this.animation.export();
    },
    playLoading() {
      let x = 1;
      this.rotateAni(x);
      this.loadingTimer = setInterval(() => {
        this.rotateAni(x);
        x++;
      }, 500);
    },
    // 方便统一UI管理，所以暂时写在外面
    changeShowFrame(show = true) {
      this.showFrame = show;
    },
    changeShowTakePhoto(show = true) {
      this.showTakePhoto = show;
    },
    changeShowAlert(show = true) {
      this.showAlert = show;
    },
    hiddenAllUI() {
      this.showFrame = false;
      this.showTakePhoto = false;
    },
    changeProgress(progress) {
      this.progress = progress;
    },
    takephoto() {
      this.$refs.scene.takePhoto().then(photo => {
        this.photo = photo;
      });
    },
    // 3s未加载完成显示加载进度
    showProgress() {
      this.showProgressNum = true;
    },
    saveImg() {
      const img = this.photo;
      wx.saveImageToPhotosAlbum({
        filePath: img,
        success: () => {
          wx.showToast({
            icon: "none",
            duration: 2000,
            title: "保存成功"
          });
        },
        fail: async err => {
          if (
            err.errMsg &&
            (err.errMsg.includes("auth deny") ||
              err.errMsg.includes("authorize no response"))
          ) {
            const { confirm } = await promisify(wx.showModal)({
              title: "提示",
              content: "开启相册授权后，就可以把照片保存到本地啦！",
              confirmText: "去开启"
            });
            if (confirm) {
              const { authSetting } = await promisify(wx.openSetting)();
              if (authSetting["scope.writePhotosAlbum"]) {
                this.saveImg(img);
              }
            }
          } else {
            console.log("保存失败", err);
          }
        }
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.loadingTimer);
  }
};
</script>

<style scoped>
.scene-box {
  background-color: dimgray;
}
.frame {
  width: 16.8vw;
  height: 16.8vw;
  position: absolute;
  z-index: 2;
}
.frame-up-left {
  left: 4.27vw;
  top: 14.13vw;
}
.frame-up-right {
  right: 4.27vw;
  top: 14.13vw;
  transform: rotate(90deg);
}
.frame-bottom-left {
  left: 4.27vw;
  bottom: 14.67vw;
  transform: rotate(270deg);
}
.frame-bottom-right {
  right: 4.27vw;
  bottom: 14.67vw;
  transform: rotate(180deg);
}
.take-photo {
  width: 20vw;
  height: 20vw;
  position: absolute;
  bottom: 8vw;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 2;
}
.photo-frame {
  z-index: 3;
}
.btn-close {
  position: absolute;
  z-index: 1;
  right: 3.2vw;
  top: 3.2vw;
  width: 16vw;
  height: 16vw;
}
.btn-download {
  width: 20vw;
  height: 20vw;
  bottom: 8vw;
  left: 0;
  right: 0;
  position: absolute;
  z-index: 1;
  margin: 0 auto;
}
.loading {
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 3.73vw;
  font-weight: 500;
  line-height: 5.33vw;
  color: #ffffff;
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.32);
}
.loading-font {
  font-size: 3.73vw;
  font-weight: 500;
  line-height: 5.33vw;
}
.loading-icon {
  position: relative;
  width: 12.8vw;
  height: 12.8vw;
  z-index: 1000;
}
.loading-rotate {
  animation: rotate 1s linear infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
.show-alert {
  width: 42.67vw;
  height: 8.53vw;
  position: absolute;
  left: 0;
  right: 0;
  top: 19.2vw;
  background: rgba(111, 111, 111, 0.8);
  border-radius: 1vw;
  margin: 0 auto;
  font-size: 3.73vw;
  font-weight: 400;
  line-height: 8.53vw;
  color: #ffffff;
  text-align: center;
  z-index: 2;
}
</style>
