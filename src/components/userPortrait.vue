<template>
  <div>
    <div style="text-align: center">
      用户分布
    </div>
    <div style="width:50% ;text-align: center;margin-top: 20px;float: left">
      <i>男</i>
      <el-progress type="circle" :percentage=this.boy style="margin-right: 50px"/>
    </div>
    <div style="width:50% ;text-align: center;margin-top: 20px;float: right">
      <i>女</i>
      <el-progress type="circle" :percentage=this.girl color="pink"/>
    </div>
  </div>
</template>

<script>
  import user from "../api/user";

  export default {
    name: "userPortrait",
    data() {
      return {
        boy: '',
        girl: '',
      }
    },

    created() {
      this.loadUsersInfo();
    },

    methods: {
      loadUsersInfo() {
        user.getUsersInfo().then(res => {
          this.boy = res.data;
          this.girl = 100 - this.boy;
        })
      }
    }

  }
</script>

<style scoped>

</style>
