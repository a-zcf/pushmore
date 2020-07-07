const urls = {
  base: 'http://ld.haiyunzy.com/tdd_qw/',
  origin: 'http://ld.haiyunzy.com/tdd_qw/',
  Login: '/user/login', // 登陆接口
  HadpartIn: '/api/hadpartIn', // 检查用户是否已经参与活动接口
  IndexInfo: '/api/indexInfo', // 获取首页信息接口
  MyTeam: '/api/myTeam', // 我的团队接口
  Exhcange: '/api/exhcange', // 兑换接口
  ExchangeList:'/api/exchangeList', // 订单管理接口
  GetExchangeRule:'/api/getExchangeRule', // 获取兑换规则接口
  MyCard:'/api/myCard', // 获取我的推广码接口
  UpdateMyCard:'/api/updateMyCard', // 更新我的名片接口
  ScratchPrize:'/api/scratchPrize', // 刮奖接口
  AcceptAward:'/api/acceptAward', // 领奖接口
  MyGiftList:'/api/myGiftList', // 我的抽奖列表接口
  GetJssdkConfig:'/api/getJssdkConfig', // 获取jssdk配置接口
  CheckByLocation:'/api/checkByLocation', // 通过地址检查用户是否已经获得权限接口
  CheckPartIn:'/api/checkPartIn', // 切换区内外接口
}
module.exports = urls
