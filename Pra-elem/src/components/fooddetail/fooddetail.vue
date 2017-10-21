<template>
  <div class="fooddetail" v-if="isShow">
    <div class="image-wrapper">
      <img :src="showingFood.image" class="image">  
    </div>
    <div class="food-name">{{showingFood.name}}</div>
    <div>
      <span class="sellcount">月售{{showingFood.sellCount}}份</span>
      <span class="rating">好评率{{showingFood.rating}}%</span>
    </div>
    <div class="price">
      <span class="curprice">￥{{showingFood.price}}</span>
      <span class="oldprice" v-if="showingFood.oldPrice">￥{{showingFood.oldPrice}}</span>
      <span class="addToCart" @click="addFood" v-if="!showingFood.count">
      加入购物车</span>
      <cartcurd :food="showingFood" v-show="showingFood.count" class="cartcurd" ref="child"></cartcurd>  
      <!-- 加入购物车click调用 子级事件;             此处不能用v-if,v-if渲染DOM(添加/删除)，v-show渲染display。 v-if会导致初始DOM没有渲染，无法调用ref子事件！！！-->
    </div>
    <div class="space"></div>
    <div class="product-intro">
      <p>商品介绍</p>
      <p class="introduction">{{showingFood.info}}</p>
    </div>
    <div class="space"></div>
    <ratingfilter :ratings="showingFood.ratings"> </ratingfilter>
    <div class="back">
      <i class="iconfont icon-fanhui" @click="hidedetail"></i>
    </div>
  </div>

</template>

<script type="text/javascript">
import ratingfilter from '../ratingfilter/ratingfilter'
import cartcurd from '../cartcurd/cart-curd'
export default{
  props: {
    showingFood: {
      type: Object
    }
  },
  data: function () {
    return {
      isShow: false
    }
  },
  methods: {
    show: function () {
      this.isShow = true
    },
    addFood: function () { // 调用子组件cartcurd 上的addfood事件
      this.$refs.child.addfood()
    },
    hidedetail: function () {
      this.isShow = false
    }
  },
  components: {
    ratingfilter,
    cartcurd
  }
}
</script>
<style type="text/css" scoped>	
.fooddetail{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;  
  height: 100%;
  background-color: #fff;
  overflow: auto;
  padding-bottom: 56px
}
.image-wrapper{
  width: 100%;
  height: 325px;
}
.image{
  width: 100%;
  height: 325px;
}
.food-name{
  padding: 18px 0 8px 18px;
  font-size: 14px;
  font-weight: 700;
  color: rgb(7,17,27);
  line-height: 14px;
}
.sellcount,.rating{
  font-size: 10px;
  color: rgb(147,153,159);
  line-height: 14px;
}
.sellcount{
  padding-left: 18px;
}
.rating{
  padding-left: 12px;
}
.price{
  padding: 18px 0 18px 18px;
}
.curprice{
  font-size: 14px;
  font-weight: 700;
  color: rgb(240,20,20);
  line-height:24px;
}
.oldprice{
  font-size: 10px;
  font-weight: 700;
  color: rgb(147,153,159);
  line-height: 24px;
  text-decoration: line-through;
}
.addToCart{
  display: inline-block;
  float: right;
  width: 84px;
  height: 24px;
  margin-right: 18px;
  border-radius: 12px;
  background-color: rgb(0,160,220);
  font-size: 10px;
  color: #fff;
  line-height: 12px;
  padding: 6px 12px;
}
.cartcurd{
  float: right;
  margin-right: 18px;
}
.space{
  width: 100%;
  height: 16px;
  background-color: #f3f5f7;
  border-top: 1px solid rgba(7,17,27,0.1);
  border-bottom: 1px solid rgba(7,17,27,0.1)
}
.product-intro{
  padding: 18px;
}
.introduction{
  padding-top: 6px;
  font-size: 12px;
  font-weight: 200;
  color:rgb(77,85,93);
  line-height: 24px;
}
.back{
  position: absolute;
  top:10px;
  left: 10px;
}
.icon-fanhui{
  font-size: 20px;
  color: rgba(7,17,27,0.7);
}
</style>