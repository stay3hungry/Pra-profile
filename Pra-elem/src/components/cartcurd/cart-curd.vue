<template>
<div>
  <span class="decreasefood"  @click.stop="decreasefood()" v-if="food.count">
    <i class="iconfont icon-jianshao1"></i>
  </span>
  <span class="eachcount" v-if="food.count">{{food.count}}</span>
  <span class="addfood" @click.stop="addfood()">
    <i class="iconfont icon-yijianfenxiaotianjia"></i>
  </span>  
</div>
</template>

<script type="text/javascript">
import vue from 'vue'
export default{
  props: {
    food: {
    }
  },
  methods: {
    addfood: function () {
      if (!this.food.count) {
        vue.set(this.food, 'count', 1)
      } else {
        this.food.count ++
      }
    },
    decreasefood: function () {
      this.food.count --
    }
  }
}
/* 因为cartcurd 与 shopcart组件 同为父子、兄弟关系，数据传递问题，更改方案，  直接修改food的json数据。  （或者把选择的数组存储到 localstorage 中）
var allselectedfood = []
var nameStrings = []
export default{
  props: {
    food: {
    }
  },
  data () {
    return {
      totalprice: 0,
      number: 0
      // eachcount: 0
    }
  },
  methods: {
    addfood: function (name, price) {
      this.totalprice = 0
      // this.eachcount = 0
      this.number = 0
      nameStrings = []
      var eachselected = {'name': name, 'price': price, 'count': 1}
      if (allselectedfood.length === 0) {
        allselectedfood.push(eachselected)
        nameStrings.push(eachselected.name) // 每次selectedfood push之后，nameStrins也要push，保证减少时可以找到name对应的对象
        // this.eachcount = 1
      } else {
        for (var i = 0; i < allselectedfood.length; i++) {
          nameStrings.push(allselectedfood[i].name)
        }
        if (nameStrings.indexOf(name) !== -1) {
          allselectedfood[nameStrings.indexOf(name)].count++
          // this.eachcount = allselectedfood[nameStrings.indexOf(name)].count
        } else {
          allselectedfood.push(eachselected)
          nameStrings.push(eachselected.name)
          // this.eachcount = 1
        }
      }
      for (var j = 0; j < allselectedfood.length; j++) {
        this.number += allselectedfood[j].count
        this.totalprice += allselectedfood[j].count * allselectedfood[j].price
      }
    },
    decreasefood: function (name, price) {
      allselectedfood[nameStrings.indexOf(name)].count --
      // this.eachcount = allselectedfood[nameStrings.indexOf(name)].count
      var _count = 0
      var _totalprice = 0
      for (var i = 0; i < allselectedfood.length; i++) {
        _count += allselectedfood[i].count
        _totalprice += allselectedfood[i].price * allselectedfood[i].count
      }
      this.number = _count
      this.totalprice = _totalprice
    },
    trans: function () {
      this.$emit('transferUser', this.totalprice, this.number, allselectedfood)
    }
  },
  computed: {
    _eachcount: function () {
      if (allselectedfood.length === 0) {
        return 0
      } else {
        return allselectedfood[nameStrings.indexOf(this.food.name)].count
      }
    }
  }
}
*/
</script>

<style scoped>
.decreasefood{
  width: 18px;
  height: 18px;
  font-size: 24px;
  line-height: 24px;
  color: rgb(0,160,220)
}
.addfood{
  width: 18px;
  height: 18px;
  font-size: 24px;
  line-height: 24px;
  color: rgb(0,160,220)
}
.eachcount{
  font-size: 10px;
  color: rgb(147,153,159);
  line-height: 24px;
}
</style>