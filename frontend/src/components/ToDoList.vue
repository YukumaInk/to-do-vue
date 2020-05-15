<template>
  <div class="todoList">
    <div id="todo" v-for="(listToDo, i) in list" :key="i" @click="Completed(listToDo.isCompleted, listToDo._id, listToDo.name)" :class="toDoColor(listToDo.isCompleted)">
      <p id="todoName">{{ listToDo.name }}</p><button id="deleteButton" @click="deleteTodo(listToDo._id)" >X</button>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import EventBus from './EventBus'

export default {
  name: 'ToDoList',
  props:{
    list:Array,
    refreshList: Function,
  },
  data(){
    return{
      toDo: null
    }
  },
  methods: {
    toDoColor(isCompleted){
      //EventBus.numAll++
      if(isCompleted){
        //EventBus.numCompleted++
        return 'CompletedTodo'
      }
      else return 'IncompletedTodo'
    },
    async Completed(isCompleted, id, name){
      await Axios.put(`http://localhost:3030/todo/editar/${id}`, {"isCompleted":!isCompleted, "newName":name})
      this.refreshList()
    },
    async deleteTodo(id){
      await Axios.delete(`http://localhost:3030/todo/delete/${id}`)
      alert('To Do Deletado')
      this.refreshList()
    },
    refresh(){
      this.refreshList()
    }
  },
  updated() {
    EventBus.numAll = this.list.length
    EventBus.numCompleted = 0
    for(var i in this.list){
      if(this.list[i].isCompleted){
        EventBus.numCompleted++
      }
    }
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
#todo{
  display: flex;
  border-radius: 5px;
  width: 260px;
  height: 60px;
  margin: 10px auto;
}
.CompletedTodo{
   background: #42b983;
}
.IncompletedTodo{
   background: #b94242;
}
#deleteButton{
  width: 50px;
  height: 20px;
  border: none;
  background: none;
  font-size: x-large;
}
#todoName{
  margin: auto;
}
#deleteButton{
  margin-right: 5px;
  margin-top: 15px;
}
</style>
