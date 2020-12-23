<template>
  <view class="layer scene-box">
    <!-- 场景列表 -->
    <collectionEnter
      ref="collectScene"
      v-if="sceneData.name === 'collectionEnter'"
    />
    <cloudOrGyroscopeCollecttion
      ref="collectScene"
      v-if="sceneData.name === 'cloudOrGyroscopeCollecttion'"
    ></cloudOrGyroscopeCollecttion>
    <trackingCollecttion
      ref="collectScene"
      v-if="sceneData.name === 'trackingCollecttion'"
    >
    </trackingCollecttion>

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
    <!-- 只限于扫描使用 -->
    <cover-view v-if="showAlert && cancelScanning" class="show-alert"
      >移近一点，保持扫描</cover-view
    >
    <cover-view v-if="!showAlert && cancelScanning" class="show-alert"
      >请对准识别图</cover-view
    >
    <cover-image
      v-if="cancelScanning"
      src="/static/scanning.png"
      class="icon-middle"
      :style="{ top: scanProgress + 'vh' }"
    ></cover-image>
  </view>
</template>

<script>
import share from "@/mixins/share.mixin";

import collectionEnter from "../../components/collectionEnter";
import cloudOrGyroscopeCollecttion from "../../components/cloudOrGyroscopeCollecttion";
import trackingCollecttion from "../../components/trackingCollecttion";

export default {
  mixins: [share],
  components: {
    collectionEnter,
    cloudOrGyroscopeCollecttion,
    trackingCollecttion
  },
  data() {
    return {
      sceneData: {},
      progress: 1,
      showProgressNum: false,
      showAlert: false,
      animationData: {},
      loadingTimer: null,
      timer: null,
      scanProgress: 20,
      cancelScanning: false,
      titleTimer: null
    };
  },
  onLoad() {
    // 注册loading动画
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: "linear", // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 0,
      transformOrigin: "50% 50% 0"
    });

    this.sceneData = uni.getStorageSync("sceneData");
  },
  watch: {
    progress(value) {
      if (value === 1) {
        clearInterval(this.loadingTimer);
      }
    }
  },
  methods: {
    rotateAni(n) {
      //TODO: 部分手机存在问题
      this.animation.rotate(180 * n).step();
      this.animationData = this.animation.export();
    },
    playLoading() {
      this.progress = 0;
      let x = 1;
      this.rotateAni(x);
      this.loadingTimer = setInterval(() => {
        this.rotateAni(x);
        x++;
      }, 500);
    },
    changeProgress(progress) {
      this.progress = progress;
    },
    scaningStartAnimation(time = 6, num = 0.1) {
      this.cancelScanning = true;
      this.timer = setInterval(() => {
        if (this.scanProgress >= 65) {
          this.scanProgress = 20;
        } else {
          this.scanProgress += num;
        }
      }, time);
      this.titleTimer = setTimeout(() => {
        this.showAlert = true;
      }, 3000);
    },
    scaningStopAnimation() {
      clearInterval(this.timer);
      if (this.titleTimer) clearTimeout(this.titleTimer);
      this.showAlert = false;
      this.cancelScanning = false;
      this.scanProgress = 20;
    },
    showProgress() {
      this.showProgressNum = true;
    },
    closeProgress() {
      this.showProgressNum = false;
    }
  },
  beforeDestroy() {
    clearInterval(this.loadingTimer);
    clearInterval(this.timer);
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
.icon-middle {
  width: 100vw;
  height: 14vw;
  position: absolute;
  top: 20vh;
  z-index: 2;
}

.show-alert {
  width: 42.67vw;
  height: 8.53vw;
  position: absolute;
  left: 0;
  right: 0;
  top: 18vh;
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
