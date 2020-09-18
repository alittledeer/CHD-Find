//调用了事务保证原子性
const cloud = require('wx-server-sdk')
cloud.init({
  env: "mychd-find-4s9do",
})
const ydb = cloud.database()
const _ = ydb.command


// 云函数入口函数
exports.main = async (event) => {
  //event给了两个id
  console.log(event)
  // data: {
  //   lostId:lostId,
  //   findId:findId,
  //   judge:judge,
  //   judgeTime:judgeTime,
  //   adminInfo:app.globalData.userInfo,
  // }
  //保存结果的变量
  let result = false;
  const res = await ydb.runTransaction(
    async transaction => {

     
        //成功页修改失物状态，
        const lostRes = await transaction.collection('CHDLost').doc(event.lostId).update({
          data: {
            forShow: 3,
          }
        })
        //修改申请状态
        const findRes = await transaction.collection('CHDFind').doc(event.findId).update({
          data: {
            isHis: 3,
          }
        })
     
      result = true
    })

  return result
}