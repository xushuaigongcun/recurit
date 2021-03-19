<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in items" :key="item">
      <img :src='item'/>
    </el-carousel-item>
  </el-carousel>
</template>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
<script>
export default {
    data(){
        return {
            items:[
                require('@/assets/1.png'),
                require('@/assets/2.png'),
                require('@/assets/3.png'),
                require('@/assets/4.png'),
                require('@/assets/5.png')
            ]
        }
    }
    
}
</script>