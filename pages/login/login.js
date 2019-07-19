const app = getApp();


Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isShow: false,
    isOnLoad: 0,
    message: {}
  },
  onLoad: function (options) {
    console.log('options', options);
    // 获取下载后缀
    if(options.scene) {
      console.log("options 有 scene",  options.scene );
      app.globalData.downloadurl = options.scene;
    }

    this.setData({
      isOnLoad:1
    })
    this.getUserInfo();
    wx.getSystemInfo({
      success (res) {
        app.globalData.platform = res.platform;
      }
    })
  },
  onShow:function(e){

  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      console.log('用户按了允许授权按钮')
      this.getUserInfo();
    } else {
      //用户按了拒绝按钮
      console.log('用户按了拒绝按钮')
    }
  },
  getUserInfo: function (type) {
    var that =this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log('用户已经授权过')
          // that.setData({isShow:false});
          wx.getUserInfo({
            success: function (res) {
              app.globalData.userInfo = res.userInfo;

              wx.navigateTo({
                url: '../home/index'
              });
            }
          })
        }else{
         console.log('用户未授权过')
         that.setData({isShow:true});
        }
      }
    })
  }
})