var util = require('../../../utils/util.js');
const app = getApp()
const ydb = wx.cloud.database()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    addLostBackground: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/其他素材/认领失物页背景.jpg",
    lostList: [],
    neederDes: "",
  },

  onLoad: async function (options) {
    var that = this
    let lostData = await ydb.collection('CHDLost').doc(options.id).get({})
    console.log(lostData)
    that.data.lostList.push(lostData.data)
    that.setData({
      lostList: that.data.lostList
    })
  },
  //失物的描述
  inputDescirption(e) {
    console.log(e)
    var that = this
    that.setData({
      neederDes: e.detail.value
    })
  },

  //提交
  async IDidIt() {
    var that = this
    var v = that.data
    const openid = app.globalData.userInfo.openid
    var neederPicList = []
    neederPicList = that.selectComponent("#descripImageList").__data__.image;
    //判空
    if (v.neederDes == "") {
      wx.showToast({
        title: '未添加失物描述',
        icon: "none"
      })
    } else {
      //确认发布
      let showModalRes = await wx.showModal({
        title: '信息提示',
        content: '认领数据上传过程中如果您强制退出，会导致申请失败哦～',
        confirmText: "确认",
        showCancel: true,
      })
      if (showModalRes.confirm) {
        console.log("点击了确认");
        //上传图片
        for (var idx = 0; idx < neederPicList.length; idx++) {
          wx.showLoading({
            title: '添加第' + (idx + 1) + "描述图",
          })
          let promiseMethodC = await wx.cloud.uploadFile({
            cloudPath: "用户" + openid + "/" + 'neederImageList/' + 'img' + idx + "time_" + Date.now() + ".jpg",
            filePath: neederPicList[idx]
          })
          neederPicList[idx] = promiseMethodC.fileID
          wx.hideLoading()
        }
        //上传表单
        var createTime = util.formatTime(new Date()).replace(/-/g, "/").replace(" ", "-");
        var createSecret = Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000;
        await ydb.collection("CHDFind").add({
          data: {
            _id: Date.now().toString(),
            neederDes: v.neederDes,
            neederPicList: neederPicList,
            neederInfo: app.globalData.userInfo,
            lostProperty: v.lostList[0],
            isHis: 0,
            secret: createSecret
          }
        })
        let showModalRes2 = await wx.showModal({
          title: '信息提示',
          content: '上传成功啦',
          confirmText: "确认",
          showCancel: true,
        })
        if (showModalRes2.confirm) {
          wx.switchTab({
            url: '/pages/mine/mine',
          });
        }
      }
    }
  }
})