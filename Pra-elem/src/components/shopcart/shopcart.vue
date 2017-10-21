<template>
<div class="shopcart"> 
	<div class="left-content">
		<span class="shopcart-icon" :class="{area_active: totalprice}" @click="toogle">
			<i class="iconfont icon-gouwuche" :class="{icon_active: totalprice}"></i>
			<span class="goods-num" v-if="number > 0">{{number}}</span>
		</span>
		<span class="middle-content">
			<span class="shopcart-sum">
				￥{{totalprice}}
			</span>
			<span class="shopcart-split">|</span><span class="peisong" v-if="totalprice > 0">
				另需配送费￥{{deliveryPrice}}元
			</span>
		</span>
    <span class="peisong" v-if="totalprice == 0">未选购商品</span>
	</div>
	<div class="minPrice" v-if="!totalprice">
		￥{{minPrice}}起送
	</div>
	<div class="minPrice" v-if="totalprice">
		还差￥{{chazhi}}起送
	</div>
  <div class="minPrice buy" v-if="chazhi <= 0" @click="submit">
    去结算
  </div>


  <div class="cart-detail" v-if="change">  <!-- 点击购物车，显示已选商品详情 -->
    <div class="cart-top"></div>
    <div class="cart-content">
      <div class="cart-header">
        <span class="cart-header-title">购物车</span>
        <span class="cart-remove" @click="empty">清空</span>
      </div>
      <ul class="foodlist">
        <li v-for="foodinfo in selectedfood" class="food-info">
          <span class="foodinfo-name">{{foodinfo.name}}</span>
          <span class="foodinfo-eachtotal">￥{{foodinfo.price*foodinfo.count}}</span>
          <cartcurd class="select-button" :food="foodinfo"></cartcurd>
        </li>
      </ul>
    </div>
  </div>
  <div class="listmask" v-if="change" @click="toogle"></div>


  <div class="confirm" v-if="delConfirm">
    <div class="confirm-title">清空购物车?</div>
    <div>
      <span class="confirm-true" @click="confirmEmpty">清空</span>
      <span class="confirm-false" @click="cancelEmpty">取消</span>
    </div>
  </div>
  <jiesuan :selectedfood="selectedfood" :seller="seller" :totalprice="totalprice" ref="jiesuan"></jiesuan>
</div>
</template>
<script type="text/javascript">
import cartcurd from '../cartcurd/cart-curd'
import jiesuan from '../jiesuan/jiesuan'
export default{
  props: {
    seller: {
    },
    food: {
    },
    selectedfood: {
    },
    minPrice: {
    },
    deliveryPrice: {
    }
  },
  data: function () {
    return {
      change: false,
      delConfirm: false
    }
  },
  computed: {
    totalprice: function () {
      var _totalprice = 0
      for (var i = 0; i < this.selectedfood.length; i++) {
        _totalprice += this.selectedfood[i].price * this.selectedfood[i].count
      }
      return _totalprice
    },
    number: function () {
      var _number = 0
      for (var i = 0; i < this.selectedfood.length; i++) {
        _number += this.selectedfood[i].count
      }
      return _number
    },
    chazhi: function () {
      return this.minPrice - this.totalprice
    }
  },
  methods: {
    toogle: function () {
      if (!this.number) {
        return
      } else {
        this.change = !this.change
      }
    },
    empty: function () { // 清空每个food的count  而不是清空selectedfood数组(每个food数据不变)
      this.delConfirm = true
    },
    confirmEmpty: function () {
      for (var i = 0; i < this.selectedfood.length; i++) {
        this.selectedfood[i].count = 0
      }
      this.change = false
      this.delConfirm = false
    },
    cancelEmpty: function () {
      this.delConfirm = false
    },
    submit: function () {
      this.$refs.jiesuan.show()
    }
  },
/* 更改方案。重写shopcart
  props: {
    minPrice: {
      type: Number
    },
    deliveryPrice: {
      type: Number
    },
    number: {
    },
    chazhi: {
    },
    totalprice: {
    },
    selectedfood: {
    },
    food: {
    }
  },
  data () {
    return {
      _totalprice: 0,
      _number: 0,
      _chazhi: 0,
      _allselectedfood: [] // cartcurd传过来的 数组
    }
  },
  methods: {
    getuser: function (data1, data2, data3) {
      this._totalprice = data1
      this._number = data2
      this._chazhi = this.minPrice - this.totalprice
      this._allselectedfood = data3
      console.log(data3)
    }
  },
  computed: {
    // atotalprice: function () {
    //   var a = this._allselectedfood
    //   if (a.length === 0) {
    //     return 0
    //   }
    // }
  },
*/
  components: {
    cartcurd,
    jiesuan
  }
}
</script>



<style type="text/css" scoped>
@import 'iconfont.css';
/*引入外部css*/
*{
  list-style: none;
  margin: 0;
  padding: 0
}
.shopcart{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 48px;
	background-color: rgb(20,29,39);
	z-index: 10
}
.shopcart-icon{
	position: absolute; 
	bottom: 0;
	height: 56px;
	width: 56px;
	margin-left: 18px;
	border: 6px solid #141d27;
	border-radius: 50%;
	background-color: rgb(43,52,60);
	text-align: center;
}
.goods-num{
	display: block;
	position: absolute;
	right: -8px;
	top:0;
	width: 24px;
	height: 16px;
	border-radius: 12px;
	background-color: rgb(240,20,20);
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
	font-size:9px;
	font-weight: 700;
	line-height: 16px;
	color:white;
}
.icon-gouwuche{
	font-size: 24px;
	line-height: 48px;
	color: rgba(255,255,255,0.4)
}
.area_active{
  background-color: rgb(0,160,220);
}
.icon_active{
  color: white
}
.shopcart-sum{
	margin-left: 20%;
	font-size: 16px;
	font-weight: 700;
	line-height: 48px;
	color: white;
}
.shopcart-split{
	margin-left:3px;
	color: rgba(255,255,255,0.1);
}
.peisong{
	color: rgba(255,255,255,0.4);
	font-size: 16px;
	line-height: 48px;
}
.shopcart-nothing{
  margin-left: 20%;
  font-size: 16px;
  line-height: 48px;
  color: rgba(255,255,255,0.4);  
}
.minPrice{
	position: absolute;
	right: 0;
	bottom: 0;
	width: 25%;
	height: 48px;
	background-color: rgb(43,51,59);
	font-size: 12px;
	color: rgba(255,255,255,0.4);
	font-weight: 700;
	line-height: 48px;
	text-align: center;
}
.buy{
  background-color: green;
  color: white
}
.cart-detail{
  position: absolute;
  left: 0;
  bottom: 48px;
  width: 100%;
  max-height:300px;
  background-color: #fff;
  z-index: -1
}
.cart-header{
  position: absolute;
  top: 0;
  width: 100%;
  height: 40px;
  background-color: #f3f5f7
}
.cart-header-title{
  font-size: 14px;
  font-weight: 200;
  color: rgb(7,17,27);
  line-height: 40px;
  padding: 0 18px;
}
.cart-remove{
  font-size: 12px;
  color: rgb(0,160,220);
  line-height: 40px;
  float: right;
  margin-right: 18px;
}
.foodlist{
  max-height: 260px;
  overflow: auto;
  margin-top: 40px;
  padding: 0 18px;
  border-top: 1px solid rgba(7,17,27,0.1)
}
.food-info{
  position: relative;
  padding: 12px 0;
  height: 48px;
}
.foodinfo-name{
  font-size: 14px;
  color: rgb(7,17,27);
  line-height: 24px;
}
.foodinfo-eachtotal{
  font-size: 14px;
  font-weight: 700;
  color: rgb(240,20,20);
  line-height: 24px;
}
.select-button{
  position: absolute;
  right: 0;
  height: 18px;
  top:12px;
}
.listmask{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(7,17,27,0.6);
  filter: blur(10px);
  z-index: -2;
}
.confirm{
  position: fixed;
  top: 40%;
  left: 20%;
  height: 70px;
  width: 60%;
  border-radius: 10px;
  background-color: #fff;
  z-index: 15
}
.confirm-title{
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 15px;
  font-weight: 700;
  border-bottom: 1px solid rgba(7,17,27,0.3)
}
.confirm-true{
  display: inline-block;
  width: 50%;
  text-align: center;
  line-height: 30px;
  font-size: 15px;
  font-weight: 700;
  color: rgb(0,160,220);
  border-right: 1px solid rgba(7,17,27,0.3)
}
.confirm-false{
  display: inline-block;
  margin-left: -5px;
  width:50%;
  text-align: center;
  line-height: 30px;
  font-size: 15px;
}

@media screen and (max-width:320px){
  .shopcart-sum{
  	margin-left:75px;
  	font-size: 10px;
  	font-weight: 700;
  	line-height: 48px;
  	color: white;
  }
  .peisong{
  	color: rgba(255,255,255,0.4);
  	font-size: 10px;
  	line-height: 48px;
  }
}
</style>
