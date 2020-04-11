<template>

  <div id="diaryIndex">
    <el-container>
      <el-main>
        <diaryList/>
      </el-main>

      <el-aside style="width: 20%;margin-left: 10px;height: 800px">
        <div style="margin-top: 40px">
          <el-button id="write" round type="success" icon="el-icon-edit" @click="writeDiary()">写日记</el-button>

          <el-card id="diaryArchive">
            <p>
              <span style="color: #67C23A" class="el-icon-document">日记归档</span>
            </p>
            <hr/>
            <div v-for="item in archive">
              <p style="margin: 5px;color: #909399">{{item.months}}：{{item.count}}篇</p>
            </div>
          </el-card>
        </div>
      </el-aside>
    </el-container>

  </div>
</template>

<script>
  import diaryList from "../components/diaryList";
  import diary from "../api/diary";

  export default {
    name: "diaryIndex",
    components: {diaryList},
    data() {
      return {
        archive: []
      }
    },

    created() {
      diary.getArchive().then(res => {
        this.archive = res.data.data;
      })
    },

    methods: {
      writeDiary() {
        this.$router.push("/newDiary")
      }
    }
  }
</script>

<style scoped>
  #diaryArchive {
    margin-top: 10px;
    text-align: center;
  }

  #write {
    width: 100%;
  }

  #diaryIndex {
    margin: auto 1%;
  }
</style>
