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

  },

  onLoad: async function (options) {
    console.log(options)
    var that = this
    that.setData({
      id: options.id
    })
    let findRes =await  ydb.collection('CHDFind').doc(options.id).get({})
    that.setData({
      findData: findRes.data
    })
  },
})