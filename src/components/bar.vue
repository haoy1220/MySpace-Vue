<template>
  <el-card id="bar">
    <div>
      <el-row>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          :router="true"
          mode="horizontal"
          @select="handleSelect()"
          style="width: 100%">

          <el-menu-item index="/calendar" route="/calendar">首页</el-menu-item>
          <el-menu-item index="/diaryIndex" style="margin-left: 2%" route="/diaryIndex">日记</el-menu-item>
          <el-menu-item index="/memoIndex" style="margin-left: 2%" route="/memoIndex">备忘录</el-menu-item>
          <el-menu-item index="/projectIndex" style="margin-left: 2%" route="/projectIndex">项目管理</el-menu-item>

          <!--          先浮动的靠右-->
          <el-submenu style="float: right" :router="true" class="hidden-xs-only" index="">
            <!--          <el-submenu class="hidden-xs-only" index="5" v-if=this.test :router="true">-->
            <template slot="title">【 {{this.$store.state.nickname}} 】</template>

            <el-menu-item @click="(looked = true) & getUserInfo()">
              <i class="el-icon-user"/>
              个人资料
            </el-menu-item>

            <el-menu-item v-show="admin" index="/admin" route="/admin">
              <i class="el-icon-star-off"/>
              后台管理
            </el-menu-item>

            <el-menu-item @click="logout()">
              <i class="el-icon-switch-button"/>
              退出登录
            </el-menu-item>
          </el-submenu>

          <div
            style="margin: 10px 20% 0 60%"
            class="hidden-xs-only">
            <el-input placeholder="搜索日记" v-model="searchText" suffix-icon="el-icon-search"
                      @keyup.enter.native="search()"/>
          </div>

          <el-dialog
            :title=userForm.email
            :visible.sync='looked'
            :close-on-click-modal=false
            center
            width="25%">
            <el-form status-icon :rules="rules" :model="userForm" ref="updateForm" :hide-required-asterisk=true>
              <el-form-item label="昵称" prop="nickname">
                <el-input type="text" v-model='userForm.nickname'/>
              </el-form-item>


              <el-form-item label="性别" >
                <el-radio-group v-model="userForm.sex" :disabled=true>
                  <el-radio label="男"/>
                  <el-radio label="女"/>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="最近登录时间">
                <el-input type="text" v-model='userForm.updateTime' :disabled="true"/>
              </el-form-item>

              <el-form-item label="进站时间">
                <el-input type="text" v-model='userForm.createTime' :disabled="true"/>
              </el-form-item>
              <!--              value-format="yyyy-MM-dd HH:mm:ss"-->
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary"
                         @click="updateUserInfo('updateForm')">确 定</el-button>
              <el-button @click="looked = false">取 消</el-button>
            </span>
          </el-dialog>

        </el-menu>
      </el-row>
    </div>


  </el-card>
</template>

<script>
  import user from "../api/user";
  import date from "../utils/date";

  export default {
    name: "bar",
    data() {
      return {
        activeIndex: '/calendar',//默认选择第一页，首页
        searchText: '',//搜索框
        looked: false,
        admin: localStorage.getItem('role') === '1',
        userForm: {
          email: '',
          nickname: '',
          sex: '',
          createTime: '',
          updateTime: '',
        },

        rules: {
          nickname: [
            {required: true, message: '昵称不能为空', trigger: 'blur'},
          ],
        }
      };
    },


    watch: {
      // 监控当前页面path，防止刷新页面显示错误
      '$route.path': {
        deep: true,
        immediate: true,
        handler(to, from) {
          this.activeIndex = to
        }
      }
    },

    methods: {
      getDatetime(timestamp) {
        return date.myFormatByDatetime(timestamp);
      },

      handleSelect(key, keyPath) {
        if (key != null && key !== '') {
          this.activeIndex = key
        }
      },

      search() {
        if (this.searchText.length <= 0)
          return;
        this.$router.push({ //路由跳转
          path: '/searchDiary/' + this.searchText
        });
        // this.searchText = '';//清空搜索框
      },

      logout() {
        this.$confirm('你将退出网站，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$store.commit('logout');
          this.$message.success('退出登录成功！');
          this.$router.push('/login');
        })
      },

      getUserInfo() {
        user.getUserInfo(this.$store.state.email).then(res => {
            let resDate = res.data;
            this.userForm.email = resDate.email;
            this.userForm.nickname = resDate.nickname;
            this.userForm.sex = resDate.sex === 1 ? "男" : "女";
            this.userForm.createTime = this.getDatetime(resDate.createTime);
            this.userForm.updateTime = this.getDatetime(resDate.updateTime);
        })

      },

      updateUserInfo(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (this.userForm.nickname !== this.$store.state.nickname ) {
              user.updateUserInfo(this.userForm.email, this.userForm.nickname).then(res => {
                  this.$store.commit('refreshNickname', res.data.nickname);
                  this.$message.success(res.msg);
                  this.looked = false;
              })
            }else {
              this.looked = false;
            }
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
