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
        <el-link class="el-icon-finished" style="margin:1px 0 0 60px; float: left" v-if="show" title="结束"
                 @click="finishProject(id)" :underline="false"/>
        <el-link class="el-icon-edit-outline" style="margin:1px 0 0 10px; float: left" v-if="show" title="修改"
                 @click="updateView=true" :underline="false"/>
        <el-link class="el-icon-delete" style="margin:1px 0 0 10px; float: left" v-if="show" title="删除"
                 @click="deleteProject(id)" :underline="false"/>
      </p>

    </div>


    <!--    修改框==========================================================================-->
    <el-dialog :visible.sync="updateView" title="修改项目" width="400px" style="text-align: center">
      <el-form status-icon
               :model="project"
               ref="updateForm"
               :rules="rules">
        <el-form-item prop="body">
          <el-input v-model="project.body" placeholder="请输入卡片内容"/>
        </el-form-item>

        <el-form-item>
          <el-input type="textarea"
                    placeholder="请输入项目描述"
                    show-word-limit maxlength="300"
                    rows="11"
                    resize="none"
                    v-model="project.desc"/>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="updateProject('updateForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

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
        show: false,
        updateView: false,

        project: {
          body: this.body,
          desc: this.desc,
        },

        rules: {
          body: [
            {required: true, message: '主题不能为空', trigger: 'blur'},
          ],
        }
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
            this.$message.success(res.msg);
            location.reload();
          })
        })
      },

      //结束项目
      finishProject(id) {
        this.$confirm('是否结束此项目？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          project.finishProject(id).then(res => {
            this.$message.success(res.msg);
            location.reload();
          })
        })
      },

      updateProject(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            project.updateProject(this.id, this.project.body, this.project.desc).then(res => {
              this.$message.success(res.msg);
              this.updateView = false;
              location.reload();
            });
          }
        });
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
