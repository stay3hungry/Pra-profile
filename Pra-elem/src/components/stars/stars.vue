<template>
<div class="stars" :class="starSize">
	<span v-for="item in items" :class="item" class="commonStyle">
	</span>
</div>
</template>

<script type="text/javascript">
var length = 5
var classOn = 'on'
var classHalf = 'half'
var classOff = 'off'

export default{
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: { // 对象属性数据计算
    starSize () {
      return 'star-' + this.size
    },
    items () {
      var result = []
      var score = Math.round(this.score * 2) / 2
      var integer = Math.floor(score)
      var decimal = score % 1
      for (var i = 0; i < integer; i++) {
        result.push(classOn)
      }
      if (decimal) {
        result.push(classHalf)
      }
      while (result.length < length) {
        result.push(classOff)
      }
      return result // 一定要return ！！！  计算值一定要return出来
    }
  }
}
</script>

<style type="text/css">
.star-48 .commonStyle{
	display: inline-block;
	height: 20px;
	width: 20px;
	margin-right: 22px;
	background-size: 20px 20px; /*背景图片   一定要设置背景大小 否则没有容器大小不显示*/
}
.star-48 .commonStyle:last-child{
	margin-right: 0
}
.star-48 .on{
	background-image: url('star48_on@3x.png')
}
.star-48 .half{
	background-image: url('star48_half@3x.png')
}
.star-48 .off{
	background-image: url('star48_off@3x.png')
}


.star-36 .commonStyle{
  display: inline-block;
  height: 15px;
  width: 15px;
  margin-right: 3px;
  background-size: 15px 15px; /*背景图片   一定要设置背景大小 否则没有容器大小不显示*/
}
.star-36 .commonStyle:last-child{
  margin-right: 0
}
.star-36 .on{
  background-image: url('star36_on@2x.png')
}
.star-36 .half{
  background-image: url('star36_half@2x.png')
}
.star-36 .off{
  background-image: url('star36_off@2x.png')
}
</style>  