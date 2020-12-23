<script>
const logger = wx.getRealtimeLogManager();
import { MTAConfig } from "./MTA";

export default {
  onLaunch: function(options) {
    // #ifdef MP-WEIXIN
    if (process.env.NODE_ENV === "production") {
      MTAConfig(options);
    }
    // #endif
    wx.onMemoryWarning(e => {
      logger.error("onMemoryWarning", e, uni.getSystemInfoSync());
    });
  },
  onError(e) {
    logger.error("app onerror", e, uni.getSystemInfoSync());
  }
};
</script>

<style>
/* #ifdef MP-WEIXIN */
button::after {
  border: none;
}
page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* #endif */

.layer {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.default-view-btn {
  width: 24.6vw;
  height: 10.67vw;
  background-color: rgba(255, 255, 255, 0.7);
  border: 0.53vw solid #eeeeee;
  border-radius: 5vw;
  backdrop-filter: blur(2px);
  font-size: 3.7vw;
  line-height: 9.61vw;
  color: #515a6e;
  text-align: center;
  overflow: auto;
  box-sizing: border-box;
  margin: 0 0.5vw;
}

.default-view-add-btn {
  height: 10.67vw;
  margin: 0 0.5vw;
  line-height: 9.61vw;
  font-size: 3.7vw;
  border-radius: 5vw;
  border: 0.53vw solid #eeeeee;
  backdrop-filter: blur(2px);
  text-align: center;
  overflow: auto;
  box-sizing: border-box;
  color: #515a6e;
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
