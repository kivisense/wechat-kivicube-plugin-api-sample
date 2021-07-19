<template>
  <cover-view v-if="showModal" class="flex-box layer modal" scroll-top="0">
    <cover-view class="modal-box flex-box" scroll-top="0">
      <cover-view v-if="showData.title" class="modal-title" scroll-top="0">{{
        showData.title
      }}</cover-view>
      <cover-image
        class="close"
        src="/static/close.png"
        @click="hidden"
      ></cover-image>
      <cover-view v-if="showData.description" class="modal-txt" scroll-top="0">
        <cover-view
          v-for="(txt, idx) in showData.description"
          :key="idx"
          :class="{ 'line-txt': true, 'line-title': txt.type === 'title' }"
        >
          {{ txt.txt }}
        </cover-view>
      </cover-view>
      <cover-view class="btn" scroll-top="0" @click="immediateExperience"
        >立即体验</cover-view
      >
    </cover-view>
  </cover-view>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    showModal: false,
    showData: {},
    cb: () => {}
  }),
  mounted() {
    this.showModal = this.value;
  },
  watch: {
    value(val) {
      this.showModal = val;
    }
  },
  methods: {
    show(showData, cb = () => {}) {
      this.showModal = true;
      this.showData = showData;
      this.cb = cb;
    },
    hidden() {
      this.showModal = false;
      this.$emit("input", false);
      this.$emit("close");
      this.cb();
    },
    immediateExperience() {
      this.$uma.trackEvent(this.showData.startMta);
      uni.setStorageSync("sceneData", this.showData);
      this.hidden();
      if (this.showData.type === "scene") {
        wx.navigateTo({ url: "../scene/index" });
      } else if (this.showData.type === "collectScene") {
        wx.navigateTo({
          url: "/collect/pages/collectScene/index"
        });
      } else {
        wx.navigateTo({ url: "../cloudar/index" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.flex-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.layer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-box {
  background: rgba(255, 255, 255, 1);
  width: 307px;
  min-height: 215px;
  position: relative;
}
.modal-title {
  position: absolute;
  height: 18px;
  top: 25px;
  right: 0;
  left: 0;
  font-size: 14px;
  color: #1b1b1b;
  letter-spacing: 0.7px;
  text-align: center;
  font-weight: bold;
}
.modal-txt {
  width: 80%;
  font-size: 12px;
  color: #999999;
  letter-spacing: 0;
  text-align: left;
  line-height: 14px;
  margin: 60px auto 5vw;
  .line-txt {
    line-height: 1.3;
    margin: 5px 0;
    word-break: break-all;
    white-space: normal;
  }
  .line-title {
    font-weight: bold;
    color: #333;
  }
}

.btn {
  background: #1b1b1b;
  text-align: center;
  width: 220px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #e5dfd9;
  letter-spacing: 0;
  margin-bottom: 10vw;
}
.close {
  position: absolute;
  width: 18px;
  height: 18px;
  top: 25px;
  right: 25px;
}
</style>
