webpackJsonp([7],{"02pT":function(e,n){},"1H7Z":function(e,n){},"3IMD":function(e,n){},"7xIN":function(e,n){},GdEX:function(e,n){},HmL5:function(e,n){},JKiR:function(e,n){},NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});t("k3b4");var i=t("+2ln"),a=(t("XmAh"),t("il3B")),o=(t("MY4N"),t("0zAV")),r=(t("UuFX"),t("J1XP")),s=(t("eqfM"),t("/QYm")),c=t("7+uW"),l={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"iphonex-helper-body"}},[n("transition",{attrs:{name:this.transitionName}},[this.isRouterAlive?n("router-view",{staticClass:"child-view"}):this._e()],1)],1)])},staticRenderFns:[]};var u,d=t("VU/8")({name:"App",provide:function(){return{reload:this.reload}},data:function(){return{transitionName:"",isRouterAlive:!0}},methods:{reload:function(){this.isRouterAlive=!1,this.$nextTick(function(){this.isRouterAlive=!0})}},watch:{$route:function(e,n){var t=this.$router.isBack;this.transitionName=t?"slide-right":"slide-left",this.$router.isBack=!1}}},l,!1,function(e){t("HmL5")},null,null).exports,h=t("NYxO"),m=t("bOdI"),p=t.n(m);c.a.use(h.a);var f=new h.a.Store({state:{token:null},mutations:(u={},p()(u,"login",function(e,n){localStorage.token=n,e.token=n}),p()(u,"logout",function(e){localStorage.removeItem("token"),e.token=null}),u)}),g=t("/ocq");c.a.use(g.a);var w=new g.a({routes:[{path:"/",name:"IndexInfo",component:function(){return t.e(0).then(t.bind(null,"r7zA"))},meta:{title:"寻找龙的传人"}},{path:"/OrderAdmin",name:"OrderAdmin",component:function(){return t.e(4).then(t.bind(null,"b5wG"))},meta:{title:"订单管理"}},{path:"/MyTeam",name:"MyTeam",component:function(){return t.e(1).then(t.bind(null,"15Da"))},meta:{title:"我的团队"}},{path:"/MyQrCode",name:"MyQrCode",component:function(){return t.e(5).then(t.bind(null,"5dpL"))},meta:{title:"我的推广码"}},{path:"/MyReward",name:"MyReward",component:function(){return t.e(2).then(t.bind(null,"y2zu"))},meta:{title:"我的奖励"}},{path:"/ExchangeSuccess",name:"ExchangeSuccess",component:function(){return t.e(3).then(t.bind(null,"EtOo"))},meta:{title:""}}]}),v=(t("UoMW"),t("7xIN"),t("MdTC")),k=t.n(v),T=(t("GdEX"),{name:"MeScrollVue",data:function(){return{mescroll:null,lastScrollTop:0,lastBounce:null}},props:{up:Object,down:Object},mounted:function(){this.mescroll=new k.a(this.$refs.mescroll,{up:this.up,down:this.down}),this.$emit("init",this.mescroll)},methods:{beforeRouteEnter:function(){var e=this;this.mescroll&&(this.lastScrollTop&&(this.mescroll.setScrollTop(this.lastScrollTop),setTimeout(function(){e.mescroll.setTopBtnFadeDuration(0)},16)),null!=this.lastBounce&&this.mescroll.setBounce(this.lastBounce))},beforeRouteLeave:function(){this.mescroll&&(this.lastScrollTop=this.mescroll.getScrollTop(),this.mescroll.hideTopBtn(0),this.lastBounce=this.mescroll.optUp.isBounce,this.mescroll.setBounce(!0))}}}),M={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{ref:"mescroll",staticClass:"mescroll"},[n("div",[this._t("default")],2)])},staticRenderFns:[]};var S=t("VU/8")(T,M,!1,function(e){t("fP67")},null,null).exports,y=t("//Fk"),b=t.n(y),x=t("mvHQ"),A=t.n(x),C=t("mtWM"),R=t.n(C);c.a.use(s.a);var I="http://wx.thewm.cn/zltdd",U={};U.p=function(e){var n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),t=window.location.search.substr(1).match(n);return null!=t?unescape(t[2]):null},R.a.defaults.withCredentials=!1,R.a.interceptors.request.use(function(e){var n=U.p("token");return f.commit("login",n),e.data=A()(e.data),e.headers={"Content-Type":"application/json;charset=UTF-8"},f.state.token&&(e.headers.accessToken=""+f.state.token),e},function(e){return b.a.resolve(e)}),R.a.interceptors.response.use(function(e){if(0===e.data.code)return e;if(1e3===e.data.code){var n=location.href;f.commit("logout"),s.a.fail(e.data.msg),window.location.href="http://wx.thewm.cn/zltdd/frontpage/h5login/login?redirect_url="+n}return e},function(e){if(e.response)switch(e.response.data.code){case 101:s.a.fail("您还未参与活动!");break;case 102:s.a.fail("账号不存在!");break;case 103:s.a.fail("账号已被使用!")}return b.a.reject(e.response.data)});var B=function(e,n){return R()({method:"get",params:n,url:""+I+e,headers:{"Content-Type":"application/json"}})},L=t("fxnj"),j=t.n(L),$=t("P9l9");c.a.component("mescroll-vue",S),c.a.use(h.a),c.a.use(s.a),c.a.use(r.a),c.a.use(o.a),c.a.use(a.a),c.a.use(i.a),c.a.config.productionTip=!1,c.a.prototype.$getRequest=B,c.a.prototype.$postRequest=function(e,n){return R()({method:"post",url:""+I+e,data:n,dataType:"jsonp",headers:{"Content-Type":"application/json;charset=UTF-8"}})};var E,N=window.location.href.split("?")[0];E={shareTitle:"佛山推多多",shareDesc:"佛山推多多，快点进来看看吧！",shareLink:N,shareImg:"./assets/img/Headless.png"},B($.getJsSdkConfig,{url:window.location.href}).then(function(e){if(0===e.data.code){var n=e.data.config,t=n.appid,i=n.timeStamp,a=n.nonceStr,o=n.sign;j.a.config({debug:!1,appId:t,timestamp:i,nonceStr:a,signature:o,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"]})}}),j.a.ready(function(){j.a.onMenuShareTimeline({title:E.shareTitle,link:E.shareLink,imgUrl:E.shareImg,success:function(){},cancel:function(){}}),j.a.onMenuShareAppMessage({title:E.shareTitle,desc:E.shareDesc,link:E.shareLink,iconUrl:E.shareImg,success:function(){},cancel:function(){}}),j.a.onMenuShareQQ({title:E.shareTitle,desc:E.shareDesc,link:E.shareLink,imgUrl:E.shareImg,success:function(){},cancel:function(){}}),j.a.onMenuShareWeibo({title:E.shareTitle,desc:E.shareDesc,link:E.shareLink,imgUrl:E.shareImg,success:function(){},cancel:function(){}}),j.a.onMenuShareQZone({title:E.shareTitle,desc:E.shareDesc,link:E.shareLink,imgUrl:E.shareImg,success:function(){},cancel:function(){}})}),w.beforeEach(function(e,n,t){e.meta.title&&(document.title=e.meta.title),t()}),new c.a({router:w,store:f,render:function(e){return e(d)}}).$mount("#app")},P9l9:function(e,n){e.exports={userInfo:"/api/index/userinfo",bindRecomend:"/api/index/bindRecomend",myTeam:"/api/index/myTeam",myCard:"/api/index/myCard",updateMyCard:"/api/index/updateMyCard",myAarwordsList:"/api/index/myAarwordsList",checkMember:"/api/index/checkMember",getAwards:"/api/index/getAwards",getAwardsAll:"/api/index/getAwardsAll",myUnreceiveAaward:"/api/index/myUnreceiveAaward",getJsSdkConfig:"/api/jsSdkConfig/getJsSdkConfig"}},T2s0:function(e,n){},UoMW:function(e,n){var t,i,a=16;t=document.getElementsByTagName("html")[0],i=t.clientWidth,t.style.fontSize=a*(i/375)+"px"},WpgC:function(e,n){},eh36:function(e,n){},fP67:function(e,n){},hW8u:function(e,n){},nsZj:function(e,n){},px3J:function(e,n){},qpP9:function(e,n){}},["NHnr"]);
//# sourceMappingURL=app.5ee3f822dcdb73703640.js.map