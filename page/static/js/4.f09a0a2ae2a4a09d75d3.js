webpackJsonp([4],{EtOo:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("P9l9"),a={name:"ExchangeSuccess",data:function(){return{giftId:"",show:!1,giftType:"",amount:0,giftame:""}},mounted:function(){var t=this;this.giftId=this.$route.query.giftId,0!=this.giftId?this.show=!0:this.show=!1,this.$nextTick(function(){var e=document.getElementById("canvas"),s=e.getContext("2d"),i=function(t){var e=0,s=0;return function t(i){e+=i.offsetLeft;s+=i.offsetTop;"BODY"!=i.offsetParent.tagName&&t(i.offsetParent);return[e,s]}(t)}(e),a=i[0],n=i[1];s.beginPath(),s.fillStyle="#ccc",s.fillRect(0,0,e.width,e.height),s.font="18px bold 黑体",s.fillStyle="red",s.textAlign="center",s.textBaseline="middle",s.fillText("开始刮奖",155,80),s.closePath(),document.addEventListener("touchstart",function(){s.beginPath(),s.lineWidth=30,s.globalCompositeOperation="destination-out",s.moveTo(event.touches[0].pageX-a,event.touches[0].pageY-n)},!1),document.addEventListener("touchmove",function(){s.lineTo(event.touches[0].pageX-a,event.touches[0].pageY-n),s.stroke()}),e.addEventListener("touchstart",function(t){var i;i=(i=function(){for(var t=s.getImageData(0,0,e.width,e.height).data,i=[],a=0;a<t.length;a+=4)t[a+3]<128&&i.push(t[a+3]);return(i.length/(t.length/4)*100).toFixed(2)+"%"}())||0,parseInt(i)>25&&(e.style.display="none",c.getScratchPrizeData())});var c=t})},methods:{getScratchPrizeData:function(){var t=this;this.$postRequest(i.ScratchPrize,{giftId:this.giftId}).then(function(e){if("0000"==e.data.code){var s=e.data.data.gift;t.giftType=s.giftType,t.amount=s.amount,t.giftame=s.giftame}})},submAcceptAward:function(){this.$postRequest(i.AcceptAward,{giftId:this.giftId}).then(function(t){"0000"==t.data.code&&(window.location.href=t.data.data.gift.url)})}}},n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"exchange-success"},[t._m(0),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"chance-to-draw"},[s("p",[t._v("恭喜您！还可以获得1次抽奖机会")]),t._v(" "),s("div",{staticClass:"scraping-card"},[s("div",{staticClass:"canvas-box"},[s("div",{staticClass:"winning-results",attrs:{id:"prize"}},[""!=t.giftType?s("span",{staticClass:"winres-text"},[t._v(t._s(0==t.giftType?"恭喜您！获得"+t.amount+"红包":t.giftame))]):t._e(),t._v(" "),""==t.giftType?s("span",{staticClass:"winres-text"},[t._v("继续刮刮...")]):t._e(),t._v(" "),s("van-button",{staticClass:"winres-but",nativeOn:{click:function(e){return t.submAcceptAward(e)}}},[t._v("领"),s("br"),t._v("奖")])],1),t._v(" "),s("canvas",{attrs:{id:"canvas"}})])])]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"success"},[e("i",{staticClass:"iconfont icon-chenggong icon-success"}),this._v(" "),e("p",[this._v("兑换礼品成功！")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"exchange-tips"},[e("span",{staticClass:"tips-text"},[this._v("温馨提示：")]),this._v(" "),e("span",{staticClass:"describe-text"},[this._v("1、成条（五份）兑换可获得一次抽奖机会，百分百中奖，最高获奖者千元奖励")])])}]};var c=s("VU/8")(a,n,!1,function(t){s("Ubm2")},null,null);e.default=c.exports},Ubm2:function(t,e){}});
//# sourceMappingURL=4.f09a0a2ae2a4a09d75d3.js.map