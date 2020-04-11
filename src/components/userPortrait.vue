<template>
  <div>
    <div style="text-align: center">
    用户分布
    </div>
    <div style="text-align: center;margin-top: 20px">
      <el-progress type="circle" :percentage="this.boy" style="margin-right: 50px"/>
      <el-progress type="circle" :percentage="this.girl" color="pink"/>
    </div>
  </div>
</template>

<script>
  import user from "../api/user";

  export default {
    name: "userPortrait",
    data() {
      return {
        boy:'',
        girl:'',
      }
    },

    created() {
      this.loadUsersInfo();
    },

    methods:{
      loadUsersInfo(){
        user.getUsersInfo().then(res => {
          if (res.data.code === 0){
            console.log(res);
            this.boy = res.data.data;
            this.girl = 100 - this.boy;
          }
        })
      }
    }

  }
</script>

<style scoped>

</style>
