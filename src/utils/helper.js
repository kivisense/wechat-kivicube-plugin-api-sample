export function promisify(fn, context) {
  return config => {
    return new Promise((resolve, reject) => {
      fn.call(context || wx, {
        ...config,
        success: resolve,
        fail: reject
      });
    });
  };
}

export function errorHandler(errInfo) {
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
