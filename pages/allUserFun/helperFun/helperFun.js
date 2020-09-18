//helper后面需要openid因为自己只能看自己的
const app = getApp()
const ydb = wx.cloud.database()
Page({
  data: {
    //tab栏的初始选项
    tabIndex: 1,
    //页面需要数据
    //待寄存
    needToStoreList: [],
    // 已完成
    doneList: [],
    isInit:true
  },
  //更改导航栏
  tabFun(e) {
    var that = this
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 1000
    })
    that.setData({
      tabIndex: e.currentTarget.dataset.index,
      isInit:true
    })
    that.getList()
  },
  changeShowList() {
    var that = this
    if (that.data.tabIndex == 1) {
      that.setData({
        lostList: that.data.needToStoreList
      })
    } else {
      that.setData({
        lostList: that.data.doneList
      })
    }
  },
  onLoad(options) {
    this.page1 = 0
    this.page2 = 0
    this.setData({
      isInit:true
    })
    this.getList()
    console.log(options)
    //设置页面的tab栏方位
    this.setData({
      tabIndex: options.type || 1
    })
    this.changeShowList()
  },
  //下拉刷新时获取链表
  onPullDownRefresh() {
    this.setData({
      isInit:true
    })
    this.getList()
  },
  //触底时加载下一页
  onReachBottom() {
    this.page1 += 1
    this.page2 += 1
    this.setData({
      isInit:false
    })
    this.getList()
  },
  //获取商品队列
  async getList() {
    var that = this
    const PAGE = 5
    wx.showLoading({
      title: '加载中',
    })
    //更新待寄存队列
    if (that.data.tabIndex == 1) {
      let res = await ydb.collection('CHDLost').skip(that.page1 * PAGE).limit(PAGE).where({
        forShow: 0,
          _openid:app.globalData.userInfo.openid
      }).get({})
      if (that.data.isInit) {
        that.setData({
          needToStoreList: res.data
        })
      } else {
        //下拉刷新，不能直接覆盖而是累加
        that.setData({
          needToStoreList: that.data.needToStoreList.concat(res.data)
        })
        wx.stopPullDownRefresh()
      }
      wx.hideLoading()

    }
    //更新已完成队列
    if (that.data.tabIndex == 2) {
      let res = await ydb.collection('CHDLost').skip(that.page2 * PAGE).limit(PAGE).where({
        forShow: ydb.command.neq(0),
          _openid:app.globalData.userInfo.openid
      }).get({})
      if (that.data.isInit) {
        console.log(res)
        that.setData({
          doneList: res.data
        })
      } else {
        //下拉刷新，不能直接覆盖而是累加
        that.setData({
          doneList: that.data.doneList.concat(res.data)
        })
        wx.stopPullDownRefresh()
      }
      wx.hideLoading()
    }
  that.changeShowList()
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