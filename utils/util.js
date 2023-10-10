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
// 插件内发生错误，或camera发生问题，都会触发此事件
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
  } else {
    wx.showToast({
      title: "初始化失败，请重新进入",
      icon: "none"
    });
    setTimeout(() => {
      wx.navigateBack();
    }, 500)
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

/**
 * @params list {Array} - 要迭代的数组
 * @params limit {Number} - 并发数量控制数
 * @params asyncHandle {Function} - 对`list`的每一个项的处理函数，参数为当前处理项，必须 return 一个Promise来确定是否继续进行迭代
 * @return {Promise} - 返回一个 Promise 值来确认所有数据是否迭代完成
 */
const mapLimit = (list, limit, asyncHandle) => {
  let recursion = arr => {
    return asyncHandle(arr.shift()).then(() => {
      if (arr.length !== 0) return recursion(arr);
      // 数组还未迭代完，递归继续进行迭代
      else return "finish";
    });
  };

  let listCopy = [].concat(list);
  let asyncList = []; // 正在进行的所有并发异步操作
  while (limit--) {
    asyncList.push(recursion(listCopy));
  }
  return Promise.all(asyncList); // 所有并发异步操作都完成后，本次并发控制迭代完成
};

const fetchBatch = (downloadList, num = 5, progress = () => {}) => {
  let downloadListObj = {};
  downloadList.forEach(el => {
    downloadListObj[el] = "";
  });
  return mapLimit(downloadList, num, file => {
    const download = (resolve, reject) => {
      wx.downloadFile({
        url: file,
        success(res) {
          if (res.statusCode === 200) {
            downloadListObj[file] = res.tempFilePath;
            progress();
            resolve();
          }
        },
        fail: () => {
          download(resolve, reject);
          // reject();
        }
      });
    };
    return new Promise((resolve, reject) => {
      download(resolve, reject);
    });
  }).then(() => {
    return downloadListObj;
  });
};

const getPrivate = () => {
  if (wx.requirePrivacyAuthorize) {
    return new Promise((resolve, reject) => {
      wx.requirePrivacyAuthorize({
        success: (res) => {
          console.log("用户同意了隐私协议");
          resolve(res);
        },
        fail: (res) => {
          reject(res);
          console.log("用户拒绝了隐私协议");
        },
      });
    });
  } else {
    return Promise.resolve();
  }
}

const resUrl = (filename) => {
  return `https://meta.kivisense.com/wechat-kivicube-plugin-api-sample/assets-cdn/${filename}`;
}

module.exports = {
  formatTime,
  downloadImage,
  takePhoto,
  promisify,
  cameraErrorHandler,
  errorHandler,
  requestFile,
  downloadFile,
  fetchBatch,
  getPrivate,
  resUrl
};
