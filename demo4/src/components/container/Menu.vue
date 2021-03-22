<template>
    <el-row>
  <el-col>
    <el-menu router
      default-active="1"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>信息录入</span>
        </template>
        <el-menu-item-group >
          <router-link to='/progress' target="_blank" >
          <el-menu-item >信息录入</el-menu-item>
          </router-link>
          <el-menu-item index="/list">查看录入人员信息</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
        <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>需求管理</span>
        </template>
        <el-menu-item-group >
          <el-menu-item index="/analysisIndex">需求信息</el-menu-item>
          <el-menu-item index="/addAnalysis">添加新需求</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>


      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </el-col>
  </el-row>
</template>
<script>
export default {
    name : 'Menu',
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style>
a{
   text-decoration:none;
}
</style>
