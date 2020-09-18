
const app = getApp()
const ydb = wx.cloud.database()
Page({

  /*页面的初始数据*/
  data: {
    backgroundPic:"cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/其他素材/失物页背景.jpg",
    ads:null,
    lostList: [],
  },
  //页面加载时
  onLoad() {
    this.page = 0
    this.getList(true)
  },
  //其他页面跳转过来时需要刷新数据
  onShow() {
    this.onLoad()
  },


  //跳转到详情页
  toDetail(e) {
    const id = e.currentTarget.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/lostDetail/lostDetail?id=' + id,
    })
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
  //获取商品队列
  getList(isInit) {
    const PAGE = 6
    wx.showLoading({
      title: '加载中',
    })
    ydb.collection('CHDLost').skip(this.page * PAGE).limit(PAGE).where({
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

  iHaveFoundIt(){
    wx.navigateTo({
      url: '/pages/form/iHaveFoundItForm/iHaveFoundIt',
    })
  }
})