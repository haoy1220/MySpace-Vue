<template>
  <div>
    <!--展示表格-->
    <el-table :data="userList" style="width: 100%;">
      <el-table-column type="index" :index="indexMethod()"/>
      <el-table-column label="邮箱" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column label="昵称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sex === 1 ? "男" : "女" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="激活状态" align="center">
        <template slot-scope="scope">
          <span>{{ showState(scope.row.activeState) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="上次登录时间" align="center">
        <template slot-scope="scope">
          <span>{{ getDatetime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="进站时间" align="center">
        <template slot-scope="scope">
          <span>{{ getDatetime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      <div>
        <!--    没有数据的情况-->
        <el-card shadow="hover" v-if="userList.length<=0" style="margin: 20% auto">还没有普通用户注册哦！</el-card>
      </div>
    </el-table>


    <!--    分页-->
    <div>
      <!--      分页-->
      <el-pagination
        :page-size="pageSize"
        background
        layout="total,prev,pager,next,jumper"
        :total="total"
        @current-change="currentChange"
        :current-page="currentPage"
        @prev-click="--currentPage"
        @next-click="++currentPage"
        :hide-on-single-page="true">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import user from "../api/user";
  import date from "../utils/date";

  export default {
    name: "userManagement",
    data() {
      return {
        userList: [],
        //分页
        pageSize: 7,
        total: 0,
        currentPage: 1,
      };
    },
    created() {
      this.loadUsers();
    },

    methods: {
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          user.deleteUser(row).then(res => {
            this.$message.success(res.msg);
            this.loadUsers();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      getDatetime(timestamp) {
        return date.myFormatByDatetime(timestamp);
      },
      showState(state) {
        return state === 1 ? "已激活" : "未激活";
      },

      //页码更改事件处理
      currentChange(currentPage) {
        this.currentPage = currentPage;
        scrollTo(0, 0);
      },

      loadUsers() {
        user.getUsers(this.currentPage, this.pageSize).then(res => {
          this.userList = res.data.list;
          this.total = res.data.total;
        })
      },

      //表格索引
      indexMethod(index) {
        return 1 + (this.currentPage - 1) * this.pageSize;
      }
    },

  }
</script>

<style scoped>

</style>
