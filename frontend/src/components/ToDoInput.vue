<template>
  <div class="todoList">
    <input id="box" type="text" v-model="textBox" @keypress.enter="addToDo()" >
    <input id="buttonBox" type="button" value="+" @click="addToDo()" >
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'ToDoInput',
  props: {
      refreshList: Function,
  },
  data(){
      return{
          textBox:""
      }
  },
  methods: {
    async addToDo(){
        await Axios.post('http://localhost:3030/todo', { "name":this.textBox })
        this.refreshList()
        this.textBox = ""
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#box{
    width:440px;
    height: 30px;
    border-radius: 5px 0 0 5px;
    border:solid 1px;
    text-align: center;
}
#buttonBox{
    height: 34px;
    width: 40px;
    border-radius: 0 5px 5px 0;
    border: solid 1px;
}
</style>
