// pages/search/searchShowResult/searchShowResult.js
const ydb = wx.cloud.database()
const app = getApp()
Page({

  //页面的初始数据
  data: {
    lostList: [],
    code: null,
    backgroundPic:"cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/其他素材/失物页背景.jpg",
  },
  onLoad:function (options) {
    this.setData({
      code: options.searchFor
    })
  },
  onReady(){
    this.page = 0
    this.getList(true)
  },
  //下拉刷新时获取链表
  onPullDownRefresh() {
    this.getList(true)
  },
  //触底时加载下一页
  onReachBottom() {
    this.page += 1
    this.getList()
  },
  getList(isInit) {
    var that = this
    const PAGE = 6
    wx.showLoading({
      title: '加载中',
    })
    console.log(that.data.code.toString())
    var s=that.data.code.toString()
    ydb.collection('CHDLost').skip(this.page * PAGE).limit(PAGE).where({
      'tags.code': s,
      forShow: 1
    }).get({
      success: res => {
        console.log('xx', res.data)
        if (isInit) {
          this.setData({
            lostList: res.data
          })
        } else {
          //下拉刷新，不能直接覆盖而是累加
          this.setData({
            lostList: this.data.lostList.concat(res.data)
          })
          wx.stopPullDownRefresh()
        }
        wx.hideLoading()
      }
    })
  },


  //跳转到详情页
  toDetail(e) {
    const id = e.currentTarget.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/lostDetail/lostDetail?id=' + id,
    })
  },

})