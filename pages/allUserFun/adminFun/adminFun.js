const app = getApp()
const ydb = wx.cloud.database()
import {
  formatTime
} from "../../../utils/util.js"
Page({
  data: {
    //tab栏的初始选项
    tabIndex: 1,
    //页面需要数据
    //待寄存
    needToStoreList: [],
    //待审核认领
    needToApproveList: [],
    //审核通过未认领
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
    })
    that.setData({
      isInit: true
    })
    that.getList()
  },
  changeShowList() {
    var that = this
    if (that.data.tabIndex == 1) {
      that.setData({
        lostList: that.data.needToStoreList
      })
    } else if (that.data.tabIndex == 2) {
      that.setData({
        lostList: that.data.needToApproveList
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
    this.getList()
  },
  //触底时加载下一页
  onReachBottom() {
    this.setData({
      isInit: false
    })
    this.page1 += 1
    this.page2 += 1
    this.page3 += 1
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
    //更新待审核表单
    if (that.data.tabIndex == 2) {
      let res = await ydb.collection('CHDFind').skip(that.page2 * PAGE).limit(PAGE).where({
        //0 未展示 1展示未认领 2 审核未认领 3已认领
        isHis: 0,
      }).get({})
      if (that.data.isInit) {
        console.log(res)
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
    //更新审核未认领队列
    if (that.data.tabIndex == 3) {
      let res = await ydb.collection('CHDFind').skip(that.page3 * PAGE).limit(PAGE).where({
        //0 未展示 1展示未认领 2 审核未认领 3已认领
        isHis: 1,
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


  //管理员的功能
  //添加地址(待入库失物)
  async addAddress(e) {
    var that = this
    console.log(e)
    //获取到的id
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    let showModalRes = await wx.showModal({
      title: '信息提示',
      content: '确定寄存' + name + "吗？",
      confirmText: "确认",
      showCancel: true,
    })
    if (showModalRes.confirm) {
      let addressRes = await wx.chooseLocation()
      console.log(addressRes)
      let locationObj = {
        latitude: addressRes.latitude,
        longitude: addressRes.longitude,
        name: addressRes.name,
        address: addressRes.address
      }
      that.setData({
        newHome: locationObj
      })
      wx.showLoading({
        title: '寄存中...',
      })
      var storeTime = formatTime(new Date()).replace(/-/g, "/").replace(" ", "-")
      //管理员对用户上传的失物数据修改需要云函数
      let updateRes = await wx.cloud.callFunction({
        name: 'adminStoreLost',
        data: {
          id: id,
          newHome: that.data.newHome,
          storeTime: storeTime
        }
      })
      wx.hideLoading({})
      wx.redirectTo({
        url: '/pages/allUserFun/adminFun/adminFun?type=' + 1,
      })
    }
  },
  //待审核认领
  async judegeApplication(e) {
    console.log(e)
    //获取到的信息
    //审核的通过信息
    var judge = e.currentTarget.dataset.type
    //id信息
    var lostId = e.currentTarget.dataset.item.lostProperty._id
    var findId = e.currentTarget.dataset.item._id
    var judgeTime = formatTime(new Date()).replace(/-/g, "/").replace(" ", "-")
    let showModalRes = await wx.showModal({
      title: '信息提示',
      content: '确定审核此认领' + "吗？",
      confirmText: "确认",
      showCancel: true,
    })
    if (showModalRes.confirm) {
      wx.showLoading({
      })
      //调用云函数对申请进行通过或者驳回
      //使用事务保证操作的原子性
      let passRes = await wx.cloud.callFunction({
        name: 'adminPsssFind',
        data: {
          lostId: lostId,
          findId: findId,
          judge: judge,
          judgeTime: judgeTime,
          adminInfo: app.globalData.userInfo,
        }
      })
      wx.hideLoading({
      })
      wx.showToast({
        title: '已完成',
        icon: "success"
      })

      wx.redirectTo({
        url: '/pages/allUserFun/adminFun/adminFun?type=' + 2,
      })
    }
  },

  async farewellLost(e) {
    console.log(e)
    //获取到的信息
    //id信息
    var lostId = e.currentTarget.dataset.item.lostProperty._id
    var findId = e.currentTarget.dataset.item._id
    var farewellTime = formatTime(new Date()).replace(/-/g, "/").replace(" ", "-")
    let showModalRes = await wx.showModal({
      title: '信息提示',
      content: "确定出库吗？",
      confirmText: "确认",
      showCancel: true,
    })
    if (showModalRes.confirm) {
      wx.showLoading({
      })
      //调用云函数对申请进行通过或者驳回
      //使用事务保证操作的原子性
      let passRes = await wx.cloud.callFunction({
        name: 'adminFarewellLost',
        data: {
          lostId: lostId,
          findId: findId,
          farewellTime: farewellTime,
          adminInfo: app.globalData.userInfo,
        }
      })

      wx.hideLoading({
      })
      wx.showToast({
        title: '已完成',
        icon: "success"
      })

      wx.redirectTo({
        url: '/pages/allUserFun/adminFun/adminFun?type=' + 3,
      })
    }
  },
  toFindDetail(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/findDetail/findDetail?id=' + id,
    })
  }
})