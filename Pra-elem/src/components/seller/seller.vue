<template>
<div class="seller">
	<div class="part-1">
		<div class="intro">
			<p class="sellername">
				{{seller.name}}
			</p>
			<p class="stars">
				<stars :score="seller.score" :size="36"></stars> 
				<span class="ratingcount">({{seller.ratingCount}})</span>
				<span class="sellCount">月售{{seller.sellCount}}单</span>
			</p>
			<div class="favourite">
				<p class="fav-icon">
					<i class="iconfont icon-shoucang"></i>
				</p>
				<p class="fav-text">已收藏</p>
			</div>
		</div>
		<div class="info">
			<span class="sellerinfo info-border">
				<p class="info-name">起送价</p>
				<span class="info-data">{{seller.minPrice}}</span>
				<span class="info-unit">元</span>
			</span>
			<span class="sellerinfo info-border">
				<p class="info-name">商家配送</p>
				<span class="info-data">{{seller.minPrice}}</span>
				<span class="info-unit">元</span>
			</span>
			<span class="sellerinfo">
				<p class="info-name">平均配送时间</p>
				<span class="info-data">{{seller.deliveryTime}}</span>
				<span class="info-unit">分钟</span>
			</span>
		</div>
	</div>
	<div class="part-2">
		<div class="part-2-buju">
			<div>
				<p>公告与活动</p>
				<p class="bulletin-content">{{seller.bulletin}}</p>
			</div>
			<ul>
				<li v-for="(item,index) in seller.supports" class="bulletin-list">
					<span :class="classArr[seller.supports[index].type]" class="bulletin-icon"></span>
					<span class="bulletin">{{item.description}}</span>
				</li>
			</ul>
		</div>	
	</div>
	<div class="part-3">
		<div class="part-3-buju">
			<p>商家实景</p>
			<ul class="seller-pics">
				<li v-for="pic in seller.pics" class="seller-pic">
					<img :src="pic" width="120" height="90">
				</li>
			</ul>
		</div>
	</div>
	<div class="part-4">
		<p class="info-title">商家信息</p>
		<ul>
			<li v-for="info in seller.infos" class="more-sellerinfo">
				{{info}}
			</li>
		</ul>
	</div>
</div>
</template>

<script type="text/javascript">
import stars from '../stars/stars'
import shopcart from '../shopcart/shopcart'
export default{
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  created () {
    this.classArr = ['manjian', 'discount', 'taocan', 'fapiao', 'baozhang']
  },
  components: {
    stars,
    shopcart
  }
}
</script>


<style type="text/css" scoped>
@import '../shopcart/iconfont.css';
*{
	list-style: none;
}
::-webkit-scrollbar{
  display:none;
}
.seller{
  position: absolute;
  width: 100%;
  height: 75%;
  overflow: auto;
}
.intro{
	margin:18px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
	position: relative;
}
.intro:after{
	display: block;
	clear: both;
	content: ''
}
.sellername{
	font-size: 14px;
	color: rgb(7,17,27);
	line-height:14px;
}
.stars{
	float: left;
	margin: 8px 8px 10px 0;
}
.ratingcount{
	display: inline-block;
	margin-right:12px;
	font-size: 10px;
	color: rgb(77,85,93);
	line-height: 36px;
}
.sellCount{
	font-size: 10px;
	color: rgb(77,85,93);
	line-height: 36px;
}
.favourite{
	position: absolute;
	right:18px;
	top:0;
}
.fav-icon{
	display: inline-block;
	width: 100%;
	text-align: center;
	color: rgb(240,20,20);
	line-height: 24px;
}
.icon-shoucang{
	font-size: 24px;
}
.fav-text{
	font-size: 10px;
	color: rgb(77,85,93);
	line-height: 20px;
}
.info{
	display: flex;
	padding-bottom: 18px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
	margin-left: 0px;
}
.sellerinfo{
	flex: 1;
	text-align: center;
}
.info-border{
	border-right:1px solid rgba(7,17,27,0.1);
}
.info-name{
	font-size: 10px;
	color:rgb(147,153,159);
	line-height: 10px;
	margin-bottom: 4px;
}
.info-data{
	font-size: 24px;
	color:rgb(7,17,27);
	line-height: 24px;
}
.info-unit{
	font-size: 10px;
	color:rgb(7,17,27);
	line-height: 24px;
}
.part-1:after{
	display: block;
	width: 100%;
	height: 18px;
	background-color: rgb(243,245,247);
	content: ''
}
.part-2-buju{
	border-top: 1px solid rgba(7,17,27,0.1);
	border-bottom: 1px solid rgba(7,17,27,0.1);
	padding:18px;
}
.bulletin-content{
	font-size: 12px;
	font-weight: 200;
	color:rgb(240,20,20);
	line-height: 24px;	
	margin:0 0 16px 12px;
}
.bulletin-list{
	padding: 16px 12px; 
	border-top: 1px solid rgba(7,17,27,0.1);
}
.bulletin-icon{
	display: inline-block;
	width: 16px;
	height: 16px;
	background-size: 16px 16px;
}
.manjian{
	background-image: url('../header/decrease_1@2x.png')
}
.discount{
	background-image: url('../header/discount_1@2x.png')
}
.taocan{
	background-image: url('../header/special_1@2x.png')
}
.fapiao{
	background-image: url('../header/invoice_1@2x.png')
}
.baozhang{
	background-image: url('../header/guarantee_1@2x.png')
}
.bulletin{
	font-size: 12px;
	font-weight: 200;
	color: rgb(7,17,27,);
	line-height: 16px;
	vertical-align: top;
}
.part-2:after{
	display: block;
	width: 100%;
	height: 18px;
	background-color: rgb(243,245,247);
	content: ''
}
.part-3-buju{
	padding: 18px 0 18px 18px;
	border-top:1px solid rgba(7,17,27,0.1); 
	border-bottom: 1px solid rgba(7,17,27,0.1);
	white-space: nowrap
}
.seller-pics{
	width: 100%;
	height: 120px;
	margin-top: 12px;
	overflow: auto;
}
.seller-pic{
	display: inline-block;
	height: 90px;
	width: 120px;
	margin-right: 10px;
	border-radius: 6px;
	overflow: hidden;
}
.part-3:after{
	display: block;
	width: 100%;
	height: 18px;
	background-color: rgb(243,245,247);
	content: ''
}
.part-4{
	padding: 18px 0 18px 18px;
	border-top:1px solid rgba(7,17,27,0.1); 
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.info-title{
	padding:12px 0;
}
.more-sellerinfo{
	padding: 16px 12px;
	border-top:1px solid rgba(7,17,27,0.1);
	font-size: 12px;
	font-weight: 200;
	color:rgb(7,17,27);
	line-height: 16px;
}
</style>

