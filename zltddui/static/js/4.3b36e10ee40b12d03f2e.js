webpackJsonp([4],{b5wG:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("P9l9"),n={name:"OrderAdmin",data:function(){return{list:[],loading:!1,finished:!1,exchangeList:[]}},mounted:function(){this.postExchangeListData()},methods:{postExchangeListData:function(){var s=this;this.$postRequest(a.ExchangeList).then(function(t){"0000"===t.data.code&&(s.exchangeList=t.data.data.list)})},onLoad:function(){var s=this;setTimeout(function(){for(var t=0;t<10;t++)s.list.push(s.list.length+1);s.loading=!1,s.list.length>=40&&(s.finished=!0)},1e3)}}},i={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"order-admin"},[e("ul",[s._l(s.exchangeList,function(t,a){return e("li",{key:a},[e("img",{staticClass:"order-img",attrs:{src:""}}),s._v(" "),e("div",{staticClass:"order-right"},[e("p",{staticClass:"exchange-number"},[s._v("兑换数量："+s._s(t.exchangeNum)+"/份")]),s._v(" "),e("p",{staticClass:"rece-address"},[e("span",{staticClass:"address"},[s._v("收货地址："+s._s(t.adrress))]),s._v(" "),e("span",{staticClass:"state"},[s._v(s._s("0"===t.status?"未发货":"已发货"))])]),s._v(" "),e("p",{staticClass:"shr-dhsj"},[s._v("收货人："+s._s(t.name))]),s._v(" "),e("p",{staticClass:"shr-dhsj"},[s._v("兑换时间："+s._s(t.exchangeTime))])])])}),s._v(" "),""==s.exchangeList?e("van-divider",[s._v("暂无订单数据~~")]):s._e()],2)])},staticRenderFns:[]};var r=e("VU/8")(n,i,!1,function(s){e("gxJH")},null,null);t.default=r.exports},gxJH:function(s,t){}});
//# sourceMappingURL=4.3b36e10ee40b12d03f2e.js.map