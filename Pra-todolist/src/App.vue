<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{title}}</h1>
    <input id="addtodo" v-model="newtodo" placeholder="what needs to be done?" v-on:keyup.enter="addNew">
    <ul>
      <li v-for="todo in todos" 
          v-bind:class="{done: todo.isFinished}" 
          v-on:click="toggle(todo)" 
          v-on:dblclick="editTodo(todo)" 
          v-on:mouseover="Show(todo)"
          v-on:mouseout="changeShow(todo)">

      <div>
        <label v-show="todo.isShow">
          {{todo.content}}
        </label>
        <div class="deleteTodo" 
            v-on:click.stop="deleteTodo(todo)"
            v-show="todo.show">
          X
        </div>
      </div>

      <input class="edit" 
            v-show="!todo.isShow"  
            v-model="todo.content"  
            @keydown.enter="editDone(todo)"
            @keydown.esc= "cancelEdit(todo)"
            @blur="editDone(todo)" 
            @click.stop="justClick" 
            v-focus="!todo.isShow" > 
      </li>
    </ul>
  </div>
</template>



<script>
import Storage from './localstorage.js'
export default {
  name: 'app',
  data: function () {
    return {
      title: 'todos',
      todos: Storage.fetch(), // 数组容器-读取之前的localstorage
      newtodo: '', // 新增项
      judgement: null // keydown和blur的控制器
    }
  },
  methods: {
    toggle: function (list) {
      list.isFinished = !list.isFinished
    },
    addNew: function () {
      this.todos.push({ // 把值加入数组中
        content: this.newtodo,
        isFinished: false,
        isShow: true,
        show: false
      })
      this.newtodo = '' // 每次enter，清空文本框内值
    },
    deleteTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1) // 删除当前选项
    },
    editTodo: function (todo) {
      todo.isShow = !todo.isShow
      todo.contentCache = todo.content // 保存编辑之前的值
    },
    editDone: function (todo) {
      todo.isShow = true // 直接赋值 keyup会触发blur事件，避免执行结果改变
      if (this.judgement === 1) { // 如果函数已经执行过一遍，则清除控制器、return false
        this.judgement = null
        return false
      }
      todo.content = todo.content.trim() // 去除字符串左右空格
      if (!todo.content) {
        this.deleteTodo(todo)
      }
      this.judgement = 1 // 如果函数是第一次执行，添加控制器，阻止再次执行
    },
    cancelEdit: function (todo) {
      todo.content = todo.contentCache // 还原edit之前的值
      todo.isShow = true
    },
    Show: function (todo) {
      todo.show = true
    },
    changeShow: function (todo) {
      todo.show = false
    }
  },
  watch: {
    todos: { // 监听数组变化
      handler: function (val) {
        Storage.save(val) // 保存新数组
      },
      deep: true
    }
  },
  directives: { // 自定义focus组件
    focus: function (el, {value}) { // 直接调用  而不是inserted插入父节点时
      if (value) {
        el.focus()
      }
    }
  }
}
</script>


<!--     todolist总结

html片：

<h1>title</h1>
<input v-model>
<ul>
  <li v-for>
    <div>
      <label>todo.content</label>
      <div>X<div>
    </div>
  </li>
</ul>



js部分

name:
data:{    data 应该只能是数据 - 不推荐观察拥有 状态行为的对象。
          组件的定义只接受 function    data: function () { return {} }
}，

methods:{  事件涉及的属性数据
  action: function ([todo]) {
    ...
  }
}，

watch:{}，

directives:{}

-->


<style>
body{
  display: flex;
  justify-content: center;
  align-items: center;
}
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#app h1{color: pink;font-size: 60px;}
#addtodo{width: 500px; height: 50px;border-radius: 10px;}
#addtodo::-webkit-input-placeholder{color: pink;font-size: 30px;}

#app li{font-size:50px;text-align: left;position: relative;}
#app li .deleteTodo{position: absolute;right:0;font-size: 30px;top:20px;cursor: pointer;}
.done{text-decoration: line-through;color: pink;}
.height: {height: 80px;}
.edit{height: 50px;position: absolute;top:5px;font-size: 30px;}
.deleteTodo{margin-top: -5px;}
</style>
