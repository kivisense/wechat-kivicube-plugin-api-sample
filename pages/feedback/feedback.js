// pages/feedback/feedback.js
const { formatTime } = require("../../utils/util.js");
Page({
  data: {
    title: "",
    statusBarHeight: 0,
    list: [],
    labelMap: {
      time: "反馈时间",
      system: "操作系统",
      version: "微信版本",
      SDKVersion: "基础库版本",
      benchmarkLevel: "设备评级", // 设备性能等级（仅 Android）。取值为：-2 或 0（该设备无法运行小游戏），-1（性能未知），>=1（设备性能值，该值越高，设备性能越好，目前最高不到50）
      brand: "手机品牌",
      model: "手机型号",
      language: "语言版本",
      screenWidth: "屏幕宽度",
      screenHeight: "屏幕高度",
      windowWidth: "屏幕可用宽度", // 微信上叫‘可使用窗口宽度’
      windowHeight: "屏幕可用高度", // 微信上叫‘可使用窗口高度’
      statusBarHeight: "状态栏高度",
      safeAreaWidth: "安全区域宽度",
      safeAreaHeight: "安全区域高度",
      safeAreaPos: "安全区域坐标",
      pixelRatio: "设备像素比",
      fontSizeSetting: "字体大小", // 用户字体大小（单位px）。以微信客户端「我-设置-通用-字体大小」中的设置为准
      albumAuthorized: "相册权限(ios)", // 允许微信使用相册的开关（仅 iOS 有效）
      cameraAuthorized: "摄像头权限",
      locationAuthorized: "定位权限",
      microphoneAuthorized: "麦克风权限",
      bluetoothEnabled: "系统蓝牙开关",
      locationEnabled: "系统定位开关",
      wifiEnabled: "系统WIFI开关",
      locationReducedAccuracy: "系统模糊定位(ios)", // true 表示模糊定位，false 表示精确定位，仅 iOS 支持
      deviceOrientation: "设备方向",
    },
  },
  onLoad() {
    const sceneData = wx.getStorageSync("sceneData");
    this.setData({ title: sceneData.title });
    wx.getSystemInfoAsync({
      success: (res) => {
        console.log(res);
        this.setData({ statusBarHeight: res.statusBarHeight });
        res.time = formatTime(new Date());
        const safeArea = res.safeArea;
        res.safeAreaHeight = safeArea.height;
        res.safeAreaWidth = safeArea.width;
        res.safeAreaPos = `left:${safeArea.left} | right:${safeArea.right} | top:${safeArea.top} | bottom:${safeArea.bottom}`;
        const arr = Object.entries(this.data.labelMap).map((arr) => {
          const [key, label] = arr;
          return {
            key,
            label,
            value: res[key],
          };
        });
        this.setData({ list: arr });
      },
    });
  },
  handleBack() {
    const pagesArr = getCurrentPages();
    if (pagesArr.length === 1) {
      wx.reLaunch({
        url: "/pages/index/index",
      });
    } else {
      wx.navigateBack();
    }
  },
  onShareAppMessage: function () {
    return {
      title: "Kivicube企业版高级API示例 - 小程序反馈",
      path: "/pages/feedback/feedback",
      imageUrl: "/assets/images/share.jpg",
    };
  },
});
