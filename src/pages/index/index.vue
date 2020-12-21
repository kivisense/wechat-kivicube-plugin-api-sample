<template>
  <view class="layout layer">
    <scroll-view scroll-y="true" class="layer">
      <view class="scene-list-box">
        <view v-for="(type, idx) in sceneOptions" :key="idx" class="scene-type">
          <view class="title">{{ type.title }}</view>
          <view
            v-for="(item, idx2) in type.child"
            :key="idx2"
            class="item"
            @click="clickOpt(item)"
          >
            <view>{{ item.title }}</view>
            <image src="/static/right.png" class="aim" mode="widthFix" />
          </view>
        </view>
      </view>
    </scroll-view>
    <Modal ref="showModal" />
    <webModal ref="showWebModal" />
  </view>
</template>

<script>
import share from "@/mixins/share.mixin";
import Modal from "@/components/Modal";
import webModal from "@/components/webModal";
import { sceneOptions } from "@/components/scene/scene";
import { MTAInit, MTAEvent } from "@/MTA";
export default {
  components: { Modal, webModal },
  mixins: [share],
  data: () => ({
    sceneOptions: sceneOptions
  }),
  onLoad() {
    MTAInit();
  },
  methods: {
    clickOpt(item) {
      if (item.type === "web") {
        this.openWebMadal(item);
      } else {
        this.openModal(item);
      }
      MTAEvent(item.clickMta);
    },
    openModal(item) {
      this.$refs.showModal.show(item);
    },
    openWebMadal(item) {
      this.$refs.showWebModal.show(item);
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  background-color: #fff;
  .logo {
    width: 40vw;
    margin: 10vw 10vw 3vw;
  }
}
.scene-list-box {
  padding: 8vw;
}
.scene-type {
  margin-bottom: 10vw;
  .title {
    color: #cbcbcb;
    font-size: 3vw;
    margin-left: 3vw;
    font-weight: bold;
  }
  .item {
    height: 10vw;
    margin: 10px 0;
    border-radius: 10vw;
    background: #eeeeee;
    font-size: 3vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3vw;
    color: #333;
    .aim {
      width: 5vw;
      display: block;
      height: auto;
    }
  }
}
</style>
