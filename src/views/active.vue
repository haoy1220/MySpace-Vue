<template>

  <div class="tips" >
    <h1 v-show="!activeSuccess">
      正在激活，请稍等......
    </h1>
    <el-link href="register" type="primary" v-show="!activeSuccess">激活失败点这里！！！</el-link>
    <h1 v-show="activeSuccess">
      激活成功，请返回登录！
    </h1>
    <el-link href="login" type="primary" v-show="activeSuccess">点击返回登录！！！</el-link>
  </div>

</template>

<script>
  import user from "../api/user";

  export default {
    name: "active",
    data() {
      return {
        activeSuccess: '',
      }
    },
    created: function () {
      this.active();
    },
    methods: {
      active: function () {
        user.active(this.$route.query.id,this.$route.query.activeCode).then(res => {
            this.activeSuccess = true;
        })
      }
    }
  }
</script>

<style scoped>
  .tips {
    margin: 250px auto;
    text-align: center;
    width: 450px
  }
</style>
