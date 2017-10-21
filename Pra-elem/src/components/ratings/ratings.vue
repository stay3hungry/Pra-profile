<template>
<div class="ratingPage">
	<div class="part-1">
		<div class="part-1-buju">
			<span class="part1-left">
				<p class="seller-score">{{seller.score}}</p>
				<p>综合评分</p>
				<p class="comparation">
					<span>高于周边商家</span>
					<span>{{seller.rankRate}}%</span>
				</p>
			</span>
			<span class="part1-right">
				<p>
					<span class="foodscore">商品评分</span>
					<stars :score="seller.foodScore" :size="36" class="stars"></stars>
					<span class="score">{{seller.foodScore}}</span>
				</p>
				<p>
					<span class="servicescore">服务态度</span>
					<stars :score="seller.serviceScore" :size="36" class="stars"></stars>
					<span class="score">{{seller.serviceScore}}</span>
				</p>
				<p>
					<span class="deliveryTime">送达时间</span>
					<span>{{seller.deliveryTime}}分钟</span>
				</p>
			</span>
		</div>
	</div>
	<ratingfilter :ratings="ratings"></ratingfilter>
</div>
</template>

<script type="text/javascript">
import stars from '../stars/stars'
import shopcart from '../shopcart/shopcart'
import ratingfilter from '../ratingfilter/ratingfilter'
export default{
  props: {
    seller: {
      type: Object
    },
    ratings: {
    },
    goods: {
    }
  },
  components: {
    stars,
    shopcart,
    ratingfilter
  },
  filters: { // 数据处理、格式化
    formatDate: function (value) {
      var date = new Date(value)
      return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + '  ' + date.getHours() + ':' + date.getMinutes()
    }
  }
}
</script>


<style type="text/css" scoped>
::-webkit-scrollbar{
  display:none;
}
*{
	list-style: none;
}
.ratingPage{
  position: absolute;
  width: 100%;
  height: 75%;
  overflow: auto;
}
.part-1-buju{
	padding: 18px 0;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.topFixed{
  position: fixed;
}
.part1-left{
	display: inline-block;
	width: 40%;
	text-align: center;
	vertical-align: top;
}
.comparation{
	font-size: 10px;
	color: rgba(7,17,27,0.1);
	line-height: 10px;
	margin-top: 8px;
}
.seller-score{
	font-size: 24px;
	color:rgb(255,153,0);
	line-height: 28px;
}
.comparation{
	font-size: 10px;
	color:rgb(7,17,27);
	line-height: 10px;
}
.part1-right{
	display: inline-block;
	width: 50%;
	padding-left:10px;
	text-align: center;
	border-left: 1px solid rgba(7,17,27,0.1);
}
.foodscore,
.servicescore,
.deliveryTime{
	display: inline-block;
	font-size: 12px;
	color: rgb(7,17,27);
	line-height: 28px;
}
.stars{
	display: inline-block;
	margin-top: 0px;
	vertical-align: middle;
}
.score{
	font-size: 12px;
	color:rgb(255,153,0);
	line-height: 18px;
}
.part-1:after{
	display: block;
	width: 100%;
	height: 18px;
	background-color: rgb(243,245,247);
	content: '';
}
.part-2{
	border-bottom: 1px solid rgba(7,17,27,0.1); 
}
.part-2-top{
	margin: 18px 0 18px 18px;
	padding-bottom: 18px;
	border-bottom: 1px solid rgba(7,17,27,0.1); 
}
.button{
	float: left;
	width: 50px;
	height: 30px;
	background-color: pink;
	text-align: center;
	line-height: 30px;
	margin-right: 5px;
}
.selection{
	padding-left: 18px;
	color:rgb(147,153,159);
}
.icon-duihao{
	display: inline-block;
}
.part-2 :after{
	content: '';
	display: block;
	width: 100%;
	height: 1px;
	clear: both;
}

.rating{
	margin: 18px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.rating-top{
	position: relative;
}
.rating-avatar img{
	width: 28px;
	height: 28px;
	border-radius: 50%
}
.userinfo{
	display: inline-block;
}
.username{
	font-size: 10px;
	color:rgb(7,17,27);
	line-height: 12px;
}
.deliveryTime{
	font-size: 10px;
	font-weight: 200;
	color:rgb(147,153,159);
	line-height: 12px;
}
.ratetime{
	position: absolute;
	right:18px;
	top:0;
	font-size: 10px;
	font-weight: 200;
	color:rgb(147,153,159);
	line-height: 12px;
}
.rating-text{
	padding: 6px 0 8px 31px;
	font-size: 12px;
	line-height: 18px;
}
.rating-bottom{
	margin: 0px 0 18px 20px;
}
.recommend{
	display: inline-block;
	margin-left: 8px;
	font-size: 9px;
	color:rgb(147,153,159);
	line-height: 16px;
	border: 1px solid rgba(7,17,27,0.1);

}
</style>