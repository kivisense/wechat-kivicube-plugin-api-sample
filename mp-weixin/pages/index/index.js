// index.js
// 获取应用实例
// const app = getApp();
import sceneOptions from "../../utils/sceneOptions";
Page({
  data: {
    sceneOptions
  },
  // 事件处理函数
  handleTap(e) {
    console.log(e.currentTarget.dataset.item);
  },
  onLoad() {}
});
