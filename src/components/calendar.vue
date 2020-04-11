<template>
  <el-card id="cal">
    <el-calendar v-model="myDate">
    </el-calendar>
  </el-card>

</template>

<script>
  export default {
    name: "calendar",
    data() {
      return {
        myDate: new Date()
      }
    }
  }
</script>

<style scoped>
  #cal {
    text-align: center;
    margin-top: 20px;
  }
</style>
