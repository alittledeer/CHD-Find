// pages/searchFor/searchFor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navItem: [{
        id: 1,
        name: "各类证件",
        code: "geleizhengjian",
        is_child: true,
        child_nav: [{
            sId: 1,
            sName: "学生证",
            sCode: "xueshengzheng",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/学生证.jpg",
            sContent: ""
          },
          {
            sId: 2,
            sName: "身份证",
            sCode: "shengfenzheng",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/身份证.jpg",
            sContent: ""
          },
          {
            sId: 3,
            sName: "团员证",
            sCode: "tuanyuanzheng",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/团员证.jpg",
            sContent: ""
          },
          {
            sId: 4,
            sName: "公交卡",
            sCode: "gongjiaka",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/公交卡.jpg",
            sContent: ""
          },
          {
            sId: 5,
            sName: "其他",
            sCode: "qita",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/校徽.jpg",
            sContent: "其他无法描述的证件"
          }
        ]
      },
      {
        id: 2,
        name: "生活用品",
        code: "shenghuoyongpin",
        is_child: true,
        child_nav: [{
            sId: 1,
            sName: "用电的",
            sCode: "yongdiande",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/用电的.jpg",
            sContent: "小电扇、收音机等等"
          },
          {
            sId: 2,
            sName: "不用电的",
            sCode: "buyongdiande",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/不用电的.jpg",
            sContent: "小挂件，布娃娃"
          },
          {
            sId: 3,
            sName: "运动用品",
            sCode: "yundongyongpin",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/运动用品.jpg",
            sContent: "电子手表"
          },
          {
            sId: 4,
            sName: "其他",
            sCode: "qita",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/校徽.jpg",
            sContent: "其他无法描述的生活用品"
          }
        ]
      }, {
        id: 3,
        name: "学习娱乐",
        code: "xuexiyule",
        is_child: true,

        child_nav: [{
            sId: 1,
            sName: "教材",
            sCode: "jiaocai",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/教材.jpg",
            sContent: "课内教材"
          },
          {
            sId: 2,
            sName: "其他书籍",
            sCode: "qitashuju",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/非教材书籍.jpg",
            sContent: "非课内教材"
          },
          {
            sId: 3,
            sName: "学习用品",
            sCode: "xuexiyongpin",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/文具.jpg",
            sContent: "电子元器件、单片机、文具、计算器的等"
          },
          {
            sId: 4,
            sName: "其他",
            sCode: "qita",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/校徽.jpg",
            sContent: "无法分类至以上的"
          }
        ]

      }, {
        id: 4,
        name: "数码产品",
        code: "shumachanpin",
        is_child: true,
        child_nav: [{
            sId: 1,
            sName: "手机/平板",
            sCode: "shouji/pingban",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/手机平板.jpg",
            sContent: "手机、平板电脑等"
          },
          {
            sId: 2,
            sName: "电脑/电脑配件",
            sCode: "diannao/xianshiqi",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/笔记本.jpg",
            sContent: "笔记本、u盘等"
          },
          {
            sId: 3,
            sName: "摄影器材",
            sCode: "sheyingqicai",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/摄影.jpg",
            sContent: "单反、微单、三脚架、摄影包等"
          },
          {
            sId: 4,
            sName: "音响/耳机",
            sCode: "yinxiang/erji",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/耳机.jpg",
            sContent: "实打实的音响或者耳机"
          },
          {
            sId: 5,
            sName: "其他",
            sCode: "qita",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/校徽.jpg",
            sContent: "其他无法描述的数码产品"
          }
        ]

      }, {
        id: 5,
        name: "小件配饰",
        code: "fuzhuangxiebao",
        is_child: true,
        child_nav: [{
            sId: 1,
            sName: "帽子",
            sCode: "maozi",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/帽子.jpg",
            sContent: ""
          },
          {
            sId: 2,
            sName: "饰品",
            sCode: "shipin",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/饰品.jpg",
            sContent: ""
          },
          {
            sId: 3,
            sName: "其他",
            sCode: "qita",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/校徽.jpg",
            sContent: "其他无法描述的服装鞋包"
          }
        ]
      }, {
        id: 6,
        name: "美妆养护",
        code: "meizhuangyanghu",
        is_child: true,
        child_nav: [{
            sId: 1,
            sName: "香水",
            sCode: "xiangshui",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/香水.jpg",
            sContent: ""
          },
          {
            sId: 2,
            sName: "指甲油",
            sCode: "zhijiayou",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/指甲油.jpg",
            sContent: ""
          },
          {
            sId: 3,
            sName: "口红",
            sCode: "yiyaobaojian",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/口红.jpg",
            sContent: ""
          },
          {
            sId: 8,
            sName: "其他",
            sCode: "qita",
            sImg: "cloud://mychd-find-4s9do.6d79-mychd-find-4s9do-1301544649/系统媒体文件/分类样例图/校徽.jpg",
            sContent: "其他无法描述的美妆养护"
          }
        ]
      }
    ],
    curNav: 1,
    curIndex: 0
  },
  //更换右侧显示内容
  switchRight: function (e) {
    var id = e.target.dataset.id
    var index = e.target.dataset.index
    if (this.data.navItem[index].is_child) {
      this.setData({
        curNav: id,
        curIndex: index
      })
    }
  },
  //分类的结果页面
  searchForTag: function (e) {
    var cindex = e.currentTarget.dataset.index
    var pindex = this.data.curIndex
    var parentC = this.data.navItem[pindex].code
    var childC = this.data.navItem[pindex].child_nav[cindex].sCode
    var classify = parentC + "-" + childC
    console.log(classify)
    wx.navigateTo({
      url: '/pages/assortment/assortResult/assortResult?searchFor=' + classify,
    })
  },
})