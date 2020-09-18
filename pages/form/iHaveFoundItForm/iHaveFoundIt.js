var util = require('../../../utils/util.js');
const app = getApp()
const ydb = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addLostBackground: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/其他素材/新增失物背景.jpg",
    name: "",
    tags: {
      name: "选择分类才能更好帮助他人",
      code: ""
    },
    description: "",
    descripImageList: "",
    oldHome: {
      latitude: null,
      longitude: null,
      name: "在哪里找到他的",
      address: ""
    },
    video: null
  },
  onShow() {
    var that = this
    var navto = this.data.navto
    if (navto) {
      //navto回归
      that.setData({
        navto: false
      })
      wx.getStorage({
        key: 'classify',
        success: function (res) {
          var a = res.data.split(" ")
          that.data.tags.name = a[0]
          that.data.tags.code = a[1]
          that.setData({
            tags: that.data.tags
          })
          wx.removeStorage({
            key: 'classify'
          })
        },
      })
    }
  },
  //输入失物名
  inputName(e) {
    console.log(e)
    var that = this
    that.setData({
      name: e.detail.value
    })
  },
  //输入描述
  inputDescirption(e) {
    console.log(e)
    var that = this
    that.setData({
      description: e.detail.value
    })
  },
  //选择商品种类
  selectClassify: function () {
    var that = this
    wx.navigateTo({
      url: '/tools/classify/classify',
      success: function () {
        that.setData({
          navto: true
        })
      }
    })
  },

  //失物发现地址
  chooseLocation(e) {
    var that = this
    wx.chooseLocation({
      success: res => {
        console.log(res)
        let locationObj = {
          latitude: res.latitude,
          longitude: res.longitude,
          name: res.name,
          address: res.address
        }
        that.setData({
          oldHome: locationObj
        })
      },
    })
  },
  //输入视频
  getVideo() {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function (res) {
        console.log(res)
        that.setData({
          video: res.tempFilePath
        })
      }
    })
  },
  //提交的函数
  async IDidIt() {
    var that = this
    var v = that.data
    const openid = app.globalData.userInfo.openid
    //获取到的各个变量
    //name 失物名称
    //tags 失物类目
    //description 失物描述
    //descripImageList 失物图队列（未上传
    //video 
    let descripImageList = that.selectComponent("#descripImageList").__data__.image;
    //判空
    if (v.name == "") {
      wx.showToast({
        title: '未添加失物名称',
        icon: "none"
      })
    } else if (v.tags.code == "") {
      wx.showToast({
        title: '未添加失物类目',
        icon: "none"
      })
    } else if (v.description == "") {
      wx.showToast({
        title: '未添加失物描述',
        icon: "none"
      })
    } else if (v.oldHome.address == "") {
      wx.showToast({
        title: '未添加失物地址',
        icon: "none"
      })
    } else if (descripImageList == "") {
      wx.showToast({
        title: '未添加失物图片',
        icon: "none"
      })
    } else {
      //确认发布
      let showModalRes = await wx.showModal({
        title: '信息提示',
        content: '失物数据上传过程中如果您强制退出，会导致上架失败哦～',
        confirmText: "确认",
        showCancel: true,
      })
      if (showModalRes.confirm) {
        console.log("点击了确认");
        for (var idx = 0; idx < descripImageList.length; idx++) {
          wx.showLoading({
            title: '添加第' + (idx + 1) + "描述图",
          })
          let promiseMethodC = await wx.cloud.uploadFile({
            cloudPath: "用户" + openid + "/" + 'descripImageList/' + 'img' + idx + "time_" + Date.now() + ".jpg",
            filePath: descripImageList[idx]
          })
          descripImageList[idx] = promiseMethodC.fileID
          wx.hideLoading()
        }
        if (v.video != null) {
          wx.showLoading({
            title: "添加视频中",
          })
          let promiseMethodC = await wx.cloud.uploadFile({
            cloudPath: "用户" + openid + "/" + 'video/' + 'video_' + "time_" + Date.now() + ".mp4",
            filePath: v.video
          })
          let video = promiseMethodC.fileID
          that.setData({
            video: video
          })
          wx.hideLoading()
        }
        var createTime = util.formatTime(new Date()).replace(/-/g, "/").replace(" ", "-");
        await ydb.collection("CHDLost").add({
          data: {
            name: v.name,
            tags: v.tags,
            description: v.description,
            descripImageList: descripImageList,
            video: v.video,
            oldHome: v.oldHome,
            browserNum: 0,
            forShow: 0,
            helpIt: 0,
            orderSeq:Date.now().toString()
          }
        })
        wx.hideLoading()
        let showModalRes2 = await wx.showModal({
          title: '添加成功啦',
          content: '记得到最近的失物寄存处寄存呢',
          confirmText: "确认",
          showCancel: false,

        })
        if (showModalRes2.confirm) {
          wx.switchTab({
            url: '/pages/find/find?myLostId=' + this.data.id,
          });
        }
      }
    }
    }
})