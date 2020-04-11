<template>
  <div id="newDiary">
    <el-card v-model="diary" style="height: 800px">
      <el-input
        type="text"
        placeholder="请输入标题"
        v-model="diary.title"
        maxlength='100'
        show-word-limit/>
      <br/><br/>

      <mavon-editor
        ref=md
        @save="save()"
        v-model="diary.body"
        id="editor"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
        placeholder="请在此输入内容"/>

      <div style="text-align: center">
        <el-button style="margin: 3% auto;" type="success" round class="el-icon-document-checked"
                   @click="saveDiary()">
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
    name: "newDiary",
    data() {
      return {
        diary: {
          title: '',
          body: '',
          img_file: {}
        }

      }
    },

    methods: {
      saveDiary() {
        if (this.diary.title.length <= 0) {
          this.$message.error("标题不能为空");
        } else {
          diary.addDiary(this.diary.title, this.diary.body).then(res => {
            this.$message.success(res.msg);
            history.back();
          })
        }
      },

      cancel() {
        history.back();
      },

      save() {
        if (this.diary.title.length > 0 && this.diary.body.length > 0) {
          file.generateText(this.diary.title, this.diary.body + '\n' + new Date().toLocaleString());
        }
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
    },

  }
</script>

<style scoped>
  #newDiary {
    margin: 20px 5% 0 5%;
  }

  #editor {
    height: 600px;
  }
</style>
