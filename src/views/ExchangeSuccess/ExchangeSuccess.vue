<template>
  <div class="exchange-success">
    <div class="success">
        <i :class="status=='-2' || status=='-1'? 'iconfont icon-lipin icon-success':'iconfont icon-chenggong icon-success'"></i>
        <p>{{
            status=='-2'?'在下方可进行抽奖活动哦':'' || 
            status=='-1'?'在下面抽奖区可领取您的奖品哦':'' || 
            '兑换礼品成功'}}
        </p>
    </div>
    <div class="chance-to-draw" v-show="show">
       <p v-show="show1">恭喜您！额外获得1次抽奖机会</p>
       <div class="scraping-card">
         <div class="canvas-box">
             <div id="prize" class="winning-results">
                <span class="winres-text" v-if="giftType!=''">
                    {{giftType == '0' ? '恭喜您！获得' + giftname : '获得' + giftname}}
                    </span>
                <span class="winres-text" v-if="giftType == ''">继续刮刮...</span>
                <van-button class="winres-but" @click.native="submAcceptAward">领<br/>奖</van-button>
            </div>
            <canvas id="canvas"></canvas>
         </div>
       </div>
    </div>
    <div class="exchange-tips">
        <span class="tips-text">温馨提示：</span>
        <span class="describe-text">1、成条（五份）兑换可获得一次抽奖机会，最高获奖者千元奖励</span>
    </div>
  </div>
</template>

<script>
import {ScratchPrize,AcceptAward} from '../../api/api'
export default {
   name:'ExchangeSuccess',
   data() {
       return{
        giftId:'',
        show:false,
        show1:false,
        giftType:'', // 0为红包，1为物料
        giftname:'', // 礼品描述
        isDisable:true,
        status:''
       }
   },
   mounted() {
       this.giftId = this.$route.query.giftId
       this.status = this.$route.query.status
       document.title = '';
       if(this.giftId != 0){
        this.show = true
       }else{
        this.show = false
       }
       if(this.status=='-2' || this.status == '-1'){
         document.title = '领奖';
         this.show1 = false
       }else{
         document.title = '兑换成功';
         this.show1 = true
       }
       if(this.status == '-1') {
        canvas.style.display = 'none'
        this.getScratchPrizeData()
       }else{
       this.$nextTick(() => {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        /* 画布偏移量*/
        let arr = getOffset(canvas);
        let oLeft = arr[0];
        let oTop = arr[1];
        
        /* 初始化画布*/
        ctx.beginPath();
        ctx.fillStyle = '#ccc';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        // 设置字体
        ctx.font = "20px bold 黑体";
        // 设置颜色
        ctx.fillStyle = "red";
        // 设置水平对齐方式
        ctx.textAlign = "center";
        // 设置垂直对齐方式
        ctx.textBaseline = "middle";
        // 绘制文字（参数：绘制的文字，x坐标，y坐标）
        ctx.fillText("开始刮奖", 155, 80);
        ctx.closePath();
        
        /* 增加触摸监听*/
        document.addEventListener("touchstart",function(){
            /* 初始化画笔*/
            ctx.beginPath();
            /* 画笔粗细*/
            ctx.lineWidth = 30;
            /* 设置组合效果*/
            ctx.globalCompositeOperation = 'destination-out';
            /* 移动画笔原点*/
            ctx.moveTo(event.touches[0].pageX-oLeft,event.touches[0].pageY-oTop+25);
        },false)
        
        document.addEventListener("touchmove",function(){
            /* 根据手指移动画线，变透明*/
            ctx.lineTo(event.touches[0].pageX-oLeft,event.touches[0].pageY-oTop+25);
            /* 填充*/
            ctx.stroke();
        })
        // 计算已经刮过的区域占整个区域的百分比
        // 鼠标按下后拖动
        canvas.addEventListener('touchstart', function(event) {
            // 通过像素点来计算，划过的面积
            handleFilledPercentage(getFilledPercentage());
        });

        function getFilledPercentage() {
            let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
            // imgData.data数组，存储指定区域每个像素点的信息，数组中4个元素表示一个像素点的rgba值
            let pixels = imgData.data;
            let transPixels = [];
            for(let i = 0; i < pixels.length; i += 4) {
                // 判断像素点是否透明判断该像素点的a值是否等于0，
                if(pixels[i + 3] < 128) {
                    transPixels.push(pixels[i + 3]);
                }
            }
            return(transPixels.length / (pixels.length / 4) * 100).toFixed(2) + '%'
        }
        let that = this
        // 设置值，隐藏canvas
        function handleFilledPercentage(percentage) {
            percentage = percentage || 0;
            if(parseInt(percentage) > 25) {
                // 当像素点的个数超过25%时，隐藏canvas
                canvas.style.display = 'none'
                that.getScratchPrizeData()
            }
        }
                
        /* 获取该元素到可视窗口的距离*/
        function getOffset(obj){
            var valLeft = 0,valTop = 0;
            function get(obj){
                valLeft += obj.offsetLeft;
                valTop += obj.offsetTop;
                /* 不到最外层就一直调用，直到offsetParent为body*/
                if (obj.offsetParent.tagName!='BODY') {
                  get(obj.offsetParent);
                }
                return [valLeft,valTop];
            }
            return get(obj);
        }
       })}
        
},
 methods:{
     // 刮奖
    getScratchPrizeData(){
        this.$postRequest(ScratchPrize,{giftId:this.giftId}).then(res => {
            if(res.data.code =='0000') {
              let giftData = res.data.data.gift
              this.giftType = giftData.giftType
              this.giftname = giftData.giftname
            }
        })
    },
    // 领奖
    submAcceptAward(){
        if(this.isDisable == false){
            return
        }
        this.isDisable = false
        this.$postRequest(AcceptAward,{giftId:this.giftId}).then(res => {
            this.isDisable = true
         if(res.data.code == '0000'){
           window.location.href = res.data.data.gift.url
         }
     })
 }
 },
 
}
</script>

<style>

</style>