<template>
  <div>
    <el-card id="project">
      <el-button slot="header" type="success" @click="visible=true">新建项目</el-button>
      <!--      新建项目填写表单-->
      <el-dialog :visible.sync="visible" title="新建项目" width="400px" :center="true">
        <el-form
          id="new-box"
          status-icon
          :model="project"
          ref="projectForm"
          :rules="rules">

          <el-form-item prop="projectBody">
            <el-input v-model="project.projectBody" placeholder="请输入项目主题"/>
          </el-form-item>


          <el-form-item>
            <el-input type="textarea"
                      placeholder="请输入项目描述"
                      show-word-limit maxlength="300"
                      rows="11"
                      resize="none"
                      v-model="project.projectDesc"/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="newProject('projectForm')">保存</el-button>
            <el-button @click="resetForm('projectForm')">清空</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!--      ===================================================================-->
      <el-tabs style="height: 800px;text-align: center" type="card">


        <el-tab-pane>
          <span slot="label"><i class="el-icon-document">正在进行</i></span>
          <div id="projectList" v-model="projectList">
            <div v-for="project in projectList" style="margin: 18px">
              <todo-project-over-view
                :id="project.id"
                :body="project.projectBody"
                :desc="getDesc(project.projectDesc)"
                :update-time="project.updateTime"
                :create-time="project.createTime"/>
            </div>

            <!--    没有日记的情况-->
            <el-card shadow="hover" v-if="projectList.length<=0" style="margin: 20% auto;text-align: center">
              你还没有开始项目哦！
            </el-card>

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
        </el-tab-pane>


        <el-tab-pane>
          <span slot="label"><i class="el-icon-document-checked">已结束</i></span>
          <doneProject/>
        </el-tab-pane>

      </el-tabs>
    </el-card>

  </div>
</template>

<script>
  import doneProject from "./doneProject";
  import project from "../api/project";
  import todoProjectOverView from "./todoProjectOverView";

  export default {
    name: "todoProject",
    components: {doneProject, todoProjectOverView},
    data() {
      return {
        // 分页数据
        currentPage: 1,
        projectList: [],
        total: 0,
        pageSize: 4,
        projectState: 0,

        //  新建
        visible: false,
        project: {
          projectBody: '',
          projectDesc: ''
        },

        rules: {
          projectBody: [
            {required: true, message: '请输入主题', trigger: 'blur'}
          ],
        }
      }
    },

    //创建就执行
    created() {
      this.loadProject();
    },

    methods: {
      getDesc(desc) {
        return desc === null ? 'No description' : desc;
      },

      //页码更改事件处理
      currentChange(currentPage) {
        this.currentPage = currentPage;
        this.loadProject();
        scrollTo(0, 0);
      },

      //加载分页数据
      loadProject() {
        project.getProjectList(this.projectState, this.currentPage, this.pageSize).then(res => {
          let resData = res.data;
          this.total = resData.total;
          this.projectList = resData.list;
        })
      },

      newProject(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            project.newProject(this.project.projectBody, this.project.projectDesc).then(res => {
              this.$message.success(res.msg);
              this.visible = false;
              this.loadProject();
            })
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  #project {
    margin-top: 20px;
  }

  #new-box {
    text-align: center;
  }
</style>
