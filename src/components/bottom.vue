<template>
    <div id="bottom">
      <div class="line"></div>
      <p id="text">
        <el-link :underline="false" type="info" href="http://www.beian.miit.gov.cn/">© 2020 MySpace<br/>互联网ICP备案：粤ICP备20004671号</el-link>
      </p>
    </div>
</template>

<script>
    export default {
        name: "bottom"
    }
</script>

<style scoped>
  .line {
    width: 100%;
    height: 2px;
  }
  #bottom {
    color: #303133;
    /*background: #F2F6FC;*/
    margin: 2px 2px 2px 2px;
    text-align: center;
  }
</style>
