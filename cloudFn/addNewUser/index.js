// 云函数入口文件和一些初始化操作
const cloud = require('wx-server-sdk')
cloud.init({  
  env:"mychd-find-4s9do",
})
const ydb = cloud.database()
//传入的值有id、newHome、storeTime
// 云函数入口函数
exports.main = async(event) => {
      let res = await ydb.collection('CHDLost').doc(id).update({
        // data 传入需要局部更新的数据
        data: {
          forShow: 1,
          newHome: that.data.newHome,
          storeTime: storeTime
        }
      })
}