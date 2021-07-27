const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[year, month, day].map(formatNumber).join("/")} ${[
    hour,
    minute,
    second
  ]
    .map(formatNumber)
    .join(":")}`;
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};
/**
 * 图片下载
 */
const downloadImage = url => {
  wx.saveImageToPhotosAlbum({
    filePath: url,
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
            downloadImage(url);
          }
        }
      } else {
        console.log("保存失败", err);
      }
    }
  });
};

const takePhoto = view => {
  return new Promise((resolve, reject) => {
    wx.showLoading({ title: "拍照中...", mask: true });
    console.log(view);
    view
      .takePhoto()
      .then(photoPath => {
        wx.hideLoading();
        resolve(photoPath);
      })
      .catch(e => {
        wx.hideLoading();
        reject("error", e);
      });
  });
};

const promisify = (fn, context) => {
  return config => {
    return new Promise((resolve, reject) => {
      fn.call(context || wx, {
        ...config,
        success: resolve,
        fail: reject
      });
    });
  };
};
// 摄像头打开失败处理
const cameraErrorHandler = (detail, page) => {
  // 判定是否camera权限问题，是则向用户申请权限。
  if (detail && detail.isCameraAuthDenied) {
    wx.showModal({
      title: "提示",
      content: "请给予“摄像头”权限",
      success() {
        wx.openSetting({
          success({ authSetting: { "scope.camera": isGrantedCamera } }) {
            if (isGrantedCamera) {
              wx.redirectTo({ url: "/" + page.__route__ });
            } else {
              wx.showToast({
                title: "获取“摄像头”权限失败！",
                icon: "none"
              });
            }
          }
        });
      }
    });
  }
};

function errorHandler(errInfo) {
  let message = errInfo;
  if (typeof errInfo === "object") {
    if (errInfo instanceof Error) {
      message = errInfo.message;
    } else if (errInfo.errMsg) {
      message = errInfo.errMsg;
    } else {
      message = Object.values(errInfo).join("; ");
    }
  }
  console.error(errInfo);
  wx.showToast({
    title: message,
    icon: "none"
  });
}

function requestFile(url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      dataType: "",
      responseType: "arraybuffer",
      success({ statusCode, data }) {
        if (statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`下载素材(${url})发生错误(状态码-${statusCode})`));
        }
      },
      fail: reject
    });
  });
}

function downloadFile(file) {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: file,
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.tempFilePath);
        } else {
          reject(
            new Error(`下载文件：${file} 失败。statusCode：${res.statusCode}`)
          );
        }
      },
      fail: reject
    });
  });
}

module.exports = {
  formatTime,
  downloadImage,
  takePhoto,
  promisify,
  cameraErrorHandler,
  errorHandler,
  requestFile,
  downloadFile
};
