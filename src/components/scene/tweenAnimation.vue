<template>
  <view class="layer">
    <kivicube-scene
      class="kivicube"
      scene-id="qcAluuIz6JGQU0ArD2HS4fAytPPaLoZp"
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
  </view>
</template>

<script>
import TWEEN from "@tweenjs/tween.js";
import scene from "@/mixins/scene.mixin";

export default {
  props: {},
  mixins: [scene],
  data: () => ({}),
  computed: {},
  methods: {
    ready({ detail: view }) {
      this.view = view;
    },
    sceneStart() {
      this.$parent.changeShowFrame(false);
      const { name } = this.view.sceneInfo.objects[0];
      const model = this.view.getObject(name);

      const toDeg = num => (num * Math.PI) / 180;
      const toAngle = deg => (deg * 180) / Math.PI;

      const originScale = model.scale.x;
      const changeScale = model.scale.x * 0.6;

      const originRotationY = toAngle(model.rotation.y);
      const changeRotationY = originRotationY - 30;

      model.rotation.y = toDeg(changeRotationY);
      model.scale.setScalar(changeScale);

      model.onBeforeRender = () => {
        TWEEN.update();
      };
      const startTransform = {
        scale: changeScale,
        angle: changeRotationY
      };
      const endTransform = {
        scale: originScale,
        angle: originRotationY
      };
      const duration = 1000;
      new TWEEN.Tween(startTransform)
        .to(endTransform, duration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(({ scale, angle }) => {
          model.rotation.set(0, toDeg(angle), 0);
          model.scale.setScalar(scale);
        })
        .repeat(0)
        .start();
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
