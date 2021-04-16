<template>
  <div id="mallhome">
    <FunctionNav></FunctionNav>
    <OperationContainer></OperationContainer>
  </div>
</template>

<script>
import FunctionNav from './FunctionNav';
import OperationContainer from './OperationContainer';
export default {
  name: 'MallHome',
  components:{
    FunctionNav,
    OperationContainer
  }
}
</script>

<style>
html,body{height:100%;overflow:hidden;}
#mallhome {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  height:100%;
}
#functionNav{
    width:200px;
    height:100%;
    text-align: left;
    border-color: #333333;
    border-width: 1px;
    border-style: solid;
    float: left;
}
#operationContainer{
  display:flex;
  flex-direction: column;
  height:100%;
  overflow: auto;
  margin-left:200px;
  border-color: #333333;
  border-width: 1px;
  border-style: solid;
  /* padding-left: 20px;
  padding-right: 20px; */
}
</style>
