<template>
 <div class="header" v-if="seller.supports"> <!--没有v-if会因为数据没有加载就解析而报错-->
	<div class="top">
		<div class="avatar"> 
			<img :src="seller.avatar">
		</div>
		<div class="info">
			<div class="title">
				<span class="brand"></span>
				<span class="name">{{seller.name}}</span>
			</div>
			<div class="transport">
				{{seller.description}}/{{seller.deliveryTime}}分钟送达
			</div>
			<div class="sales">
				<span class="icon" :class="classArr[seller.supports[0].type]"></span>
				<span class="content">
					{{seller.supports[0].description}}
				</span>
			</div>
		</div>
		<div class="moreinfo" @click="showDetails">
			{{seller.supports.length}}个 >
		</div>
	</div>
	<div class="bottom" @click="showDetails">
		<span class="notice"></span>
		<span class="notice-content">
			{{seller.bulletin}}
		</span>
		<span class="arrow">></span>
	</div>
	<div class="background">
		<img :src="seller.avatar">
	</div>
	<transition name="fade">  <!--过渡动画-->
		<div class="details" v-show="isShow">
			<div class="content-wrap">
				<h1 class="detail-name">
					{{seller.name}}
				</h1>
				<span class="stars">
					<stars :score="seller.score" :size="48"></stars>    <!--组件需要的数据，引用时传入！！！     -->
				</span>

				<div class="detail-title">
					<span class="detail-title-line"></span>
					<span>商家优惠</span>
					<span class="detail-title-line"></span>
				</div>
				<ul class="sales-details">
					<li v-for="(list,index) in seller.supports">
						<span class="details-icon" :class="classArr[seller.supports[index].type]"></span>

						<span class="details-description">{{seller.supports[index].description}}</span>
					</li>
				</ul>
				<div class="detail-title">
					<span class="detail-title-line"></span>
					<span>商家公告</span>
					<span class="detail-title-line"></span>
				</div>
				<div class="seller-details">
					{{seller.bulletin}}
				</div>
			</div>
			<div class="details-footer">
				<span @click="hideDetails">X</span>
			</div>
		</div>
	</transition>
 </div>
</template>

<script type="text/javascript">
import stars from '../stars/stars' // 引入stars组件

export default{
  props: {
    seller: {
      type: Object
    }
  },
  created () {
    this.classArr = ['manjian', 'discount', 'taocan', 'fapiao', 'baozhang']
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    showDetails: function () {
      this.isShow = true
    },
    hideDetails: function () {
      this.isShow = false
    }
  },
  components: {
    stars
  }
}
</script>


<style type="text/css"> /*没有scoped，导致影响部分其他页面*/
*{
	margin:0;
	padding: 0;
	box-sizing: border-box;
}
.header{
	color:#FFF;
	position: relative;
	background-color: rgba(7,17,27,0.4);
	overflow: hidden;
}
.top{
	padding: 24px 12px 0 24px;
	position: relative
}
.avatar,.info{
	display: inline-block;
}
.avatar{
	vertical-align: top;
}
.avatar img{
	width: 64px;
	height: 64px;
	border-radius: 2px;
}
.info{
	margin-left: 16px;
}
.title{
	margin: 2px 0 8px 0;
}
.brand{
	display: inline-block;
	width:30px;
	height: 18px;
	background-size: 30px 18px;
	background-repeat: no-repeat;
}
@media (-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2){
	.brand{
		background-image: url('brand@2x.png')
	}
}
@media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
	.brand{
		background-image: url('brand@3x.png')
	}
}      /* 利用@media 媒体查询，根据设备dpr，加载不同图片 */
.name{
	margin-left: 6px;
	font-size: 16px;
	line-height: 18px;
	font-weight: bold;
	vertical-align: top;
}
.transport{
	margin-bottom: 10px;
	line-height: 12px;
	font-size: 12px;
	font-weight: 200;
}
.sales{
	margin-top: 10px;
}
.icon{
	width: 14px;
	height: 14px;
	display: inline-block;
	margin-right: 4px;
	background-size: 14px 14px;
	vertical-align: top;
}
.manjian{
	background-image: url('decrease_1@2x.png')
}
.discount{
	background-image: url('discount_1@2x.png')
}
.taocan{
	background-image: url('special_1@2x.png')
}
.fapiao{
	background-image: url('invoice_1@2x.png')
}
.baozhang{
	background-image: url('guarantee_1@2x.png')
}
.content{
	font-size: 10px;
	font-weight: 200;
	line-height: 12px;
	vertical-align: top
}
.moreinfo{
	width: 48px;
	height: 24px;
	position: absolute;
	right: 12px;
	bottom: 20px;
	font-size: 10px;
	line-height: 24px;
	font-weight: 200;
	background-color: rgba(0,0,0,0.2);
	vertical-align:center;
	text-align: center;
	border-radius: 14px
}
.bottom{
	height: 28px;
	width: 100%;
	overflow: hidden;
	line-height: 28px;
	white-space: nowrap;
	text-overflow: ellipsis;
	padding-right: 30px;
	background-color: rgba(7,17,27,0.2)
}
.notice{
	display: inline-block;
	height: 12px;
	width: 22px;
	background-image: url('bulletin@2x.png');
	background-size: 22px 12px;
	background-repeat: no-repeat;
	margin-left:10px;
	margin-top: 9px;
}
.notice-content{
	font-size: 10px;
	font-weight: 200;
	vertical-align: top;
}
.arrow{
	position: absolute;
	right: 18px;
}
.background{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
	filter: blur(10px);
}
.background img{
	width:100%;
	height: 100%
}
.details{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(7,17,27,0.8);
	z-index: 20;
	color: #FFF;
	overflow: auto;
}
/*     stickfooter:   */
.content-wrap{
	min-height: 100%;
	margin-bottom: -100px;
	padding-bottom: 100px;
}
.detail-name{
	display: inline-block;
	width: 100%;
	margin-top: 64px;
	font-size:16px;
	font-weight: 700;
	line-height: 32px;
	text-align: center;
}
.details-footer{
	position: relative;
	width: 100%;
	height: 100px;
	font-size: 36px;
	text-align: center;
}
.stars{
	text-align: center;
	margin-top: 16px;
}
.detail-title{
	width: 80%;
	margin: 28px auto 0 auto;
	text-align: center;
	font-size: 14px;
	font-weight: 700;
	line-height: 14px;
	display: flex;
}
.detail-title span{
}
.detail-title-line{
	border-bottom: 1px solid rgba(255,255,255,0.2);
	flex: 1;
	position: relative;
	top:-6px;
}
.sales-details{
	margin: 24px 0 0 48px;
	font-size: 12px;
	line-height: 12px;
}
.sales-details li{
	display: block;
	width: 100%;
	margin-bottom: 12px;
}
.details-icon{
	display: inline-block;
	width: 16px;
	height: 16px;
	background-size: 16px 16px;
}
.details-description{
	vertical-align: top;
}
.seller-details{
	font-size: 12px;
	font-weight: 200;
	line-height: 24px;
	padding: 24px 48px 0 48px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
</style>