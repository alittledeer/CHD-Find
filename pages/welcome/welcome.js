//index.js
//获取应用实例
const app = getApp()
// 获取云数据库操作示例
const db = wx.cloud.database()
const ydb = wx.cloud.database()

Page({
  data: {
    notInMotto :"必须登陆才可以浏览失物信息",
    userInfo: {},
    schoolBackground:"cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/长大背景/校本部教学楼.jpg"
  },
  //页面加载函数
  onLoad: function() {
    //如果有用户信息，则将信息置换为页面信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } 
  },

  // 获取用户信息的函数，
  getUserInfo: function(e) {
    // 获取用户openid的云函数
    wx.cloud.callFunction({
      name: 'logIn',
      success: res => {
        console.log(res)
        // 把获取到的用户openid传给userinfo
        e.detail.userInfo.openid = res.result.openid
        console.log(e.detail.userInfo.openid)
        // 将用户信息设置成全局变量
        app.globalData.userInfo = e.detail.userInfo
        console.log(app.globalData.userInfo)
        // 更新视图层的用户信息
        this.setData({
          userInfo: e.detail.userInfo,
        })
        // 将用户信息保存至本地
        wx.setStorageSync("userInfo", app.globalData.userInfo)
      }
    })
  },
//拥有用户信息后可跳转至首页的函数
 async goToIndex(){
    let addNew = await wx.cloud.callFunction({
      name: 'addNewUser',
      data: {
        openid: app.globalData.userInfo.openid,
        name: app.globalData.userInfo.nickName,
        img: app.globalData.userInfo.avatarUrl
      },
    })
    if (addNew.result == "new") {
      wx.showToast({
        title: '新用户尽快认证呦',
        icon: 'success',
        duration: 1000
      })
    }
   //查询到身份信息并且存入全局变量
   let res = await ydb.collection('user').where({
     _openid: app.globalData.userInfo.openid,
   }).get()
   console.log(res)
   app.globalData.IdInfo = res.data[0]

    wx.switchTab({
      url: '../find/find',
      success: function () {
        console.log("jump success")
      },
      fail: function () {
        console.log("jump failed")
      }
    });
  },


})