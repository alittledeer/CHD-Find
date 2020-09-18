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
      //首先判断pass的状态
      if (event.judge == "pass") {
        //成功页修改失物状态，
        const lostRes = await transaction.collection('CHDLost').doc(event.lostId).update({
          data: {
            forShow: 2,
          }
        })
        //修改申请状态
        const findRes = await transaction.collection('CHDFind').doc(event.findId).update({
          data: {
            isHis: 1,
          }
        })
        //驳回其他认领表
        let failRes = await ydb.collection('CHDFind').where({
          [`lostProperty._id`]: event.lostId,
        }).get()
        for (var i = 0; i < failRes.data.length; i++) {
          const findRes = await transaction.collection('CHDFind').doc(failRes.data[i].lostProperty._id).update({
            data: {
              isHis: 2,
            }
          })
        }
      } else {
        //失败页仅修改申请状态
        //修改申请状态
        const findRes = await transaction.collection('CHDFind').doc(event.findId).update({
          data: {
            isHis: 2,
          }
        })
      }
      result = true
    })

  return result
}