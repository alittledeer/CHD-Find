var util = require('../../../utils/util.js');
const app = getApp()
const ydb = wx.cloud.database()
Page({

  /* 页面的初始数据*/
  data: {
    backgroundPic: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/其他素材/反馈背景.jpg",
    adviceTitle: "",
    adviceDes: "",
  },

  myInputT(e) {
    console.log(e)
    var myData = e.detail.value
    this.setData({
      adviceTitle: myData
    })
  },
  myInputD(e) {
    console.log(e)
    var myData = e.detail.value
    this.setData({
      adviceDes: myData
    })
  },
  async IDidIt(e) {
    var that = this
    var v = that.data
    const openid = app.globalData.userInfo.openid
    if (v.adviceTitle == "") {
      wx.showToast({
        title: '未添加建议标题',
        icon: "none"
      })
    } else if (v.adviceDes == "") {
      wx.showToast({
        title: '未添加建议描述',
        icon: "none"
      })
    } else {
      //确认发布
      let showModalRes = await wx.showModal({
        title: '信息提示',
        content: '建议数据上传过程中如果您强制退出，会导致建议失败哦～',
        confirmText: "确认",
        showCancel: true,
      })
      if (showModalRes.confirm) {
        console.log("点击了确认");
        var createTime = util.formatTime(new Date()).replace(/-/g, "/").replace(" ", "-");
        await ydb.collection("advice").add({
          data: {
            _id: Date.now(),
            adviceTitle: v.adviceTitle,
            adviceDes: v.adviceDes,
            neederInfo: app.globalData.userInfo,
            createTime:createTime
          }
        })
      }
    }
  },
})