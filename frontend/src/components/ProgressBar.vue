<template>
  <div>
    <p id="percent">{{ percent }}%</p> 
    <div class="ProgressBar">
        <div id="progress" :style="sizeProgressBar" ></div>
    </div>
  </div>
</template>

<script>
import EventBus from './EventBus'

export default {
  name: 'ProgressBar',
  computed: {
      sizeProgressBar: function(){
          const barwidth = ( EventBus.numCompleted /EventBus.numAll)*480
          return `width: ${barwidth}px`
      }
  },
  data(){
      return{
          percent: null,
      }
  },
  updated() {
      this.percent = (100 * EventBus.numCompleted /EventBus.numAll).toPrecision(4)
  },
  mounted() {
      this.percent = (100 * EventBus.numCompleted /EventBus.numAll).toPrecision(4)
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
.ProgressBar{
    width: 480px;
    height: 30px;
    background: none;
    border: 1px black;
    border-style: solid;
    border-radius: 5px;
    margin: 50px auto;
}
#progress{
    height: 30px;
    width: 0;
    background: #42b983;
    border-radius: 5px;
}
#percent{
    margin: 8px auto;
}
</style>
