// components/Modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hiddenStatus: {
      type: Boolean,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    info: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap() {
      this.triggerEvent("btnTap", this.data.info);
    },
    handleMiniprogramBtnTap() {
      console.log(`this.data.info`, this.data.info);
      this.triggerEvent("miniprogramBtnTap", this.data.info);
    },
    maskTap(e) {
      if (e.target.id === "modal-wrap") {
        this.triggerEvent("onHide");
      }
    },
    handleHide() {
      this.triggerEvent("onHide");
    },
    setInfo(info, callback) {
      // console.log(info.type)
      this.setData({ info }, () => {
        callback();
      });
    },
  },
});
