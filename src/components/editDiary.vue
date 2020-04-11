<template>
  <div id="editDiary">
    <!--    响应id变化-->
    <p style="display: none">{{id = this.$route.params.id}}</p>

    <el-card style="height: 800px">
      <el-input
        type="text"
        placeholder="请输入标题"
        v-model="diaryTitle"
        maxlength='100'
        show-word-limit/>
      <br/><br/>

      <mavon-editor
        ref=md
        @save="save()"
        v-model="diaryBody"
        id="editor"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
        placeholder="请在此输入内容"/>

      <div style="text-align: center">
        <el-button style="margin: 3% auto;" type="success" round class="el-icon-document-checked"
                   @click="updateDiary()">
          保存
        </el-button>

        <el-button round class="el-icon-document-delete" @click="cancel()">
          取消
        </el-button>
      </div>

    </el-card>
  </div>
</template>

<script>
  import diary from "../api/diary";
  import file from "../utils/file";

  export default {
    name: "editDiary",
    data() {
      return {
        diaryTitle: '',
        diaryBody: '',
        img_file: {},
        id: -1
      }
    },

    watch: {
      id() {
        diary.getDiaryById(this.id).then(res => {
          this.diaryTitle = res.data.diaryTitle;
          this.diaryBody = res.data.diaryBody;
        })
      }
    },

    methods: {
      save() {
        if (this.diaryTitle.length > 0 && this.diaryBody.length > 0) {
          file.generateText(this.diaryTitle, this.diaryBody + '\n' + new Date().toLocaleString());
        }
      },

      updateDiary() {
        if (this.diaryTitle.length <= 0) {
          this.$message.error("标题不能为空");
        } else {
          diary.updateDiary(this.id, this.diaryTitle, this.diaryBody).then(res => {
            this.$message.success(res.msg);
            history.back();
          })
        }
      },

      cancel() {
        history.back();
      },

      $imgAdd(pos, $file) {
        let formData = new FormData();
        formData.append('file', $file);
        diary.uploadImg(formData).then(res => {
          this.$refs.md.$img2Url(pos, res.data);
        })
      },

      $imgDel(pos) {
        delete this.img_file[pos];
      }
    }
  }
</script>

<style scoped>
  #editDiary {
    margin: 20px 5% 0 5%;
  }

  #editor {
    height: 600px;
  }
</style>
