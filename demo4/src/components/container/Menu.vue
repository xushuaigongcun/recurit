<template>
  <el-row>
    <el-col>
      <el-menu
        router
        :default-active="defaultActive"
        @open="handleOpen"
        @close="handleClose"
      >

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>招聘中心</span>
          </template>
          <router-link to="/progress" target="_blank">
            <el-menu-item>信息录入</el-menu-item>
          </router-link>
          <el-menu-item index="/list">查看录入人员信息</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>需求管理</span>
          </template>
          <el-menu-item index="/analysisIndex">需求信息</el-menu-item>
          <el-menu-item index="/addAnalysis">添加新需求</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item index="/jurisdiction">菜单权限</el-menu-item>
          <el-menu-item index="/">用户权限</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "Menu",
  data(){
    return {
      defaultActive: '/index'
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style>
a {
  text-decoration: none;
}
</style>
