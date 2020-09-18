/*此函数用于检查用户的登录状态，学号认证信息等*/

// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:"mychd-find-4s9do",
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}