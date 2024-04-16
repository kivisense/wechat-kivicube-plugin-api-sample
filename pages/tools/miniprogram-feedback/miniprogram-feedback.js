// pages/tools/miniprogram-feedback/miniprogram-feedback.js
const {
  deviceSupportV1,
  deviceSupportV2,
  deviceSupportVerticalPlane,
  deviceSupportWorld,
} = requirePlugin("kivicube");
const LABELS = [
  { key: "marker-ar", name: "图像AR" },
  { key: "cloudar", name: "云识别/陀螺仪" },
  { key: "show3d", name: "3D互动" },
  { key: "body-ar", name: "身体AR" },
  { key: "plane", name: "平面AR" },
  { key: "roam", name: "漫游AR" },
  { key: "world", name: "世界AR" },
  { key: "landmark", name: "地标AR" },
];
Page({
  data: {
    list: [],
  },
  onLoad() {
    let list = LABELS.map((label) => {
      let item = {
        label: label.name,
        value: "",
      };
      switch (label.key) {
        case "marker-ar":
          if (this.isVersionOver("2.25.0")) {
            item.value = "支持V1，V2";
          } else if (this.isVersionOver("2.14.0")) {
            item.value = "支持V1";
          } else {
            item.value = "不支持";
          }
          break;
        case "cloudar":
          if (this.isVersionOver("2.14.0")) {
            item.value = "支持";
          } else {
            item.value = "不支持";
          }
          break;
        case "show3d":
          if (this.isVersionOver("2.14.0")) {
            item.value = "支持";
          } else {
            item.value = "不支持";
          }
          break;
        case "body-ar":
          item.value = "不支持，可以通过WebView支持";
          break;
        case "plane":
          if (deviceSupportVerticalPlane()) {
            item.value = "支持，V1，V2(水平+竖直面)";
          } else if (deviceSupportV2()) {
            item.value = "支持，V1，V2(水平面)";
          } else if (deviceSupportV1()) {
            item.value = "支持，V1";
          } else {
            item.value = "不支持";
          }
          break;
        case "roam":
          if (deviceSupportV2()) {
            item.value = "支持";
          } else if (deviceSupportV1()) {
            item.value = "支持, 兼容模式";
          } else {
            item.value = "不支持";
          }
          break;
        case "world":
          if (deviceSupportWorld()) {
            item.value = "支持";
          } else {
            item.value = "不支持";
          }
          break;
        case "landmark":
          if (this.isVersionOver("2.25.0")) {
            item.value = "支持";
          } else {
            item.value = "不支持";
          }
          break;
      }
      return item;
    });
    this.setData({
      list,
    });
  },
  isVersionOver(v) {},
  onShareAppMessage: function () {
    return {
      title: "Kivicube企业版高级API示例 - 小程序兼容反馈",
      path: "/pages/tools/miniprogram-feedback/miniprogram-feedback",
      imageUrl: "/assets/images/share.jpg",
    };
  },
});
