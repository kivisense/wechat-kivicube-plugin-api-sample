// pages/scene-setup/setup-autoPlay/setup-autoPlay.js
const { cameraErrorHandler } = require("../../../utils/util.js");
Page({
  data: {
    sceneId: "Q3mSW9yDIuLrXeUgaN0H23WaxBQ7ZKgE", // 场景ID
    sceneData: { from: "list" }
  },
  onLoad: function() {
    wx.showLoading({ title: "加载中..." });
  },
  ready({ detail: view }) {
    this.view = view;
  },
  // 错误判断
  error(e) {
    const { detail } = e;
    const page = this;
    // 判定是否camera权限问题，是则向用户申请权限。
    cameraErrorHandler(detail, page);
  },
  sceneStart() {
    wx.hideLoading();
    const obj1 = this.view.sceneInfo.objects[0]; // 模型
    const obj2 = this.view.sceneInfo.objects[1]; // ar视频
    const obj3 = this.view.sceneInfo.objects[2]; // 音频
    const obj4 = this.view.sceneInfo.objects[3]; // 透明视频
    console.log(this.view.sceneInfo);
    const model1 = this.view.getObject(obj1.name);
    const video1 = this.view.getObject(obj2.name);
    const audio = this.view.getObject(obj3.name);
    const video2 = this.view.getObject(obj4.name);
    const [name] = model1.getAnimationNames();
    model1.playAnimation({
      animationName: name,
      loop: true
    });
    video1.videoContext.play();
    audio.play();
    video2.videoContext.play();
  },
  onShareAppMessage() {
    return {
      title: `Kivicube企业版高级API示例：${this.data.sceneData.title}`,
      path: `/pages/scene-setup/setup-autoPlay/setup-autoPlay?id=${this.data.sceneData.id}`,
      imageUrl: "/assets/images/share.jpg"
    };
  }
});
