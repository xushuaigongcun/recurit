<template>
  <div class="page-login">
    <div class="logo_shadow">
      <!-- form表单 -->
      <div class="page-login--form">
        <el-card shadow="never">
          <div style="display: flex;justify-content: center;">
            <img class="page-login--logo" src="../../assets/images/login/logo.png">
          </div>

          <el-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin" size="default">
            <el-form-item prop="username">
              <el-input type="text" v-model="formLogin.username" placeholder="用户名">
                <i slot="prepend" class="el-icon-user"></i>
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input type="password" v-model="formLogin.password" placeholder="密码">
                <i slot="prepend" class="el-icon-lock"></i>
              </el-input>
            </el-form-item>

            <el-button size="default" @click="submit" type="primary" class="button-login">
              登录
            </el-button>
          </el-form>
        </el-card>
      </div>
    </div>

    <!-- 版权信息 -->
    <div class="page-login--content-footer">
      <p class="page-login--content-footer-copyright">
       Copyright &copy; 2021 comzen
      </p>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      // 表单
      formLogin: {
        username: 'admin',
        password: '123456'
      },
      // 表单校验
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
    }
  },
  methods: {


    // 提交登录信息
    submit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 登录
          // this.login({
          //   userAccount: this.formLogin.username,
          //   userPassword: this.formLogin.password,
          //   to: this.$route.query.redirect || '/'
          // })
          sessionStorage.setItem("token", 'true');
          this.$router.push({path: "/index"});
        } else {
          // 登录表单校验失败
          this.$message.error('表单校验失败，请检查')
        }
      })
    }
  }
}
</script>

<style lang="scss"scoped>

.page-login{
  background: url('../../assets/images/login/login.jpg') no-repeat;
  background-size: cover;
  height: 100%;
  position: relative;
// 层
  .page-login--layer {
    overflow: auto;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }

  // main
  .page-login--content-main {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;

    .logo_shadow {
      box-shadow: 0px 0px 10px 15px rgba(255, 255, 255, 0.349019607843137);
      padding: 50px;
      background: #fff;
      border-radius: 4px;
      margin: 40px;
    }
  }
  .page-login--logo {
    width: 240px;
    margin-bottom: 2em;
  }
  // 登录表单
  .page-login--form {
    position: absolute;
    width: 380px;
    float: right;
    top: 50%;
    margin-top: -187px;
    margin-right: 40px;
    right: 0;
    // 卡片
    .el-card {
      margin-bottom: 15px;
      border: none;
      padding: 20px;
    }
    // 登录按钮
    .button-login {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      color: #409EFF;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .page-login--quick {
      width: 100%;
    }
  }
  // 快速选择用户面板
  .page-login--quick-user {
    padding: 10px 0px;
    border-radius: 4px;
    &:hover {
      background-color: red;
      i {
        color: green;
      }
      span {
        color: green;
      }
    }
    i {
      font-size: 36px;
      color: yellow;
    }
    span {
      font-size: 12px;
      margin-top: 10px;
      color: yellow;
    }
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    clear: both;
    position: fixed;
    bottom: 0;
    left: 50%;
    margin-left: -101px;
    .page-login--content-footer-copyright{
      color: #fff;
    }
  }
}
</style>
