<template>
  <div id="diaryList" v-model="diaryList">
    <div v-for="diary in diaryList" style="margin: 18px">
      <!--      日记概览-->
      <diaryOverView
        :id="diary.id"
        :body="diary.diaryBody"
        :title="diary.diaryTitle"
        :update="getDatetime(diary.updateTime)"
        :time="getDatetime(diary.createTime)"/>
    </div>

    <!--    没有日记的情况-->
    <el-card shadow="hover" v-if="diaryList.length<=0" style="margin: 20% auto">你还没有日记哦！</el-card>

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
  import diaryOverView from "./diaryOverView";
  import date from "../utils/date";
  import diary from "../api/diary";

  export default {
    name: "diary",
    components: {diaryOverView},
    data() {
      return {
        currentPage: 1,
        diaryList: {},
        total: 0,
        pageSize: 5
      }
    },

    //创建就执行
    created() {
      this.loadDiary();
    },

    methods: {
      //转换时间戳
      getDatetime(timeStamp) {
        return date.myFormatByDatetime(timeStamp);
      },


      //页码更改事件处理
      currentChange(currentPage) {
        this.currentPage = currentPage;
        this.loadDiary();
        scrollTo(0, 0);
      },

      //加载分页数据
      loadDiary() {
        diary.getDiaryList(this.currentPage, this.pageSize).then(res => {
            let resData = res.data;
            this.total = resData.total;
            this.diaryList = resData.list;
        })
      },


    }
  }
</script>

<style scoped>
  #diaryList {
    text-align: center;
    margin-top: -13px;
  }
</style>
