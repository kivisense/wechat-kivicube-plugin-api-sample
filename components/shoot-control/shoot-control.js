Component({
  properties: {
    showPosterLoading: {
      type: Boolean,
      value: false,
    },
    // 是否在内部定时超时是触发结束事件
    isTimeoutEnd: {
      type: Boolean,
      value: true,
    },
    // 是否显示可以录屏（UI）
    showType: {
      type: String,
      value: "both",
    },
  },
  data: {
    isRecording: false,
    loadingType: "image",
    showShootTips: true,
  },
  lifetimes: {
    attached() {
      this.createPoster();
      const showShootTips = wx.getStorageSync("showShootTips");
      if (showShootTips !== "") {
        this.setData({
          showShootTips,
        });
      }
    },
  },
  methods: {
    saveStroage() {
      if (this.data.showShootTips) {
        this.setData({
          showShootTips: false,
        });
        wx.setStorageSync("showShootTips", false);
      }
    },

    takePhoto() {
      if (this.properties.showType === "record") return;
      if (this.properties.showPosterLoading) return;
      this.setData({
        loadingType: "image",
      });
      this.saveStroage();
      this.triggerEvent("takePhoto");
    },

    startRecord() {
      if (this.properties.showType === "photo") return;
      if (this.properties.showPosterLoading) return;
      this.setData({
        loadingType: "video",
        isRecording: true,
      });
      // 延时播放录制canvas的过渡动画
      this._recordTimer = setTimeout(() => {
        this.startLoading();
        clearTimeout(this._recordTimer);
        this._recordTimer = null;
        this.saveStroage();
        this.triggerEvent("startRecord");
      }, 500);
    },

    stopRecord() {
      if (this.properties.showType === "photo") return;
      if (this.properties.showPosterLoading) return;
      if (!this.data.isRecording) return;
      this.stopLoading();
      if (this._recordTimer) {
        clearTimeout(this._recordTimer);
        this._recordTimer = null;
      }
    },

    async createPoster() {
      const dpr = wx.getSystemInfoSync().pixelRatio * 2;
      const innerWidth = wx.getSystemInfoSync().windowWidth;
      const px = (number) => {
        return number * 0.01 * innerWidth * dpr;
      };
      let end = -90; //结束角度
      let load = 0; // 创建变量，进度值1%
      const total = 300;
      const stepDeg = 360 / total;
      const strokeColor = "#FFE6C3";
      const strokeWeight = px(0.8);
      const stepTime = 100;

      try {
        const query = wx.createSelectorQuery().in(this);
        query
          .select("#recordCountDownCanvas")
          .fields({
            node: true,
            size: true,
          })
          .exec((res) => {
            const canvas = res[0].node;
            const ctx = canvas.getContext("2d");

            canvas.width = res[0].width * dpr;
            canvas.height = res[0].height * dpr;
            // 创建定时器，绘制进度条
            this.startLoading = () => {
              let startTime = Date.now();
              let endTime = Date.now();
              let timeScale = 1;
              this.recordingTimer = setInterval(() => {
                //每次加载前清除画布
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.beginPath();
                // 灰色底框
                ctx.strokeStyle = "rgba(255,255,255,0.4)"; //底框的背景颜色
                ctx.lineWidth = strokeWeight; //底框的宽度
                //底框显示的位置想x,y,r,start,end
                ctx.arc(
                  canvas.width / 2,
                  canvas.height / 2,
                  canvas.width / 2 - strokeWeight,
                  0,
                  2 * Math.PI
                );
                ctx.stroke(); //绘制底框，空心圆
                // 开始新的路径
                ctx.beginPath();
                // 绘制新的圆环
                ctx.strokeStyle = strokeColor;
                ctx.lineWidth = strokeWeight;
                //从顶点位置开始
                ctx.arc(
                  canvas.width / 2,
                  canvas.height / 2,
                  canvas.width / 2 - strokeWeight,
                  (-90 * Math.PI) / 180,
                  (end * Math.PI) / 180
                );
                ctx.stroke();
                if (this.properties.isTimeoutEnd && load >= total) {
                  this.stopLoading();
                }

                endTime = Date.now();
                timeScale = (endTime - startTime) / stepTime;
                // 修改结束角度
                end += stepDeg * timeScale;
                load += 1 * timeScale;
                console.log(`load`, load);
                startTime = endTime;
              }, stepTime);
            };
            this.stopLoading = () => {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              clearInterval(this.recordingTimer);
              end = -90;
              load = 0;
              this.setData({
                isRecording: false,
              });
              this.triggerEvent("stopRecord");
            };
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
});
