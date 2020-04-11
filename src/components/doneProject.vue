<template>

  <div id="projectList" v-model="projectList">
    <div v-for="project in projectList" style="margin: 18px">
      <done-project-over-view
        :id="project.id"
        :body="project.projectBody"
        :desc="getDesc(project.projectDesc)"
        :update-time="project.updateTime"
        :create-time="project.createTime"/>
    </div>

    <!--    没有日记的情况-->
    <el-card shadow="hover" v-if="projectList.length<=0" style="margin: 20% auto;text-align: center">
      你还没有结束的项目哦！
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
</template>

<script>
  import project from "../api/project";
  import doneProjectOverView from "./doneProjectOverView";

  export default {
    name: "doneProject",
    components: {doneProjectOverView},
    data() {
      return {
        // 分页数据
        currentPage: 1,
        projectList: {},
        total: 0,
        pageSize: 4,
        projectState: 1,//0-正在进行，1-已结束
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
          if (res.data.code === 0) {
            let resData = res.data.data;
            this.total = resData.total;
            this.projectList = resData.list;
          }
        })
      },

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
