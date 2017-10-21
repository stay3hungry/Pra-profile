<template>
  <div class="jiesuan" v-if="isShow" @scroll = "scroll" id="jiesuan">
    <div class="jiesuan-title" :class="{titleFixed : isFixed}">
       <i class="iconfont icon-common-fanhui-copy" @click="hide"></i>
      <span class="title-text">订单配送至</span>
    </div>
    <div class="addressWrapper">
      <div class="addAddress">
        <i class="iconfont icon-iconjia"></i>
        <span>添加收货地址</span>
      </div>
    </div>
    <div class="time" id="time">
      尽快送达 [ 预计{{time}} ]
      <span class="timeDetail">
        <i class="iconfont icon-qianjin-copy"></i>
      </span>
    </div>
    <div class="foodwrapper">
      <div class="back-line">
        <div class="linebody"></div>
      </div>
      <span class="sellername">
        {{seller.name}}
      </span>
      <ul class="foodlist">
        <li v-for="item in selectedfood" class="eachlist">
          <span class="left-fontStand">{{item.name}}</span>
          <span class="foodcount">x{{item.count}}</span>
          <span class="eachtotal">￥{{item.count * item.price}}</span>
        </li>
      </ul>
      <li v-if="seller.canhe" class="eachlist">
        <span class="left-fontStand">餐盒费</span>
        <span>{{seller.canhe}}</span>
      </li>
      <li class="eachlist">
        <span class="left-fontStand">配送费</span>
        <span class="eachtotal">￥{{seller.deliveryPrice}}</span>
      </li>
      <li class="eachlist-last" v-if="totalprice > man">
        <span class="left-fontStand">
          {{seller.supports[0].description}}
        </span>
        <span class="eachtotal youhui">-￥{{manjian}}</span>
      </li>
      <div class="split"></div>
      <li class="eachlist-last">
        <span class="left-fontStand">红包</span>
        <span class="hongbao">选择地址后使用红包</span>
      </li>
      <div style="clear:both;"></div>
      <li class="eachlist-last">
        <span class="youhui-intro">优惠说明</span>
        <span>
          <i class="iconfont icon-wenhao"></i>
        </span>
        <span class="totalprice">
          <span class="sum">
            小计
            <span class="sum-money">￥{{money}}</span>
          </span>
        </span>
      </li>
    </div>
    <li class="vip">
      <div class="vip-intro">
        <p class="vip-title">
          成为超级会员
          <i class="iconfont icon-huangguan"></i>
        </p>
        <p class="vip-detial">每月返20元红包，本单<span>减5元</span></p>
        <i class="iconfont icon-wenhao"></i>
      </div>
      <div class="vip-cost">
        <span class="vip-oldprice">￥15</span>
        <span class="vip-curprice">￥12</span>
        <i class="iconfont icon-duihao"></i>
      </div>
    </li>

    <div class="about">
      <li class="about-list">
        在线支付
      </li>
      <li class="about-list">
        <span>匿名购买</span>
        <i class="iconfont icon-wenhao"></i>
      </li>
      <li class="about-list">
        <span>口味偏好/餐具分数</span>
        <i class="iconfont icon-qianjin-copy"></i>
      </li>
      <li class="about-list isFapiao">
        未满100.0元，不能开发票
      </li>
    </div>
    <div class="bottom-part">
      <span class="pay-left">
        <span class="moneypaying">
          ￥{{money}}
        </span>
        <span v-if="totalprice > man" class="youhuied">| 已优惠￥{{manjian}}</span>
      </span>
      <span class="gotoPay">去支付</span>
    </div>
  </div>
</template>
<script type="text/javascript">
export default{
  props: {
    seller: {},
    selectedfood: {},
    totalprice: {}
  },
  data: function () {
    return {
      isShow: false,
      isFixed: false
    }
  },
  methods: {
    show: function () {
      this.isShow = true
    },
    hide: function () {
      this.isShow = false
    },
    scroll: function () {
      var el = document.getElementById('jiesuan') // div的滚动,并不是body
      var scroll = el.scrollTop
      if (scroll >= 70) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    }
  },
  computed: {
    manjian: function () {
      return this.seller.supports[0].description.split('')[this.seller.supports[0].description.length - 1]
    },
    man: function () {
      return this.seller.supports[0].description.split('').slice(5, 7).join('')
    },
    time: function () {
      var date = new Date()
      var hours = date.getHours()
      var minutes = date.getMinutes() + this.seller.deliveryTime
      if (minutes >= 60) {
        hours += 1
        minutes -= 60
      }
      if (minutes < 10) {
        return hours + ':' + '0' + minutes
      }
      return hours + ':' + minutes
    },
    money: function () {
      if (this.totalprice > this.man) {
        return this.totalprice + this.seller.deliveryPrice - this.manjian
      } else {
        return this.totalprice + this.seller.deliveryPrice
      }
    }
  }
}
</script>


<style type="text/css" scoped>
*{
  box-sizing: border-box;
  font-family: Microsoft YaHei；;

}
::-webkit-scrollbar{
  display:none;
}
.jiesuan{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;  
  height: 100%;
  background-color: #fff;
  overflow: auto;
  padding-bottom: 48px;
}
.jiesuan-title{
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  color: #fff;
  font-weight: 700;
  background-color: rgb(3,142,255);
  padding-left: 10px;
}
.title-text{
  margin-left: -10px;
}
.titleFixed{
  position: fixed;
  z-index: 10;
}
.icon-common-fanhui-copy{
  display: inline-block;
  float: left;
}
.addressWrapper{
  width: 100%;
  height: 60px;
  background-color: rgb(3,142,255)
}
.addAddress{
  height: 40px;
  width: 45%;
  border: 1px solid #fff;
  border-radius: 50px;
  text-align: center;
  color: #fff;
  margin: 0 auto;
  font-weight: 700;
  line-height: 40px;
}
.time{
  width: 100%;
  height: 70px;
  background-color: #fff;
  border: 10px solid rgb(245,245,245);
  font-weight:700;
  padding-left: 18px;
  line-height: 50px;
}
.timeDetail{
  float: right;
  margin-right: 10px;
}
.foodwrapper{
  width: 100%;
  border: 10px solid rgb(245,245,245);
  border-top: none;
  background-color: #fff;
  padding-top: 30px;
}
.back-line{
  width: 100%;
  height: 7px;
  padding-bottom: 3px;
  border-bottom: 1px solid rgb(238,238,238);
}
.linebody{
  height: 3px;
  background-color: rgb(238,238,238);
}
.sellername{
  display:block;
  position: relative;
  z-index: 1;
  top: -30px;
  width: 180px;
  height: 50px;
  margin: 0 auto;
  font-weight: 700;
  line-height: 50px;
  text-align: center;
  background-color: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis
}
.foodlist{
  margin-top:-30px;  /*由于sellername的relative定位，仍占据文档流位置，所以foodlist上移*/
}
.eachlist{
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px dashed rgba(7,17,27,0.1);
  padding: 0 20px;
}
.eachlist-last{
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
  padding:0 20px;
}
.foodcount{
  position: absolute;
  right:120px;
}
.eachtotal{
  position:absolute;
  right: 30px;
}
.youhui{
  color: red;
}
.split{
  width: 100%;
  height: 1px;
  margin-top: 1px;
  background-color: rgba(7,17,27,0.1);
}
.hongbao{
  font-size: 12px;
  color: rgb(147,153,159);
  float: right;
}
.youhui-intro{
  font-size: 12px;
  color: rgb(147,153,159);
}
.sum{
  display: inline-block;
  float: right;
}
.sum-money{
  font-size: 28px;
  font-weight: bold;
}
.vip{
  float: left;
  width: 100%;
  border: 10px solid rgb(245,245,245);
  border-top: none;
  padding: 12px 20px;
}
.vip-intro{
  float: left;
}
.vip-title{
  font-weight: 700;
  color: rgb(7,17,27);
}
.icon-huangguan{
  color: rgb(229,218,162)
}
.vip-detial{
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  color: rgb(147,153,159);
  padding-top: 8px;
}
.vip-cost{
  float: right;
  margin-top: 10px;
}
.vip-oldprice{
  font-size: 10px;
  text-decoration: line-through;
  color: rgb(147,153,159)
}
.vip-curprice{
  font-weight: 700;
}
.icon-duihao{
  color: rgb(147,153,159)
}
.about{
  float: left;
  width: 100%;
  border: 10px solid rgb(245,245,245);
  border-top: none;
  font-weight: 700;
}
.about-list{
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
  padding:0 20px;
  font-size: 14px;
}
.icon-qianjin-copy{
  float: right;
}
.isFapiao{
  color: rgb(147,153,159)
}

.left-fontStand{
  font-size: 14px
}
.icon-wenhao{
  font-size: 14px;
}

.bottom-part{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 48px;
  background-color: pink
}
.youhuied{
  display: inline-block;
  vertical-align: top;
  height: 48px;
  color: #fff;
}
.gotoPay{
  position: absolute;
  right: 0;
  bottom: 0;
  width: 25%;
  height: 48px;
  font-size: 12px;
  font-weight: 700;
  line-height: 48px;
  text-align: center;
  background-color: green;
  color: white
}
.pay-left{
  display: inline-block;
  width: 75%;
  height: 48px;
  padding: 0 10px;
  line-height: 48px;
  background-color: rgb(61,61,61);
}
.moneypaying{
  font-size: 28px;
  font-weight: 700;
  color: #fff;
}
</style>