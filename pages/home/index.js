// pages/home/index.js
const app = getApp();
Page({
  data: {

  },
  download: function() {
    console.log('执行我');
    var that = this;
    wx.showLoading({
      title: '下载中,请勿离开',
    })
    var url =  'https://meeting.hunterslab.cn/storage/films/' + app.globalData.downloadurl;
    console.log('url', url);
    wx.downloadFile({
        url: url,
        success (res) {
            console.log(res);
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {

            wx.hideLoading();

            wx.saveVideoToPhotosAlbum({
              filePath: res.tempFilePath,
              success (res) {
                wx.showToast({
                  title: '已成功保存入相册',
                  icon: 'success',
                  duration: 2000
                })
              }
            })
          }
        }
    })
  },
  onLoad: function (options) {
  },
})