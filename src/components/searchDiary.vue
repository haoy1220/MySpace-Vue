<template>
  <div id="searchDiary">
    <p style="display: none">{{searchText = this.$route.params.searchText}}</p>
    <el-card shadow="hover" v-if="diaryList.length<=0" style="margin: 20% auto">暂无符合条件的内容</el-card>
    <div v-for="diary in diaryList" style="margin: 24px" :key="diary.id">
      <!--      日记概览-->
      <diaryOverView
        :id="diary.id"
        :body="diary.diaryBody"
        :title="diary.diaryTitle"
        :update="getDatetime(diary.updateTime)"
        :time="getDatetime(diary.createTime)"/>
    </div>

    <div v-if="diaryList.length>0">
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
  import date from "../utils/date";
  import diary from "../api/diary";
  import diaryOverView from "./diaryOverView";

  export default {
    name: "searchDiary",
    components: {diaryOverView},
    data() {
      return {
        searchText: '',
        total: 0,
        diaryList: [],
        pageSize: 5,
        currentPage: 1,
      }
    },

    watch: {
      searchText() {
        this.loadDiary();
      }
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
        diary.searchDiary(this.searchText, this.currentPage, this.pageSize).then(res => {
          let resData = res.data;
          this.$message.success("查询成功，共"+ resData.total +"篇");
          this.total = resData.total;
          this.diaryList = resData.list;
        }).catch((e) => {});
      },


    }
  }
</script>

<style scoped>
  #searchDiary {
    text-align: center;
    margin: 0 5% 0 5%;
  }
</style>
