//helper后面需要openid因为自己只能看自己的
const app = getApp()
const ydb = wx.cloud.database()
Page({
  data: {
    //tab栏的初始选项
    tabIndex: 1,
    //页面需要数据
    //待审批
    needToApproveList: [],
    //待认领
    needToGetList: [],
    // 已完成
    doneList: [],
    isInit: true
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
      isInit: true
    })
    that.getList()
  },
  changeShowList() {
    var that = this
    if (that.data.tabIndex == 1) {
      that.setData({
        lostList: that.data.needToApproveList
      })
    } else if (that.data.tabIndex == 2) {
      that.setData({
        lostList: that.data.needToGetList
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
    this.page3 = 0
    this.setData({
      isInit: true
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
      isInit: true
    })
    this.getList(true)
  },
  //触底时加载下一页
  onReachBottom() {
    this.page1 += 1
    this.page2 += 1
    this.page3 += 1
    this.setData({
      isInit: false
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
    //更新待审批队列
    if (that.data.tabIndex == 1) {
      let res = await ydb.collection('CHDFind').skip(that.page1 * PAGE).limit(PAGE).where({
        isHis: 0,
        _openid: app.globalData.userInfo.openid
      }).get({})
      if (that.data.isInit) {
        that.setData({
          needToApproveList: res.data
        })
      } else {
        //下拉刷新，不能直接覆盖而是累加
        that.setData({
          needToApproveList: that.data.needToApproveList.concat(res.data)
        })
        wx.stopPullDownRefresh()
      }
      wx.hideLoading()
    }
    //更新待认领队列
    if (that.data.tabIndex == 2) {
      let res = await ydb.collection('CHDFind').skip(that.page2 * PAGE).limit(PAGE).where({
        isHis: 1,
        _openid: app.globalData.userInfo.openid
      }).get({})
      if (that.data.isInit) {
        that.setData({
          needToGetList: res.data
        })
      } else {
        //下拉刷新，不能直接覆盖而是累加
        that.setData({
          needToGetList: that.data.needToGetList.concat(res.data)
        })
        wx.stopPullDownRefresh()
      }
      wx.hideLoading()
    }
    //已完成
    if (that.data.tabIndex == 3) {
      let res = await ydb.collection('CHDFind').skip(that.page3 * PAGE).limit(PAGE).where({
        isHis: 3,
        _openid: app.globalData.userInfo.openid
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
  //去详情页
  toFindDetail(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/findDetail/findDetail?id=' + id,
    })
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