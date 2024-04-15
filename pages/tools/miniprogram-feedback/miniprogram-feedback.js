// pages/tools/miniprogram-feedback/miniprogram-feedback.js
const {
  deviceSupportV1,
  deviceSupportV2,
  deviceSupportVerticalPlane,
  deviceSupportWorld,
} = requirePlugin("kivicube");

Page({
  data: {
    list: [],
  },
  onLoad() {
    const supportV1 = deviceSupportV1();
    const supportV2 = deviceSupportV2();
    const supportVerticalPlane = deviceSupportVerticalPlane();
    const supportWorld = deviceSupportWorld();
    console.log(`supportV1`, supportV1);
    console.log(`supportV2`, supportV2);
    console.log(`supportVerticalPlane`, supportVerticalPlane);
    console.log(`supportWorld`, supportWorld);

    const textIdx = (() => {
      if (!supportV1 && !supportV2) return 0;
      if (supportV2) {
        if (supportVerticalPlane) {
          return 3;
        }
        return 2;
      }
      if (supportV1) return 1;
    })();

    let list = [
      {
        label: "图像AR",
        value: `${
          ["不支持", "支持，V1", "支持，V1，V2", "支持，V1，V2"][textIdx]
        }`,
      },
      {
        label: "云识别/陀螺仪",
        value: `支持`,
      },
      {
        label: "3D互动",
        value: `支持`,
      },
      {
        label: "身体AR",
        value: `不支持，可以通过WebView支持`,
      },
      {
        label: "平面AR",
        value: `${
          [
            "不支持",
            "支持，V1",
            "支持，V1，V2(水平面)",
            "支持，V1，V2(水平+竖直面)",
          ][textIdx]
        }`,
      },
      {
        label: "漫游AR",
        value: `${["不支持", "支持，兼容模式", "支持", "支持"][textIdx]}`,
      },
      {
        label: "世界AR",
        value: `${supportWorld ? "支持" : "不支持"}`,
      },
      {
        label: "地标AR",
        value: `${["不支持", "不支持", "支持", "支持"][textIdx]}`,
      },
    ];
    this.setData({
      list,
    });
  },
  onShareAppMessage: function () {
    return {
      title: "Kivicube企业版高级API示例 - 小程序兼容反馈",
      path: "/pages/tools/miniprogram-feedback/miniprogram-feedback",
      imageUrl: "/assets/images/share.jpg",
    };
  },
});
