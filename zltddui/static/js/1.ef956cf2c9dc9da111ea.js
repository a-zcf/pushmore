webpackJsonp([1],{"15Da":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=s("P9l9"),a={name:"MyTeam",data:function(){return{list:[],mescroll:null,mescrollDown:{use:!1},mescrollUp:{callback:this.upCallback,noMoreSize:1,page:{num:0,size:10,time:null},empty:{warpId:"mescroll",tip:"暂无相关数据"},htmlNodata:'<p class="upwarp-nodata">-- 已加载完 --</p>',htmlLoading:'<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中...</p>'},totalCount:""}},mounted:function(){this.mescroll.resetUpScroll()},methods:{mescrollInit:function(t){this.mescroll=t},upCallback:function(t,e){var s=this;this.$getRequest(l.myTeam,{currPage:t.num,pageSize:t.size}).then(function(e){if(0===e.data.code){var l=e.data.page.list;s.totalCount=e.data.page.totalCount,1===t.num&&(s.list=[]),s.list=s.list.concat(l),s.$nextTick(function(){s.mescroll.endSuccess(l.length)})}})}}},n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"my-team"},[t._m(0),t._v(" "),s("h3",{staticClass:"title"},[t._v("~~ 目前团队人数"+t._s(t.totalCount)+"人 ~~")]),t._v(" "),s("mescroll-vue",{ref:"mescroll",attrs:{down:t.mescrollDown,up:t.mescrollUp,id:"mescroll"},on:{init:t.mescrollInit}},[s("ul",{staticClass:"list"},t._l(t.list,function(e,l){return s("li",{key:l},[s("img",{staticClass:"list-img",attrs:{src:e.headimgurl}}),t._v(" "),s("div",{staticClass:"name-time"},[s("span",{staticClass:"name"},[t._v(t._s(e.nickname))]),t._v(" "),s("span",{staticClass:"time"},[t._v("邀请时间："+t._s(e.createTime))])])])}),0)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"head-img"},[e("img",{attrs:{src:s("F1fe")}})])}]};var i=s("VU/8")(a,n,!1,function(t){s("Ck0+")},null,null);e.default=i.exports},"Ck0+":function(t,e){},F1fe:function(t,e,s){t.exports=s.p+"static/img/headImg.da24581.png"}});
//# sourceMappingURL=1.ef956cf2c9dc9da111ea.js.map