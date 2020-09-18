// 云函数入口文件和一些初始化操作
const cloud = require('wx-server-sdk')
cloud.init({  
  env:"mychd-find-4s9do",
})
const ydb = cloud.database()

// 云函数入口函数
exports.main = async(event) => {
  //首先查询用户，没有用户自动注册用户
  console.log(event)
    let adminStoreLostRes = await ydb.collection('CHDLost').doc(event.id).update({
      data: {
        newHome:event.newHome,
        storeTime:event.storeTime,
        forShow:1
      },
    })
}