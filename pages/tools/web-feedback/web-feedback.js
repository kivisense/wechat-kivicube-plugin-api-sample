// pages/tools/web-feedback/web-feedback.js
const { analyzeRunType } = requirePlugin("kivisense-ar");
Page({
  data: {
    list: [],
  },
  onLoad() {
    const webviewUrl = `https://project.kivisense.com/helper-tools/feedback.html?feedback=1`;

    const { type: bodyArType } = analyzeRunType({
      geometry: webviewUrl,
    });
    if (bodyArType === "web") {
      // 支持身体AR
      webviewUrl += "&body=1";
    } else {
      // 不支持身体AR
      webviewUrl += "&body=0";
    }

    this.setData({ webviewUrl });

    const list = [
      {
        label: "图像AR",
        value: `${["不支持", "支持，V1"]}`,
      },
      {
        label: "云识别/陀螺仪",
        value: `不支持`,
      },
      {
        label: "3D互动",
        value: `不支持`,
      },
      {
        label: "身体AR",
        value: `不支持`,
      },
      {
        label: "平面AR",
        value: `不支持`,
      },
      {
        label: "漫游AR",
        value: `不支持`,
      },
      {
        label: "世界AR",
        value: `不支持`,
      },
      {
        label: "地标AR",
        value: `不支持`,
      },
    ];
  },
  onShareAppMessage: function () {
    return {
      title: "Kivicube企业版高级API示例 - web兼容反馈",
      path: "/pages/tools/web-feedback/web-feedback",
      imageUrl: "/assets/images/share.jpg",
    };
  },
});
