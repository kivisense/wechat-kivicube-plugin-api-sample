const { pixelRatio, windowWidth } = wx.getSystemInfoSync();
const dpr = pixelRatio * 2;

const vw2px = (number) => {
  return number * 0.01 * windowWidth * dpr;
};

Component({
  properties: {
    showPosterLoading: {
      type: Boolean,
      value: false,
    },
    // 是否显示可以录屏（UI）
    showType: {
      type: String,
      value: "both",
    },
    min: {
      type: Number,
      value: 1000 * 2,
    },
    max: {
      type: Number,
      value: 1000 * 30,
    },
  },
  data: {
    isRecording: false,
    loadingType: "image",
    showShootTips: true,
    showMinTips: false,
  },
  lifetimes: {
    attached() {
      try {
        const query = wx.createSelectorQuery().in(this);
        query
          .select("#recordCountDownCanvas")
          .fields({
            node: true,
            size: true,
          })
          .exec((res) => {
            this.canvas = res[0].node;
            this.ctx = this.canvas.getContext("2d");
            this.canvas.width = res[0].width * dpr;
            this.canvas.height = res[0].height * dpr;
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
  methods: {
    takePhoto() {
      if (this.properties.showType === "record") return;
      if (this.properties.showPosterLoading) return;
      this.setData({
        loadingType: "image",
      });
      this.triggerEvent("takePhoto");
    },

    startRecord() {
      if (this.properties.showType === "photo") return;
      if (this.properties.showPosterLoading) return;
      this.setData({
        loadingType: "video",
        isRecording: true,
      });

      this.startLoading();
      this.triggerEvent("startRecord");
    },

    stopRecord() {
      const { showType, showPosterLoading, min } = this.properties;
      if (showType === "photo") return;
      if (showPosterLoading) return;
      if (!this.data.isRecording) return;

      let stopType = "";
      if (this.load < min) {
        stopType = "min";
      }
      this.stopLoading(stopType);
    },

    startLoading() {
      const { canvas, ctx } = this;
      const { max } = this.properties;

      let end = -90; // 结束角度
      this.load = 0; // 记录进度值ms

      const total = max + 500; //时间超过一点，开始录制和结束录制的调用均需要时间，避免录不满max时长，
      const stepTime = 100;
      const stepDeg = 360 / (total / stepTime);

      // 用于时偏修复
      let startTime = Date.now();
      let endTime = Date.now();
      let timeScale = 1;

      const strokeColor = "#FFE6C3";
      const strokeWeight = vw2px(0.8);

      this.recordingTimer = setInterval(() => {
        //每次加载前清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
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
        // 时偏修复
        endTime = Date.now();
        timeScale = (endTime - startTime) / stepTime;

        // 更新数据
        end += stepDeg * timeScale;
        this.load += endTime - startTime;

        if (this.load >= total) {
          this.stopLoading("max");
        }
        // 更新时偏基准
        startTime = endTime;
      }, stepTime);
    },

    stopLoading(type) {
      const { canvas, ctx } = this;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      clearInterval(this.recordingTimer);
      this.setData({
        isRecording: false,
      });

      if (type === "min") {
        this.setData({
          showMinTips: true,
        });
        setTimeout(() => {
          this.setData({
            showMinTips: false,
          });
        }, 2000);
      }

      this.triggerEvent("stopRecord", {
        timeout: type,
      });
    },
  },
});
