const urls = {
  base: 'http://ld.haiyunzy.com/tdd/',
  origin: 'http://ld.haiyunzy.com/tdd/',
  // base: 'http://127.0.0.1:8083', // 测试环境域名前缀
  // origin: 'http://127.0.0.1:8083', // 测试环境域名前缀
  Login: '/user/login', // 登陆接口
  HadpartIn: '/api/hadpartIn', // 检查用户是否已经参与活动接口
  IndexInfo: '/api/indexInfo', // 获取首页信息接口
  MyTeam: '/api/myTeam', // 我的团队接口
  Exhcange: '/api/exhcange', // 兑换接口
  ExchangeList:'/api/exchangeList', // 订单管理接口
  GetExchangeRule:'/api/getExchangeRule', // 获取兑换规则接口
  MyCard:'/api/myCard', // 获取我的推广码接口
  UpdateMyCard:'/api/updateMyCard', // 更新我的名片接口
}
module.exports = urls
