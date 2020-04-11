<template>
  <el-card id="projectOverView">

    <div>
      <el-link :underline="false" @click="router(id)">
        <h3 id="content">{{body}}</h3>
      </el-link>
      <p style="float: right">
        {{desc}}
      </p>

    </div>

    <div @mouseenter="pEnter()" @mouseleave="pLeave()">
      <p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">

        <span class="el-icon-time hidden-xs-only"
              style="float: left">更新：{{getDatetime(updateTime)}}&#12288; &#12288;</span>
        <span class="el-icon-time hidden-xs-only" style="float: left">创建：{{getDatetime(createTime)}} </span>

        <el-link class="el-icon-delete" style="margin:1px 0 0 60px; float: left" v-if="show" title="删除"
                 @click="deleteProject(id)" :underline="false"/>
      </p>

    </div>


  </el-card>
</template>

<script>
  import date from "../utils/date";
  import project from "../api/project";

  export default {
    name: "diaryOverView",
    //绑定数据
    props: ['id', 'body', 'createTime', 'updateTime', 'desc'],
    data() {
      return {
        show: false
      }
    },


    methods: {
      getDatetime(timestamp) {
        return date.myFormatByDatetime(timestamp)
      },

      router(id) {
        scrollTo(0, 0);
        this.$router.push({
          path: '/project/' + id
        })
      },

      pEnter() {
        this.show = true;
      },

      pLeave() {
        this.show = false;
      },


      //删除项目
      deleteProject(id) {
        this.$confirm('是否删除此项目？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          project.deleteProject(id).then(res => {
            this.$message.success(res.data.msg);
            location.reload();
          })
        })
      },

    }
  }
</script>

<style scoped>
  #projectOverView {
    text-align: left;
    /*margin: 50px;*/
    padding: 5px 10px;
  }

  #content {
    color: black;
    transition: all 0.2s linear;
  }

  #content:hover {
    color: #409EFF;
    transition: all 0.2s linear;
  }

</style>
