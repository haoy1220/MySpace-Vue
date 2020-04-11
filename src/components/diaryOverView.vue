<template>
  <el-card id="diaryOverView">

    <div>
      <el-link :underline="false" @click="router(id)">
        <h3 id="title">{{title}}</h3>
      </el-link>
    </div>

    <div id="body" @mouseenter="pEnter()" @mouseleave="pLeave()">
      {{tranBody(body)}}
    </div>

    <div @mouseenter="pEnter()" @mouseleave="pLeave()">
      <p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">

        <span class="el-icon-time hidden-xs-only" style="float: left">最后修改：{{update}}&#12288; &#12288;</span>
        <span class="el-icon-time hidden-xs-only" style="float: left">创建：{{time}} </span>
        <el-link class="el-icon-edit-outline" style="margin:1px 0  0 100px; float: left" v-if="show" @click="editDiary(id)"
                 title="编辑" :underline="false"/>
        <el-link class="el-icon-delete" style="margin:1px 20px; float: left" v-if="show" title="删除"
                 @click="deleteDiary(id)" :underline="false"/>
      </p>

    </div>


  </el-card>
</template>

<script>
  import diary from "../api/diary";

  export default {
    name: "diaryOverView",
    //绑定数据
    props: ['id', 'title', 'body', 'time', 'update'],
    data() {
      return {
        show: false
      }
    },


    methods: {
      //将数据库中带标签的博文转换为纯文本
      tranBody(body) {
        let newBody = body.replace(new RegExp('#', 'g'), "");
        newBody = newBody.replace(new RegExp('!\\[.*]\\(.*\\)', 'g'), '[图片]');
        newBody = newBody.replace(new RegExp('\\[.*]\\(.*\\)', 'g'), '[链接]');
        newBody = newBody.replace(new RegExp('-', 'g'), '');
        newBody = newBody.replace(new RegExp('>', 'g'), '');
        newBody = newBody.replace(new RegExp('`', 'g'), '');
        return newBody;
      },

      router(id) {
        scrollTo(0, 0);
        this.$router.push({
          path: '/diary/' + id
        })
      },

      pEnter() {
        this.show = true;
      },

      pLeave() {
        this.show = false;
      },

      editDiary(id) {
        this.$router.push({
          path: '/editDiary/' + id
        })
      },

      deleteDiary(id) {
        this.$confirm('是否删除此博客？', '提示', {
          confirmButtonText: '',
          cancelButtonText: '',
          type: 'warning'
        }).then(() => {
          diary.deleteDiary(id).then(res => {
            this.$message.success(res.msg);
            location.reload();
          })
        })
      },


    }
  }
</script>

<style scoped>
  #diaryOverView {
    text-align: left;
    /*margin: 50px;*/
    padding: 5px 10px;
  }

  #title {
    color: black;
    transition: all 0.2s linear;
  }

  #title:hover {
    color: #409EFF;
    transition: all 0.2s linear;
  }

  #body {
    font-size: 14px;
  }

  a {
    text-decoration: none;
  }
</style>
