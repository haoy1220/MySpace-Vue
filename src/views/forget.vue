<template>
  <div>
    <el-form :model="userForm" :rules="rules" ref="forgetForm" class="forget-box">

      <h1 class="welcome">
        找回密码
      </h1>

      <el-form-item prop="email">
        <el-input type="text" placeholder="请输入邮箱" v-model="userForm.email"/>
      </el-form-item>

      <el-form-item>
        <el-input v-model="userForm.verifyCode" type="text" placeholder="请输入验证码" prop="verifyCode" style="width: 59%"/>
        <el-button v-show="userForm.show" @click="sendMail()"
                   style="width: 37%;float: right;text-align: center;padding-left:0 ;padding-right: 0" type="success"
                   round>
          获取邮箱验证码
        </el-button>
        <el-button v-show="!userForm.show"
                   style="width: 37%;float: right;text-align: center;padding-left:0 ;padding-right: 0" type="info" round
                   disabled="true">{{this.userForm.count}}s后可重新获取
        </el-button>
      </el-form-item>

      <el-form-item prop="pass">
        <el-input type="password" v-model="userForm.pass" autocomplete="off" placeholder="请输入新密码"/>
      </el-form-item>

      <el-form-item prop="checkPass">
        <el-input type="password" v-model="userForm.checkPass" autocomplete="off" placeholder="再次输入新密码"/>
      </el-form-item>


      <el-form-item class="">
        <el-button type="primary" @click="forget()" class="button">确认修改</el-button>
      </el-form-item>

      <el-form-item label-width="220px">
        <el-link href="login" target="_self" type="primary" :underline="false">返回登录</el-link>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  import user from "../api/user";

  export default {
    name: "forget",
    data() {
      let validatePass = (rule, value, callback) => {
        if (this.userForm.checkPass !== '') {
          this.$refs.forgetForm.validateField('checkPass');
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
          pass: '',
          verifyCode: '',
          checkPass: '',
          show: true,  // 初始启用按钮
          count: '',   // 初始化次数
          timer: null,
        },
        rules: {
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'},
          ],
          verifyCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
          ],
          pass: [
            {required: true, message: '请输入密码(最少6位)', trigger: 'blur'},
            {min: 6, message: '请输入6位以上的密码', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {required: true, message: '请再次输入密码确认', trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      };
    },

    methods: {
      forget() {
        user.forget(this.userForm.email, this.userForm.checkPass, this.userForm.verifyCode).then(res => {
          this.$message.success(res.msg);
          this.$router.push("/login");
        });
      },

      sendMail() {
        user.verifyEmail(this.userForm.email).then(res => {
          this.$message.success(res.msg);
        });
        const TIME_COUNT = 60;
        if (!this.userForm.timer) {
          this.userForm.count = TIME_COUNT;
          this.userForm.show = false;
          this.userForm.timer = setInterval(() => {
            if (this.userForm.count > 0 && this.userForm.count <= TIME_COUNT) {
              this.userForm.count--;
            } else {
              this.userForm.show = true;
              clearInterval(this.userForm.timer);
              this.userForm.timer = null;
            }
          }, 1000)
        }
      },

    },
  }
</script>

<style scoped>
  .forget-box {
    width: 300px;
    margin: 80px auto;
    border: 1px solid #DCDFE5;
    padding: 35px;
    border-radius: 5px;
    box-shadow: 0 0 25px #DCDFE5;
  }

  .welcome {
    text-align: center;
  }

  .button {
    width: 300px;
  }


</style>
