const ydb = wx.cloud.database()
const app = getApp()
Page({
  data: {
    keyWord: "",
    list: [],
    check:false,
    backgroundPic:"cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/其他素材/失物页背景.jpg",
  },
  //输入关键字
  inputChange(e) {
    this.setData({
      keyWord: e.detail.value,
      check:false,
    });
  },
  //清空关键字
  clearKeyword() {
    this.setData({
      keyWord: "",
    });
  },
  //关闭搜索
  closeSearch() {
    wx.switchTab({
      url: '/pages/assortment/assortmentLost/assortmentLost',
    })
  },
  //去搜索
  async goOnSearch() {
    wx.showLoading({
    })
    var that = this
    //通过关键字查找商品然后更新队列
    let findRes = await ydb.collection('CHDLost').where({
      name: ydb.RegExp({
        regexp: that.data.keyWord,
        options: 'i',
      }),
      forShow:1
    }).get()
    console.log(findRes)
    that.setData({
      list: findRes.data,
      check:true
    })
    wx.hideLoading({
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