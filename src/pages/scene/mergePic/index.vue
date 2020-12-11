<template>
  <view class="layout layer">
    <canvas
      type="2d"
      :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }"
      id="syntheticPic"
    ></canvas>
    <image class="layer" mode="widthFix" :src="showImg"></image>
    <image
      class="btn-download"
      @click="saveImg"
      mode="widthFix"
      src="/static/btn-download.png"
    ></image>
  </view>
</template>

<script>
import { promisify } from "@/utils/helper";
import phonePic from "@/static/scene1/frame.png";
import bottomPic from "@/static/scene1/bottom.png";

export default {
  components: {},
  data: () => ({
    tempFilePaths: "",
    showImg: "",
    canvasWidth: "",
    canvasHeight: ""
  }),
  onLoad(option) {
    this.tempFilePaths = decodeURIComponent(option.photo);
    this.getCanvasInformation();
  },
  methods: {
    getCanvasInformation() {
      const query = wx.createSelectorQuery();
      query
        .select("#syntheticPic")
        .fields({ node: true })
        .exec(res => {
          const canvas = res[0].node;
          const ctx = canvas.getContext("2d");
          const { screenWidth, windowHeight } = wx.getSystemInfoSync();
          this.canvasWidth = screenWidth;
          this.canvasHeight = windowHeight;
          canvas.width = screenWidth * 2;
          canvas.height = windowHeight * 2;
          this.composite(canvas, ctx);
        });
    },
    async composite(canvas, ctx) {
      try {
        await this.addCameraPic(canvas, ctx);
        await this.addFramePic(canvas, ctx);
        await this.addBottomCowPic(canvas, ctx);
        const { tempFilePath } = await this.generatePicPath(canvas);
        this.showImg = tempFilePath;
      } catch (e) {
        wx.showToast({ icon: "none", title: e.message });
      }
    },
    loadImg(canvas, imgPath) {
      return new Promise((resolve, reject) => {
        let img = canvas.createImage();
        img.src = imgPath;
        img.onload = e => {
          console.log(e);
          resolve(img);
        };
        img.onError = e => {
          reject(new Error(e.message + +"(图片路径错误)"));
        };
      });
    },
    async addCameraPic(canvas, ctx) {
      const img = await this.loadImg(canvas, this.tempFilePaths);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    },
    async addFramePic(canvas, ctx) {
      const img = await this.loadImg(canvas, phonePic);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    },
    async addBottomCowPic(canvas, ctx) {
      const img = await this.loadImg(canvas, bottomPic);
      let imgThreeHeight = (canvas.width / 100) * 85.24;
      let top = canvas.height - imgThreeHeight;
      ctx.drawImage(img, 0, top, canvas.width, imgThreeHeight);
    },
    async generatePicPath(canvas) {
      return await promisify(wx.canvasToTempFilePath)({
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height,
        destWidth: canvas.width,
        destHeight: canvas.height,
        canvas: canvas,
        fileType: "jpg",
        quality: 1
      });
    },
    saveImg() {
      const img = this.showImg;
      wx.saveImageToPhotosAlbum({
        filePath: img,
        success: () => {
          wx.showToast({
            icon: "none",
            duration: 2000,
            title: "保存成功"
          });
        },
        fail: async err => {
          if (
            err.errMsg &&
            (err.errMsg.includes("auth deny") ||
              err.errMsg.includes("authorize no response"))
          ) {
            const { confirm } = await promisify(wx.showModal)({
              title: "提示",
              content: "开启相册授权后，就可以把照片保存到本地啦！",
              confirmText: "去开启"
            });
            if (confirm) {
              const { authSetting } = await promisify(wx.openSetting)();
              if (authSetting["scope.writePhotosAlbum"]) {
                this.saveImg(img);
              }
            }
          } else {
            console.log("保存失败", err);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-download {
  width: 20vw;
  height: 20vw;
  bottom: 8vw;
  left: 0;
  right: 0;
  position: absolute;
  z-index: 3;
  margin: 0 auto;
}
#syntheticPic {
  position: absolute;
  left: 9999rpx;
  left: 0;
  top: 0;
}
</style>
