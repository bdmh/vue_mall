<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body{height:100%;overflow:hidden;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  height:100%;
}
.h-center{
    position: absolute;
    left: 50%;   
    transform: translate(-50%);
  }
.clickable{
  cursor: pointer;
}
.toolbar{
  padding: 10px;
  background-image: linear-gradient(to bottom,#9ec4e7,#d0e0ec);
}
</style>
