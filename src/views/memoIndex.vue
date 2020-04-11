<template>

  <el-tabs id="memoOperation" style="height: 650px" type="border-card" :stretch="true">
    <el-tab-pane>
      <span slot="label"><i class="el-icon-s-flag">提醒</i></span>
      <remind/>
    </el-tab-pane>

    <el-tab-pane>
      <span slot="label"><i class="el-icon-present">生日</i></span>
      <birthday/>
    </el-tab-pane>

    <el-tab-pane>
      <span slot="label"><i class="el-icon-date">纪念日</i></span>
      <anniversary/>
    </el-tab-pane>

  </el-tabs>

</template>

<script>
  import remind from "../components/remind";
  import birthday from "../components/birthday";
  import anniversary from "../components/anniversary";

  export default {
    name: "memoIndex",
    components:{remind,birthday,anniversary}
  }
</script>

<style scoped>
  #memoOperation {
    margin-top: 20px;
  }
</style>
