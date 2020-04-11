<template>
  <div>
    <el-form ref="loginFrom" :model="userForm" class="login-box" status-icon :rules="rules">

      <h1 class="welcome">
        欢迎登录
      </h1>

      <el-form-item prop="email">
        <el-input prefix-icon="el-icon-user" type="text" placeholder="请输入邮箱" v-model="userForm.email"/>
      </el-form-item>

      <el-form-item prop="password">
        <el-input prefix-icon="el-icon-lock" type="password" placeholder="请输入密码" v-model="userForm.password"/>
      </el-form-item>

      <el-form-item>
        <el-button class="button" type="primary" @click="userLogin('loginFrom')">立即登录</el-button>
      </el-form-item>

      <el-form-item>
        <el-link href="/forget" target="_parent" type="primary" :underline="false" style="float: right">忘记密码？</el-link>
        <el-link href="/register" target="_parent" type="primary" :underline="false" style="float: left">立即注册</el-link>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import user from "../api/user";

  export default {
    name: "login",
    data() {
      return {
        userForm: {
          email: '',
          password: ''
        },
        rules: {
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      userLogin(Formname) {
        this.$refs[Formname].validate((valid) => {
          if (valid){
            user.login(this.userForm.email, this.userForm.password).then(res => {
                this.$store.commit('login',res.data);
                this.$message.success(res.msg);
                this.$router.push('/calendar')
            });
          }
        })
      }
    }
  }
</script>

<style scoped>
  .login-box {
    width: 300px;
    margin: 120px auto;
    border: 1px solid #DCDFE5;
    padding: 35px;
    border-radius: 5px;
    box-shadow: 0 0 25px #DCDFE5;
  }

  .button {
    width: 300px;
  }

  .welcome {
    text-align: center;
  }

</style>
