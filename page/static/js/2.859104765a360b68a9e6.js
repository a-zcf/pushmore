webpackJsonp([2],{"15Da":function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("P9l9"),i={name:"MyTeam",data:function(){return{active:0,list:[],loading:!1,finished:!1,activityId:"",formalList:[],developList:[],formalCount:0,developCount:0}},mounted:function(){this.activityId=this.$route.query.activityId,this.postMyTeamData()},methods:{postMyTeamData:function(){var t=this;this.$postRequest(e.MyTeam,{activityId:this.activityId}).then(function(a){"0000"===a.data.code&&(t.formalList=a.data.data.formal.list,t.formalCount=a.data.data.formal.count,t.developList=a.data.data.develop.list,t.developCount=a.data.data.develop.count)})},onLoad:function(){var t=this;setTimeout(function(){for(var a=0;a<10;a++)t.list.push(t.list.length+1);t.loading=!1,t.list.length>=40&&(t.finished=!0)},1e3)}}},n={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"my-team"},[t._m(0),t._v(" "),s("van-tabs",{model:{value:t.active,callback:function(a){t.active=a},expression:"active"}},[s("van-tab",{attrs:{title:"发展客户"}},[s("h3",{staticClass:"title"},[t._v("~~目前发展用户"+t._s(t.developCount)+"人~~")]),t._v(" "),s("div",{staticClass:"list"},[s("ul",[t._l(t.developList,function(a,e){return s("li",{key:e},[s("img",{staticClass:"head-portrait",attrs:{src:a.headImg}}),t._v(" "),s("span",{staticClass:"name formal-name"},[t._v(t._s(a.nickName))]),t._v(" "),s("span",{staticClass:"sweep-code"},[s("p",{staticClass:"code"},[t._v(t._s("0"===a.status?"未扫码":"已扫码")+t._s(a.brandName))]),s("p",{staticClass:"time"},[t._v("邀请时间："+t._s(a.scanTime))])])])}),t._v(" "),""==t.developList?s("van-divider",[t._v("暂无发展用户~~")]):t._e()],2)])]),t._v(" "),s("van-tab",{attrs:{title:"正式客户"}},[s("h3",{staticClass:"title"},[t._v("~~目前正式用户"+t._s(t.formalCount)+"人~~")]),t._v(" "),s("div",{staticClass:"list"},[s("ul",[t._l(t.formalList,function(a,e){return s("li",{key:e},[s("img",{staticClass:"head-portrait",attrs:{src:a.headImg}}),t._v(" "),s("span",{staticClass:"name formal-name"},[t._v(t._s(a.nickName))]),t._v(" "),s("span",{staticClass:"sweep-code"},[s("p",{staticClass:"code"},[t._v(t._s("0"===a.status?"未扫码":"已扫码")+t._s(a.brandName))]),s("p",{staticClass:"time"},[t._v("扫码时间："+t._s(a.scanTime))])])])}),t._v(" "),""==t.formalList?s("van-divider",[t._v("暂无正式用户~~")]):t._e()],2)])])],1)],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"head-img"},[a("img",{attrs:{src:s("F1fe")}})])}]};var l=s("VU/8")(i,n,!1,function(t){s("5KKZ")},null,null);a.default=l.exports},"5KKZ":function(t,a){},F1fe:function(t,a,s){t.exports=s.p+"static/img/headImg.3d4f2d1.png"}});
//# sourceMappingURL=2.859104765a360b68a9e6.js.map