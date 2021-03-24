<template>
<div>
  <span @click="goHome" style="cursor: pointer;">首页</span>
  <el-dropdown size="small" class="avatar" trigger="click">
    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="loginOut">
        <i class="el-icon-switch-button" />
        注销
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    loginOut(){
      this.$axios.post('/logout',{})
      .then( (response)=> {
        if(response.data.status == 1){
          localStorage.setItem("token", '');
          this.$router.push("/login");
        }else{
          this.$message.error('登出失败')
        }
      })
      .catch( (err)=> {
        this.$message.error('服务器错误')
      });
    },
    goHome(){
      this.$router.push("/index");
    }
  }
}
</script>

<style  scoped>
.avatar{
  float: right;margin-top:10px
}
.login-out{
  float: right;
  margin: 10px 0 0 10px;
}
.el-popper{
  top: 53px !important;
}
</style>
