// pages/mine/mine.js
var app = getApp()
import util from "../../utils/util.js"
const ydb = wx.cloud.database()

Page({
  data: {
    userInfo: {},
    helper: [{
        name: '拾物者',
        imageurl: 'cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/icon图标/mine_select.png',
      },
      {
        name: '新发现',
        imageurl: 'cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/icon图标/已完成.png',
      }, {
        name: '待寄存',
        imageurl: 'cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/icon图标/寄存.png',
      },
      {
        name: '已完成',
        imageurl: 'cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/icon图标/已完成.png',
      }
    ],
    loster: [{
        name: '失物者',
        imageurl: 'cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/icon图标/mine_select.png',
      }, {
        name: '待审批',
        imageurl: 'cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/icon图标/待审核.png',
      },
      {
        name: '待认领',
        imageurl: 'cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/icon图标/待认领.png'
      },
      {
        name: '已完成',
        imageurl: 'cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/icon图标/已完成.png'
      }
    ],
    admin: [{
        name: '管理员',
        imageurl: 'cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/icon图标/mine_select.png',
      }, {
        name: '待入库失物',
        imageurl: 'cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/icon图标/待入库.png',
      },
      {
        name: '待审核认领',
        imageurl: 'cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/icon图标/待审核.png',
      },
      {
        name: '待领取失物',
        imageurl: 'cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/icon图标/待审核.png'
      }
    ],
  },
  async onShow() {
    var that = this
    let userCheckRes = await ydb.collection("user").where({
      _openid: app.globalData.userInfo.openid
    }).get()
    console.log(userCheckRes)
    that.setData({
      userInfo: userCheckRes.data[0]
    })
  },
  helperFun(event) {
    console.log(event)
    var type = parseInt(event.currentTarget.dataset.type)
    if (type == 1) {
      wx.navigateTo({
        url: '/pages/form/iHaveFoundItForm/iHaveFoundIt',
      })
    } else {
      wx.navigateTo({
        url: '/pages/allUserFun/helperFun/helperFun?type=' + (type - 1),
      })
    }
  },
  adminFun(event) {
    console.log(event)
    var type = parseInt(event.currentTarget.dataset.type)
    wx.navigateTo({
      url: '/pages/allUserFun/adminFun/adminFun?type=' + type,
    })
  },
  losterFun(event) {
    console.log(event)
    var type = parseInt(event.currentTarget.dataset.type)
    wx.navigateTo({
      url: '/pages/allUserFun/losterFun/losterFun?type=' + type,
    })
  },
  //去附属功能
  toSubFun(event) {
    console.log(event)
    var fun = parseInt(event.currentTarget.dataset.fun)
    if (fun == 1) {
      wx.navigateTo({
        url: '/pages/subFun/advice/advice',
      })
    } else if (fun == 2) {
      wx.navigateTo({
        url: '/pages/subFun/helper/helper',
      })
    } else {
      wx.navigateTo({
        url: '/pages/subFun/connectUs/connectUs',
      })
    }
  }
})