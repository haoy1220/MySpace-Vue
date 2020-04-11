<template>
  <div id="index">
    <el-container>
      <el-header height="80px">
        <bar/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>
        <bottom/>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
  import bar from '../components/bar'
  import bottom from "../components/bottom";

  export default {
    name: "index",
    components: {bar, bottom}
  }
</script>

<style scoped>
</style>
