const urls = {
  base: 'http://wx.thewm.cn/zltdd',
  origin: 'http://wx.thewm.cn/zltdd',

  red_url: 'http://wx.thewm.cn/zltdd/frontpage/h5login/login?redirect_url=', // 登陆地址url
  userInfo: '/api/index/userinfo', // 用户信息接口
  bindRecomend: '/api/index/bindRecomend', // 绑定成为天使用户接口
  myTeam: '/api/index/myTeam', // 我的团队接口
  myCard: '/api/index/myCard', // 我的名片接口
  updateMyCard: '/api/index/updateMyCard', // 更新名片接口
  myAarwordsList: '/api/index/myAarwordsList', // 我的中奖记录接口
  checkMember: '/api/index/checkMember', // 检查是否是积分会员接口
  getAwards: '/api/index/getAwards', // 领取单个奖品接口
  getAwardsAll: '/api/index/getAwardsAll', // 领取所有未领取的奖品接口
  myUnreceiveAaward: '/api/index/myUnreceiveAaward', // 我的未领取奖励数接口
  getJsSdkConfig: '/api/jsSdkConfig/getJsSdkConfig', // 分享签名参数接口
}
module.exports = urls
