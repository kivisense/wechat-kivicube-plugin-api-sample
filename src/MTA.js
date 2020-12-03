const mta = require("mta-wechat-analysis");

export function MTAInit() {
  mta.Page.init();
}

export function MTAConfig(options) {
  mta.App.init({
    appID: "500734833",
    eventID: "500734834",
    autoReport: true,
    statParam: true,
    ignoreParams: [],
    statPullDownFresh: true,
    statShareApp: true,
    statReachBottom: true,
    lauchOpts: options
  });
}
export function MTAEvent(key, query = {}) {
  mta.Event.stat(key, query);
}
