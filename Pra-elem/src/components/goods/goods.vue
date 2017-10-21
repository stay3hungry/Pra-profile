<template>
<div class="goods" v-if="goods">
	<div class="menu-wrapper" id="menu-wrapper">
		<ul class="menu-items">	
			<li v-for="(item,index) in goods" class="menu-item" ref = "eachNav" @click="linkTo(index)">		
				<span class="item-name">
					<span v-show="item.type >= 0" class="icon" :class="classArr[item.type]">
					</span>
					{{item.name}}               <!--eachNav-->
				</span>
			</li>
		</ul>
	</div>
	<div class="products" id="scroll2" @scroll="scrollAction">
		<ul>
			<li v-for="detail in goods" class="eachContent">            <!--each Content-->
				<h1 class="food-item" ref = "contentTitle">{{detail.name}}</h1>
				<ul>
					<li v-for="food in detail.foods" class="foodlist" @click="showDetail(food)">
						<span class="food-icon">
							<img :src="food.icon">
						</span>
						<span class="food-content">
							<p class="food-detail">{{food.name}}</p>
							<p class="food-description" v-show="food.description">{{food.description}}</p>
							<div>
								<span class="food-description">月售{{food.sellCount}}份</span>
								<span class="food-description">好评率{{food.rating}}</span>
							</div>
							<div>
								<span class="current-price">￥{{food.price}}</span>
								<span v-show="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span>
							</div>
              <div class="select">
                <cartcurd :food="food"></cartcurd>
<!--              
                <span class="reducefood" v-if="1" @click="reducefood(food.name,food.price)">
                  <i class="iconfont icon-jianshao"></i>
                </span>
                <span>{{selectedfood | judgecount(food.name)}}</span>
  							<span class="addfood" @click="addfood(food.name,food.price)">
  								<i class="iconfont icon-yijianfenxiaotianjia"></i>
  							</span>  
之前 ：遍历添加元素，数据无法独立处理；  改为 ： 添加组件，数据指向每个遍历的food     -->
              </div>      
						</span>
					</li>
				</ul>
			</li>
		</ul>
	</div>
	<shopcart :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice" :selectedfood="selectedfood"  :seller="seller"></shopcart>
  <fooddetail :showingFood="showingFood" ref="fooddetail"></fooddetail>
</div>
</template>


<script type="text/javascript">
import shopcart from '../shopcart/shopcart'
import cartcurd from '../cartcurd/cart-curd'
import fooddetail from '../fooddetail/fooddetail'
var timer // 全局timer，避免在局部无法清除
export default{
  props: {
    seller: {
      type: Object
    },
    goods: {
    }
  },
  data () {
    return {
      chazhi: 0,
      number: 0,
      isScroll: true,
      showingFood: {}
    }
  },
  created () {
    this.classArr = ['manjian', 'discount', 'taocan', 'fapiao', 'baozhang']
  },
  computed: {
    selectedfood: function () {
      var _selectedfood = []
      for (var i = 0; i < this.goods.length; i++) {
        for (var j = 0; j < this.goods[i].foods.length; j++) {
          if (this.goods[i].foods[j].count > 0) {
            _selectedfood.push(this.goods[i].foods[j])
          }
        }
      }
      return _selectedfood
    }
  },
  methods: {
    //   手搓联动滚动
    linkTo: function (index) {
 // 如果点击时已经存在timer，进行清除，避免出错
      clearInterval(timer)
      var eachContent = document.getElementsByClassName('eachContent')
      // var eachMenu = document.getElementsByClassName('menu-item')
      var scroll2 = document.getElementById('scroll2')
      timer = setInterval(function () {
        if (scroll2.scrollTop <= eachContent[index].offsetTop) {
          scroll2.scrollTop += 50
          if (scroll2.scrollTop >= eachContent[index].offsetTop) {
            scroll2.scrollTop = eachContent[index].offsetTop
            clearInterval(timer)
          } else if (index === eachContent.length - 1) {
            eachContent[index].scrollIntoView()
            clearInterval(timer)
          }
        } else {
          scroll2.scrollTop -= 50
          if (scroll2.scrollTop <= eachContent[index].offsetTop) {
            scroll2.scrollTop = eachContent[index].offsetTop
            clearInterval(timer)
          }
        }
      }, 20)
      // for (var i = 0; i < eachMenu.length; i++) {
      //   eachMenu[i].className = 'menu-item'
      // }
      // eachMenu[index].className = 'menu-item item-active'
      // this.isScroll = false
    },
    scrollAction: function () {
      var menu = document.getElementById('menu-wrapper')
      var scroll2 = document.getElementById('scroll2')
      var eachContent = document.getElementsByClassName('eachContent')
      var eachMenu = document.getElementsByClassName('menu-item')
      for (var i = 0; i < eachContent.length; i++) {
        if (scroll2.scrollTop >= eachContent[i].offsetTop) {
          for (var j = 0; j < eachMenu.length; j++) {
            eachMenu[j].className = 'menu-item'
          }
          eachMenu[i].className = 'menu-item item-active'
          if (eachMenu[i].offsetTop >= menu.offsetHeight) {
            menu.scrollTop = menu.offsetHeight
          } else {
            menu.scrollTop = 0
          }
        }
      }
    },
    showDetail: function (food) {
      this.showingFood = food
      this.$refs.fooddetail.show()
    }
  },
    /* 之前结构 相关的事件
    addfood: function (val1, val2) {
      var $val1 = val1
      var eachselected = {'foodname': val1, 'eachprice': val2, 'count': 1}
      this.totalprice = 0 // 遍历之前清零，避免与之前叠加
      if (this.selectedfood.length === 0) { // 未选择商品，无法遍历， 直接push
        this.selectedfood.push(eachselected)
        var eachtotal = eachselected.eachprice * eachselected.count
        this.totalprice += eachtotal
        this.number += 1
      } else { // 已经选择商品， 则进行遍历处理
        this.allfoodstring = []
        for (var i = 0; i < this.selectedfood.length; i++) {
          this.allfoodstring.push(this.selectedfood[i].foodname) // 统计foodname，与selectedfood数组对应   用于后面判断是否已经选择此类产品
        }
        if (this.allfoodstring.indexOf($val1) !== -1) { // 如果原数组中已经有这项foodname，则数量+1
          this.index = this.allfoodstring.indexOf($val1) // 因为数组对应，所以index值对应
          this.selectedfood[this.index].count ++
        } else { // 否则将对象push入数组
          this.selectedfood.push(eachselected)
        }
        var reset = 0
        for (var j = 0; j < this.selectedfood.length; j++) { // 处理结束后，计算价格、数量----写入watch
          eachtotal = this.selectedfood[j].eachprice * this.selectedfood[j].count
          this.totalprice += eachtotal
          reset += this.selectedfood[j].count
          this.number = reset
        }
        this.chazhi = this.seller.minPrice - this.totalprice
      }
    },
    reducefood: function (val1, val2) {
      for (var i = 0; i < this.selectedfood.length; i++) {
        if (this.selectedfood[i].foodname === val1) {
          this.selectedfood[i].count --
          var jianshao = this.selectedfood[i].eachprice
        }
      }
      this.totalprice -= jianshao
      this.number --
      // var resetcount = 0
      // var resetprice = 0
      // for (var j = 0; j < this.selectedfood.length; j++) { // 处理结束后，计算价格、数量----写入watch
      //   resetprice += this.selectedfood[j].eachprice * this.selectedfood[j].count
      //   this.totalprice = resetprice
      //   resetcount += this.selectedfood[j].count
      //   this.number = resetcount
      // }
      this.chazhi = this.seller.minPrice - this.totalprice
    }
  },
  filters: {
    judgecount: function (val, name) {
      for (var i = 0; i < val.length; i++) {
        if (val[i].foodname === name) {
          return val[i].count
        }
      }
    }
  */
  components: {
    shopcart,
    cartcurd,
    fooddetail
  }
}
</script>

<style type="text/css"  scoped>
/*  隐藏滚动条  */
::-webkit-scrollbar{
  display:none;
}

*{list-style: none;}
.goods{
	display: flex;
	width: 100%;
	position: absolute;
	left: 0;
	top: 167px;
	bottom: 58px;
}
.menu-wrapper{
	width: 80px;
	flex: 0,0,80px;
	background-color: #f3f5f7;
	overflow: auto;
  position: relative;
}
.menu-item{
	display: table;
	height: 54px;
	width: 80px;
	padding: 0 12px;
	font-size: 0
}
.item-active{
 font-size: 12px;
 background-color: #fff;
 font-weight:700
}
.icon-yijianfenxiaotianjia{
	width: 14px;
	height: 14px;
	display: inline-block;
	background-size: 14px 14px;
	margin-top: 7px;
	margin-right: 0;
}
.item-name{
	display: table-cell;
	vertical-align: middle;
	height: 54px;
	width: 56px;
	font-size: 12px;
	line-height: 27px;
	border-bottom: 1px solid rgba(7,17,27,0.1)
}
.products{
	flex: 1;
	overflow: auto;
  position: relative;
  padding-bottom: 30px;
}
.food-item{
	height: 26px;
	font-size: 12px;
	color:rgb(147,153,159);
	line-height: 26px;	
	padding-left: 14px;
	border-left: 2px solid #d9dde1;
	background-color: #f3f5f7
}
.foodlist{
	display: flex;
	margin: 18px;
	padding-bottom: 18px;
	border-bottom: 1px solid rgba(7,17,27,0.1)
}
.foodlist:last-child{
	padding-bottom: 0;
	border-bottom:none;
}
.food-icon{
	display: inline-block;
	width: 57px;
	height: 57px;
	flex: 0 0 57px;
	margin-right: 10px;
}
.food-icon img{width: 57px; height: 57px;}
.food-content{
	flex: 1;
	position: relative;
}
.food-detail{
	display: block;
	font-size: 14px;
	color:rgb(7,17,27);
	line-height: 14px;
}
.food-description{
	font-size: 10px;
	color: rgb(147,153,159);
	line-height: 12px;
	margin-top: 8px;
}
.current-price{
	font-size: 14px;
	color: red;
	font-weight: 700;
	line-height: 24px;
}
.old-price{
	font-size: 10px;
	color: rgb(147,153,159);
	font-weight: 700;
	line-height: 24px;
	text-decoration: line-through;
}
.select{
  position: absolute;
  right: 18px;
  bottom: 0px;
}
/*
.reducefood{
  width: 18px;
  height: 18px;
  font-size: 24px;
  line-height: 26px;
  color: rgb(0,160,220)
}
.addfood{
	width: 18px;
	height: 18px;
	font-size: 24px;
	line-height: 18px;
	color: rgb(0,160,220)
}
*/
</style>