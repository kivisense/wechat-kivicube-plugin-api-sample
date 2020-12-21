export function downloadFile(file) {
  const download = (resolve, reject) => {
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
  };
  return new Promise((resolve, reject) => {
    download(resolve, reject);
  });
}

export function requestFile(url) {
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

export function fetchBatch(downloadList, num = 5, progress = () => {}) {
  let downloadListObj = {};
  downloadList.forEach(el => {
    downloadListObj[el] = "";
  });
  return mapLimit(downloadList, num, file => {
    const download = (resolve, reject) => {
      uni.downloadFile({
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
}
