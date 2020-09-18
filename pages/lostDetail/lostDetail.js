const app = getApp()
const ydb = wx.cloud.database()
import util from '../../utils/util.js';
Page({

  data: {
    //属性数据
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,

    //页面数据
    id: null,
    lostData: null,
  },

  onLoad: async function (options) {
    console.log(options)
    var that = this
    that.setData({
      id: options.id
    })
    //doc方法接收一个id参数，指定需要引用的记录id
    const ins = ydb.collection('CHDLost').doc(options.id)
    //  增加浏览量
    ins.update({
      data: {
        browserNum: ydb.command.inc(1)
      }
    })
  },
  async onShow() {
    var that = this
    let lostData = await ydb.collection('CHDLost').doc(that.data.id).get({})
    console.log(lostData)
    that.setData({
      lostData: lostData.data
    })
  },
  claimToMyLost() {
    wx.navigateTo({
      url: '/pages/form/thisIsMineForm/thisIsMine?id='+this.data.id
    })
  },
  onShareAppMessage: function () {

  },
  goForMap(event) {
    console.log(event)
    let LocationObj = event.currentTarget.dataset.location
    wx.openLocation({
      latitude: LocationObj.latitude,
      longitude: LocationObj.longitude,
      name: LocationObj.name,
      address: LocationObj.address
    })
  }
})