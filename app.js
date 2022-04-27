// app.js
let uma;
try{
  uma = require('umtrack-wx')
} catch (err) {
  console.warn(err)
}
import sceneOptions from "/utils/sceneOptions.js"
const logger = wx.getRealtimeLogManager();
App({
  umengConfig: {
    appKey: "5ffc27c2f1eb4f3f9b5a0fd2",
    useOpenid: false,
    autoGetOpenid: true,
    debug: false
  },
  onLaunch(options) {
    // 在sceneOptions中匹配从分享小程序打开的id查询参数并存储到本地，提供给页面初始化时使用
    if(options.query.id){
      sceneOptions.forEach(v => {
        v.child.forEach(scene => {
          if (scene.id === Number(options.query.id)) {
            wx.setStorageSync("sceneData", scene);
          }
        });
      });
    }
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
