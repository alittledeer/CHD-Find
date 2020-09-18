//app.js

App({
  onLaunch: function () {
    //从缓存中获取用户数据
    const userInfo = wx.getStorageSync("userInfo")
    if (userInfo) {
      this.globalData.userInfo = userInfo
    }
    var that = this
    
    // 小程序端初始化云函数
    wx.cloud.init(
      {
        env:"mychd-find-4s9do",
        traceUser: true
      }
    );
  },

  //全局数据
  globalData: {
    //用户信息
    userInfo: null,
  }
})