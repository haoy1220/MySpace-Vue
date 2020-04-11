<template>

  <div id="remind">
    <!--展示表格-->
    <el-table :data="remindList" style="width: 100%;">
      <el-table-column type="index" :index="indexMethod()"/>
      <el-table-column label="预定发送时间" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ getDatetime(scope.row.memoDate) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="预定发送邮箱" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.memoEmail }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发送的内容" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.memoContent }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ getDatetime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" style="width: 5%">
        <template slot-scope="scope">
          <span>{{ getState(scope.row.memoState) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" style="width: 10px">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      <div>
        <!--    没有数据的情况-->
        <el-card shadow="hover" v-if="remindList.length<=0" style="margin: 20% auto">你还没有提醒哦！</el-card>
      </div>
    </el-table>


    <!--    分页-->
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


    <div id="newRemind">

      <el-button type="success" @click="visible=true">新建</el-button>

      <!--新增-->
      <el-dialog :visible.sync="visible" title="新建提醒" width="400px" :center="true">
        <el-form
          class="new-box"
          status-icon
          :model="remind"
          ref="remindForm"
          :rules="rules">

          <el-form-item prop="memoEmail">
            <el-input v-model="remind.memoEmail" placeholder="请输入预定发送的邮箱"/>
          </el-form-item>


          <el-form-item prop="memoDate">
            <el-col>
              <el-date-picker
                v-model="remind.memoDate"
                type="datetime"
                placeholder="选择预定发送的日期时间"
                :picker-options="pickerOptions"
                style="width: 100%"
                value-format="timestamp"/>
            </el-col>
          </el-form-item>

          <el-form-item prop="memoContent">
            <el-input type="textarea"
                      placeholder="请输入预定发送的内容"
                      show-word-limit maxlength="300"
                      rows="11"
                      resize="none"
                      v-model="remind.memoContent"/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addRemind('remindForm')">保存</el-button>
            <el-button @click="resetForm('remindForm')">清空</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

  </div>


  <!--  新建窗口-->


</template>

<script>
  import memo from "../api/memo";
  import date from "../utils/date";
  import user from "../api/user";

  export default {
    name: "remind",
    data() {
      return {
        //分页
        pageSize: 7,
        total: 0,
        currentPage: 1,
        remindList: [],

        //新建窗口可视
        visible: false,

        remind: {
          memoEmail: '',
          memoDate: '',
          memoContent: "",
        },

        rules: {
          memoEmail: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
          ],
          memoDate:[
            {required: true, message: '请选择提醒时间', trigger: 'blur'},
          ],
          memoContent:[
            {required: true, message: '请输入提醒内容', trigger: 'blur'},
          ]
        },

        pickerOptions: {
          //禁用日期
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
      }
    },

    created() {
      this.loadRemind();
    },

    methods: {
      getDatetime(timeStamp) {
        return date.myFormatByDatetime(timeStamp);
      },

      getState(state) {
        return state === 0 ? '未发送' : '已发送';
      },

      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          memo.deleteMemo(row).then(res => {
            if (res.data.code === 0) {
              this.$message.success(res.data.msg);
              this.loadRemind();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },


      //页码更改事件处理
      currentChange(currentPage) {
        this.currentPage = currentPage;
        this.loadRemind();
        scrollTo(0, 0);
      },


      loadRemind() {
        memo.getMemoListByType(0, this.currentPage, this.pageSize).then(res => {
          this.remindList = res.data.data.list;
          this.total = res.data.data.total;
        })
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      //新增
      addRemind(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid){
            memo.addMemo(0,
              this.remind.memoEmail, 0,
              this.remind.memoDate,
              this.remind.memoContent).then(res => {
              this.$message.success(res.data.msg);
              this.visible = false;
              this.loadRemind();
            });
          }
        });
      },

      //表格索引
      indexMethod(index) {
        return 1 + (this.currentPage - 1) * this.pageSize;
      }

    }
  }
</script>

<style scoped>
  #remind {
    text-align: center;
  }

  #newRemind {
    width: 20px;
    margin: 10px auto;
    text-align: center;
  }

  .new-box {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
</style>
