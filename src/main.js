import Vue from "vue";
import App from "./App";
import uma from "umtrack-wx";

uma.init({
  appKey: "5ffc27c2f1eb4f3f9b5a0fd2",
  useOpenid: false,
  autoGetOpenid: false,
  debug: false
});

Vue.config.productionTip = false;

uma.install = function(Vue) {
  Vue.prototype.$uma = uma;
};

Vue.use(uma);

App.mpType = "app";

const app = new Vue({
  ...App
});
app.$mount();
