<template>
  <div>
    <el-card id="diary">

      <el-link :underline="false" @click="back()"><i class="el-icon-back">Back</i></el-link>
      <!--      为了id改变会被watch到-->
      <p style="display: none">{{id = this.$route.params.id}}</p>

      <div id="title">
        <h2 style="text-align: center">{{diaryTitle}}</h2>
      </div>

      <div style="text-align: center">
        <p>
          <span class="el-icon-time hidden-xs-only" style="width: 30%">修改时间：{{getDatetime(updateTime)}}</span>
          <span class="el-icon-time hidden-xs-only" style="width: 30%">创建时间：{{getDatetime(createTime)}}</span>
        </p>
      </div>

      <mavon-editor v-model="diaryBody" id="editor" :toolbarsFlag="false" :subfield="false" defaultOpen="preview"/>
    </el-card>
  </div>
</template>

<script>
  import date from "../utils/date";
  import diary from "../api/diary";

  export default {
    name: "diary",
    data() {
      return {
        id: -1,
        diaryTitle: '',
        diaryBody: '',
        createTime: '',
        updateTime: ''
      }
    },

    watch: {
      id() {
        this.loadDiary();
        let w = document.documentElement.offsetWidth || document.body.offsetWidth;
        if (w < 768) {
          document.getElementById('editor').style.margin = '0 -4.5%';
          document.getElementById('diary').style.margin = '20px 0 0 0';
          document.getElementById('diary').style.margin = '0';
        }
      }
    },

    methods: {
      //转换时间戳
      getDatetime(timeStamp) {
        return date.myFormatByDatetime(timeStamp);
      },


      loadDiary() {
        diary.getDiaryById(this.id).then(res => {
          this.diaryTitle = res.data.data.diaryTitle;
          this.diaryBody = res.data.data.diaryBody;
          this.updateTime = res.data.data.updateTime;
          this.createTime = res.data.data.createTime;
        })
      },

      back() {
        history.back();
      }

    }
  }
</script>

<style scoped>
  #diary {
    margin: 20px 5% 0 5%;
    padding: 20px;
    text-align: left;
  }
</style>
