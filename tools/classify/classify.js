// pages/classfy/classify.js
Page({

  data: {
    navItem: [
      {
        id: 1,
        name: "各类证件",
        code: "geleizhengjian",
        is_child: true,
        child_nav: [{
            sId: 1,
            sName: "学生证",
            sCode: "xueshengzheng",
            sContent: ""
          },
          {
            sId: 2,
            sName: "身份证",
            sCode: "shengfenzheng",
            sContent: ""
          },
          {
            sId: 3,
            sName: "团员证",
            sCode: "tuanyuanzheng",
            sContent: ""
          },
          {
            sId: 4,
            sName: "公交卡",
            sCode: "gongjiaka",
            sContent: ""
          },
          {
            sId: 5,
            sName: "其他",
            sCode: "qita",
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
          sContent: "小电扇、收音机等等"
        },
        {
          sId: 2,
          sName: "不用电的",
          sCode: "buyongdiande",
          sContent: "小挂件，布娃娃"
        },
        {
          sId: 3,
          sName: "运动用品",
          sCode: "yundongyongpin",
          sContent: "电子手表"
        },
        {
          sId: 4,
          sName: "其他",
          sCode: "qita",
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
          sContent: "课内教材"
        },
        {
          sId: 2,
          sName: "其他书籍",
          sCode: "qitashuju",
          sContent: "非课内教材"
        },
        {
          sId: 3,
          sName: "学习用品",
          sCode: "xuexiyongpin",
          sContent: "电子元器件、单片机、文具、计算器的等"
        },
        {
          sId: 4,
          sName: "其他",
          sCode: "qita",
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
          sContent: "手机、平板电脑等"
        },
        {
          sId: 2,
          sName: "电脑/电脑配件",
          sCode: "diannao/xianshiqi",
          sContent: "笔记本、u盘等"
        },
        {
          sId: 3,
          sName: "摄影器材",
          sCode: "sheyingqicai",
          sContent: "单反、微单、三脚架、摄影包等"
        },
        {
          sId: 4,
          sName: "音响/耳机",
          sCode: "yinxiang/erji",
          sContent: "实打实的音响或者耳机"
        },
        {
          sId: 5,
          sName: "其他",
          sCode: "qita",
          sContent: "其他无法描述的数码产品"
        }
      ]

    }, {
      id: 5,
      name: "小件配饰",
      code: "fuzhuangxiebao",
      is_child: true,
      child_nav: [
        {
          sId: 1,
          sName: "帽子",
          sCode: "maozi",
          sContent: ""
        },
        {
          sId: 2,
          sName: "饰品",
          sCode: "shipin",
          sContent: ""
        },
        {
          sId: 3,
          sName: "其他",
          sCode: "qita",
          sContent: "其他无法描述的服装鞋包"
        }
      ]
    }, {
      id: 6,
      name: "美妆养护",
      code: "meizhuangyanghu",
      is_child: true,
      child_nav: [
        {
          sId: 1,
          sName: "香水",
          sCode: "xiangshui",
          sContent: ""
        },
        {
          sId: 2,
          sName: "指甲油",
          sCode: "zhijiayou",
          sContent: ""
        },
        {
          sId: 3,
          sName: "口红",
          sCode: "yiyaobaojian",
          sContent: ""
        },
        {
          sId: 8,
          sName: "其他",
          sCode: "qita",
          sContent: "其他无法描述的美妆养护"
        }
      ]
    } ],
    curNav: 1,
    curIndex: 0
  },
  switchRight: function(e) {
    var id = e.target.dataset.id
    var index = e.target.dataset.index
    if (this.data.navItem[index].is_child) {
      this.setData({
        curNav: id,
        curIndex: index
      })
    }

  },
  backCate: function(e) {
    var cindex = e.currentTarget.dataset.index
    var pindex = this.data.curIndex
    var parent = this.data.navItem[pindex].name
    var parentC = this.data.navItem[pindex].code
    var child = this.data.navItem[pindex].child_nav[cindex].sName
    var childC = this.data.navItem[pindex].child_nav[cindex].sCode
    var classify = parent + "-" + child + " " + parentC + "-" + childC
    wx.setStorage({
      key: 'classify',
      data: classify,
      success: function() {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  
})