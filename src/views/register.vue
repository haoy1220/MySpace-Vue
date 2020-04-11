<template>
  <div>
    <el-form :model="userForm" status-icon :rules="rules" ref="registerForm" label-width="80px" class="register-box"
             hide-required-asterisk="true">

      <h1 class="welcome">
        欢迎注册
      </h1>

      <el-form-item prop="email" label="邮箱">
        <el-input type="text" placeholder="请输入邮箱" v-model="userForm.email"/>
      </el-form-item>

      <el-form-item prop="nickname" label="昵称">
        <el-input type="text" v-model="userForm.nickname" placeholder="请输入昵称（1~15个字符）"/>
      </el-form-item>

      <el-form-item prop="pass" label="密码">
        <el-input type="password" v-model="userForm.pass" autocomplete="off" placeholder="请输入密码"/>
      </el-form-item>

      <el-form-item prop="checkPass" label="确认密码">
        <el-input type="password" v-model="userForm.checkPass" autocomplete="off" placeholder="再次输入密码"/>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="userForm.sex">
          <el-radio label="男"/>
          <el-radio label="女"/>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="register('registerForm')" class="button">完成提交</el-button>
        <el-button @click="resetForm('registerForm')" class="button">清空</el-button>
      </el-form-item>

      <el-form-item label-width="220px">
        <el-link href="Login" target="_self" type="primary" :underline="false">已有账号？返回登录</el-link>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  import user from "../api/user";

  export default {
    name: "register",
    data() {
      let checkEmail = (rule, value, callback) => {
        user.checkEmail(value).then(res => {
          callback();
        })
      };
      let validatePass = (rule, value, callback) => {
        if (this.userForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass');
        }
        callback();
      };
      let validatePass2 = (rule, value, callback) => {
        if (value !== this.userForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        userForm: {
          email: '',
          nickname: '',
          pass: '',
          checkPass: '',
          sex: ''
        },
        rules: {
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'},
            {validator: checkEmail, trigger: 'blur'}
          ],
          nickname: [
            {required: true, message: '请输入昵称（1~15个字符）', trigger: 'blur'},
            {min: 1, max: 15, message: '昵称应在1~15个字符之间', trigger: 'blur'}
          ],
          pass: [
            {required: true, message: '请输入密码(最少6位)', trigger: 'blur'},
            {min: 6, message: '请输入6位以上的密码', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {required: true, message: '请再次输入密码确认', trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请确认你的性别', trigger: 'change'}
          ]
        }
      };
    },
    methods: {
      register(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            user.register(this.userForm.email, this.userForm.nickname, this.userForm.checkPass, this.userForm.sex).then(res => {
              this.$message.success(res.msg);
              this.$router.push("/login");
            })
          }
        })
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

    },

  }
</script>

<style scoped>
  .register-box {
    width: 360px;
    margin: 50px auto;
    border: 1px solid #DCDFE5;
    padding: 35px;
    border-radius: 5px;
    box-shadow: 0 0 25px #DCDFE5;
  }

  .welcome {
    text-align: center;
  }

  .button {
    width: 132px;
  }

</style>
