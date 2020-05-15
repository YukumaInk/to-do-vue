<template>
  <div id="app">
    <ProgressBar />
    <ToDoInput :refreshList="refreshList"/>
    <ToDoList 
      :list="toDo" 
      :refreshList="refreshList" 
    />
  </div>
</template>

<script>
import ToDoList from './components/ToDoList.vue'
import ToDoInput from './components/ToDoInput.vue'
import ProgressBar from './components/ProgressBar.vue'
import Axios from 'axios'

export default {
  name: 'App',
  components: {
    ToDoList,
    ToDoInput,
    ProgressBar
  },
  data(){
    return{
      toDo:null,
    }
  },
  methods: {
    async refreshList(){
      const list= await Axios.get('http://localhost:3030/todo')
      this.toDo = list.data
    }
  },
  mounted() {
    this.refreshList()
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
