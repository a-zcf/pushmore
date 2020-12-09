import wx from 'weixin-js-sdk';
import {getRequest} from './request'
import {getJsSdkConfig} from "../api/api";
const wxWholeShare = function (option){
  getRequest(getJsSdkConfig,{url:window.location.href}).then(res => {
     if(res.data.code === 0){
        let {appid,timeStamp,nonceStr,sign} = res.data.config
         wx.config({
            debug: false,
            appId: appid,
            timestamp: timeStamp,
            nonceStr: nonceStr,
            signature: sign,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone'
            ]
         })
     }
  })
  wx.ready(function(){
      // 分享到朋友圈
    wx.onMenuShareTimeline({
        title: option.shareTitle, // 分享标题
        link: option.shareLink, // 分享链接
        imgUrl: option.shareImg, // 分享图标
        success: function () { 
            // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    });
    // 分享给朋友
    wx.onMenuShareAppMessage({
        title: option.shareTitle, // 分享标题
        desc: option.shareDesc, // 分享描述
        link: option.shareLink, // 分享链接
        iconUrl: option.shareImg, // 分享图标
        success: function () { 
            // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    });
    // 分享到QQ
    wx.onMenuShareQQ({
        title: option.shareTitle, // 分享标题
        desc: option.shareDesc, // 分享描述
        link: option.shareLink, // 分享链接
        imgUrl: option.shareImg, // 分享图标
        success: function () { 
           // 用户确认分享后执行的回调函数
        },
        cancel: function () {
           // 用户取消分享后执行的回调函数
        }
    });
    // 分享到腾讯微博
    wx.onMenuShareWeibo({
        title: option.shareTitle, // 分享标题
        desc: option.shareDesc, // 分享描述
        link: option.shareLink, // 分享链接
        imgUrl: option.shareImg, // 分享图标
        success: function () {
           // 用户确认分享后执行的回调函数
        },
        cancel: function () {
           // 用户取消分享后执行的回调函数
        }
    });
    // 分享到QQ空间
    wx.onMenuShareQZone({
        title: option.shareTitle, // 分享标题
        desc: option.shareDesc, // 分享描述
        link: option.shareLink, // 分享链接
        imgUrl: option.shareImg, // 分享图标
        success: function () { 
           // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    });

  });
}
export {wxWholeShare}