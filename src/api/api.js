const urls = {
  // red_url: 'http://zl.haiyunzy.com/small/frontpage/h5login/login?redirect_url=', // 登陆地址url
  adList:'/api/shop/adlist', // 头部广告接口
  categoryList:'/api/shop/categoryList', // 商品分类
  goodsList:'/api/shop/goodsList', // 商品列表
  goodsDetail:'/api/shop/goodsDetail', // 商品详情
  cartList:'/api/cart/cartList', // 购物车列表
  addCart:'/api/cart/addCart', // 购物车加1
  subCart:'/api/cart/subCart', // 购物车减1
  updateCart:'/api/cart/updateCart', // 更新购物车
  preOrder:'/api/order/preOrder', // 订单确认
  addressList:'/api/address/addresslist', // 用户地址列表
  addOrUpadteDdress:'/api/address/addOrUpadteDdress', // 更新购物车
  getAddress:'/api/address/getAddress', // 根据地址id获取地址信息
  setDefaut:'/api/address/setDefaut', // 设置默认地址
  deleteAddress:'/api/address/deleteAddress', // 删除地址
  createOrder:'/api/order/createOrder', // 生成订单
  info:'/api/user/info', // 用户信息
  shopInfo:'/api/shop/shopInfo', // 商家信息
  orderList:'/api/order/orderlist', // 用户订单列表
  orderDetail:'/api/order/orderdetail', // 订单详情
  getGoodsList:'/api/shop/getGoodsList', // 查询商品列表
  saveShowsmokeGoodList:'/api/shop/saveShowsmokeGoodList', // 设置商品
}
module.exports = urls
