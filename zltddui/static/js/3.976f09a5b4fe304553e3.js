webpackJsonp([3],{JETH:function(t,s){},y2zu:function(t,s,l){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=l("P9l9"),e={name:"MyReward",data:function(){return{show:!1,show1:!1,url:"",list:[],mescroll:null,mescrollDown:{use:!1},mescrollUp:{callback:this.upCallback,noMoreSize:1,page:{num:0,size:10,time:null},empty:{warpId:"mescroll",tip:"暂无相关数据"},htmlNodata:'<p class="upwarp-nodata">-- 已加载完 --</p>',htmlLoading:'<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中...</p>'}}},mounted:function(){this.mescroll.resetUpScroll()},methods:{mescrollInit:function(t){this.mescroll=t},upCallback:function(t,s){var l=this;this.$getRequest(a.myAarwordsList,{pageNum:t.num,pageSize:t.size}).then(function(s){if(0===s.data.code){var a=s.data.page.list;1===t.num&&(l.list=[]),l.list=l.list.concat(a),l.$nextTick(function(){l.mescroll.endSuccess(a.length)})}})},clickReceive:function(t,s){var l=this;"0"===s?l.$getRequest(a.checkMember).then(function(s){0===s.data.code?l.$getRequest(a.getAwards,{id:t}).then(function(t){0===t.data.code?(l.url=t.data.url,l.show=!0,l.mescroll.resetUpScroll()):l.$toast.fail(t.data.msg)}):105===s.data.code&&(l.url=s.data.url,l.show1=!0)}):l.$dialog.alert({message:"您好！您已领取了该奖励！",theme:"round-button"}).then(function(){})},clickClear:function(){this.show=!1,this.show1=!1},clickPointsmall:function(){window.location.href=this.url}}},c={render:function(){var t=this,s=t.$createElement,l=t._self._c||s;return l("div",{staticClass:"order-admin"},[l("mescroll-vue",{ref:"mescroll",attrs:{down:t.mescrollDown,up:t.mescrollUp,id:"mescroll"},on:{init:t.mescrollInit}},[l("ul",{staticClass:"order-list"},t._l(t.list,function(s,a){return l("li",{key:a},[l("div",{staticClass:"left"},[l("span",{staticClass:"left-top"},[t._v("邀请扫码获得+"+t._s(s.prizeName))]),t._v(" "),l("span",{staticClass:"left-bottom"},[t._v(t._s(s.createTime))])]),t._v(" "),l("button",{staticClass:"right",style:"0"==s.status?"background-color: #ff6600;":"background-color:#00cc99",on:{click:function(l){return t.clickReceive(s.id,s.status)}}},[t._v(t._s("0"==s.status?"点击领取":"已领取"))])])}),0)]),t._v(" "),l("van-overlay",{attrs:{show:t.show},on:{click:function(s){t.show=!1}}},[l("div",{staticClass:"wrapper"},[l("h3",[t._v("恭喜您")]),t._v(" "),l("p",{staticClass:"p1"},[t._v("成功领取龙币")]),t._v(" "),l("p",{staticClass:"p2",on:{click:t.clickPointsmall}},[t._v("赶快进入积分商城兑换商品吧 》》")])]),t._v(" "),l("van-icon",{staticClass:"clear",attrs:{name:"clear"},on:{click:t.clickClear}})],1),t._v(" "),l("van-overlay",{attrs:{show:t.show1},on:{click:function(s){t.show1=!1}}},[l("div",{staticClass:"wrapper"},[l("h3",[t._v("您还不是积分会员！")]),t._v(" "),l("p",{staticClass:"p1"},[t._v("领取龙币失败")]),t._v(" "),l("p",{staticClass:"p2",on:{click:t.clickPointsmall}},[t._v("为你保留一个月的有效时间，赶快前往注册会员吧 》》")])]),t._v(" "),l("van-icon",{staticClass:"clear",attrs:{name:"clear"},on:{click:t.clickClear}})],1)],1)},staticRenderFns:[]};var i=l("VU/8")(e,c,!1,function(t){l("JETH")},null,null);s.default=i.exports}});
//# sourceMappingURL=3.976f09a5b4fe304553e3.js.map