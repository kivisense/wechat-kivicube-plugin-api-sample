// app.js
import uma from "umtrack-wx";
const logger = wx.getRealtimeLogManager();
App({
  umengConfig: {
    appKey: "5ffc27c2f1eb4f3f9b5a0fd2",
    useOpenid: false,
    autoGetOpenid: true,
    debug: false
  },
  onLaunch() {
    const logger = wx.getRealtimeLogManager();
    wx.onMemoryWarning(e => {
      logger.error("onMemoryWarning", e, wx.getSystemInfoSync());
    });
  },
  onError(e) {
    logger.error("app onerror", e, wx.getSystemInfoSync());
  },
  globalData: {
    uma
  }
});
