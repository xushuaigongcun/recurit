<template>
  <el-container>
  <el-header><Photo /> </el-header>
  <el-container>
    <el-aside width="200px"><Menu /></el-aside>
    <el-container>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</el-container>
</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-footer {
    text-align: center;
    height: 500px !important;
  }

  .el-aside {
    line-height: 500px;
  }

  .el-main {

    text-align: center;

  }

  body > .el-container {
    margin-bottom: 40px;
  }


</style>
<script>
import Menu from './container/Menu'
import Photo from './container/Photo'
  export default {
  components: {Menu,Photo},
  name:'Home'

  };
</script>
