<template>
  <div>
    <p class="title">商品评价</p>
    <div class="filter">
      <span class="allratings" @click="showAll">全部{{ratings.length}}</span> <!-- 评价数量通过 rateType属性进行计算 -->
      <span class="recommend" @click="showRecommend">推荐{{recLength}}</span>
      <span class="tucao" @click="showTucao">吐槽{{tucaoLength}}</span>
    </div>
    <span class="isOnlyContent" @click="onlyContent"> <!-- click改变数据，调整li的v-show显示条件 -->
      <i class="iconfont icon-duihao" :class="iconActive"></i>
      <span class="only-content">只看有内容评价</span>
    </span>

    <ul>
      <li v-for="item in ratings" class="each-rating" v-if="selection.indexOf(item.rateType) !=-1" v-show="item.text.length > contentStandard">   <!-- rateType 判断显示 (是否在数组中)-->
        <span class="rating-top">
          <span class="time">{{item.rateTime | formatDate}}</span>
          <span class="user">
            <span class="username">{{item.username}}</span>
            <span>
              <img :src="item.avatar" class="user-avater">
            </span>   
          </span>
        </span>
        <div class="rating-content">
          <i :class="classArr[item.rateType]"></i> <!-- 根据rateType，绑定不同classname -->
          <span class="ratingtext">
            <span v-if="!item.text">(并没有发表评价内容...)</span>
            {{item.text}}
          </span>
        </div>   
      </li>
    </ul>
  </div>
</template>


<script type="text/javascript">
export default{
  props: {
    ratings: {
    }
  },
  data () {
    return {
      classArr: ['iconfont icon-haoping', 'iconfont icon-bad'],
      selection: [0, 1],
      contentStandard: -1,
      iconActive: ''
    }
  },
  filters: {
    formatDate: function (value) {
      var date = new Date(value)
      return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + '  ' + date.getHours() + ':' + date.getMinutes()
    }
  },
  methods: {
    showAll: function () { // rateType 取值0 和1
      this.selection = [0, 1]
    },
    showRecommend: function () { // rateType = 0
      this.selection = [0]
    },
    showTucao: function () { // rateType = 1
      this.selection = [1]
    },
    onlyContent: function () {
      if (this.contentStandard === -1) {
        this.contentStandard = 0
        this.iconActive = 'icon-active'
      } else {
        this.contentStandard = -1
        this.iconActive = ''
      }
    }
  },
  computed: {
    recLength: function () { // 计算各类评价数量
      var recArr = []
      for (var i = 0; i < this.ratings.length; i++) {
        if (this.ratings[i].rateType === 0) {
          recArr.push(this.ratings[i])
        }
      }
      return recArr.length
    },
    tucaoLength: function () {
      return this.ratings.length - this.recLength
    }
  }
}
</script>

<style type="text/css" scoped>
 *{
  margin: 0;
  padding: 0;
  list-style: none
}
.title{
  padding: 18px;
}
.filter{
  margin-left: 18px;
 padding-bottom: 18px;
  border-bottom: 1px solid rgba(7,17,27,0.1)
}
.allratings,.recommend,.tucao{
  display: inline-block;
  height: 32px;
  width: 75px;
  border-radius: 2px;
  font-size: 12px;
  text-align: center;
  line-height: 16px;
  padding: 8px 12px;
}
.allratings{
  color: #fff;  
  background-color: rgb(0,160,220);
}
.recommend{
  color: rgb(77,85,93);
  background-color: rgba(0,160,220,0.2);
  margin-left: 8px;
}
.tucao{
  color: rgb(77,85,93);
  background-color: rgba(77,85,93,0.2);
  margin-left: 8px;
}
.isOnlyContent{
  display: inline-block;
  width: 100%;
  padding: 12px 18px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.icon-duihao{
  font-size: 24px;
  color: rgb(147,153,159);
  line-height: 24px;
}
.icon-active{
  color: rgb(0,160,220)
}
.only-content{
  display: inline-block;
  font-size: 12px;
  color: rgb(147,153,159);
  line-height:24px;
  padding-left: 4px;
}
.each-rating{
  margin: 16px 18px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.time{
  font-size: 10px;
  color: rgb(147,153,159);
  line-height: 12px;
}
.user{
  display: inline-block;
  float: right;
}
.username{
  font-size: 10px;
  color: rgb(147,153,159);
  line-height: 12px;
}
.user-avater{
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-left: 6px;
}
.rating-content{
  padding:6px 0 16px 0;
}
.icon-haoping{
  font-size: 12px;
  color: rgb(0,160,220);
  line-height: 24px;
}
.icon-bad{
  font-size: 12px;
  color: rgb(147,153,159);
  line-height: 24px;
}
.ratingtext{
  font-size: 12px;
  color: rgb(7,17,27);
  line-height: 16px;
}
</style>