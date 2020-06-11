<template>
  <div id="admin">
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick" style="height: 650px">
        <el-tab-pane label="用户管理" name="first">
          <user-management/>
        </el-tab-pane>


        <el-tab-pane label="用户画像" name="third">
          <user-portrait/>
        </el-tab-pane>

      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import userManagement from "../components/userManagement";
  import UserPortrait from "../components/userPortrait";
  import Config from "../components/config";

  export default {
    name: "admin",
    components: {Config, UserPortrait, userManagement},
    data() {
      return {
        activeName: 'first',
      };
    },

    methods: {
      handleClick(tab, event) {
      },
    }
  };
</script>

<style scoped>
  #admin {
    margin-top: 20px;
  }
</style>
