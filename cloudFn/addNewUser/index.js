// 云函数入口文件和一些初始化操作
const cloud = require('wx-server-sdk')
cloud.init({  
  env:"mychd-find-4s9do",
})
const ydb = cloud.database()

// 云函数入口函数
exports.main = async(event) => {
  //首先查询用户，没有用户自动注册用户
  let user = null;
  let res = await ydb.collection('user').where({
    _openid: event.openid,
  }).get()
  console.log(res)
  if (res.data.length == 0) {
    //新增
    let addNew = await ydb.collection('user').add({
      data: {
        _openid: event.openid,
        nickName: event.name,
        userImg: event.img,
        isAdministrator: false,
        isSellerExamine: 0,
        phoneNumber: "",
        studentID: "",
        SFZID: "",
        writeAllID: false
      },
    })
    user = "new"
  } else {
    user = "old"
  }
  return user
}
