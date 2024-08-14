<template>
  <view class="layer">
    <kivicube-scene
      class="kivicube"
      scene-id="Q3mSW9yDIuLrXeUgaN0H23WaxBQ7ZKgE"
      @error="error"
      @ready="ready"
      @sceneStart="sceneStart"
      hideTakePhoto
      hideLoading
      hideDownload
      hideScan
    />
  </view>
</template>

<script>
import scene from "@/mixins/scene.mixin";

export default {
  props: {},
  data: () => ({}),
  mixins: [scene],
  computed: {},
  beforeCreate() {
    this.$parent.changeProgress(1);
    wx.showLoading({ title: "加载中..." });
  },
  methods: {
    ready({ detail: view }) {
      this.view = view;
    },
    sceneStart() {
      wx.hideLoading();
      this.$parent.changeShowFrame(false);
      const obj1 = this.view.sceneInfo.objects[0]; // 模型
      const obj2 = this.view.sceneInfo.objects[1]; // ar视频
      const obj3 = this.view.sceneInfo.objects[2]; // 音频
      const obj4 = this.view.sceneInfo.objects[3]; // 透明视频

      console.log(this.view.sceneInfo);
      const model1 = this.view.getObject(obj1.name);
      const model2 = this.view.getObject(obj2.name);
      const model3 = this.view.getObject(obj3.name);
      const model4 = this.view.getObject(obj4.name);
      const [name] = model1.getAnimationNames();
      model1.playAnimation({
        animationName: name,
        loop: true
      });
      model2.play();
      model3.play();
      model4.play();
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
