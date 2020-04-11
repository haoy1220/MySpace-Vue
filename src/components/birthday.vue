<template>

  <div id="birthday">
    <!--展示表格-->
    <el-table :data="birthdayList" style="width: 100%;">
      <el-table-column type="index" :index="indexMethod()"/>
      <el-table-column label="生日时间" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ getDate(scope.row.memoDate) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="预定发送邮箱" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.memoEmail }}</span>
        </template>
      </el-table-column>
      <el-table-column label="谁的生日" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.memoContent }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提前发送" align="center">
        <template slot-scope="scope">
          <span>{{ showPre(scope.row.preTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="距离下次还有" align="center">
        <template slot-scope="scope">
          <span>{{ leftDate(scope.row.memoDate) }} 天</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ getDatetime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      <div>
        <!--    没有数据的情况-->
        <el-card shadow="hover" v-if="birthdayList.length<=0" style="margin: 20% auto">你还没有记录某人的生日哦！</el-card>
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


    <div id="newBirthday">
      <el-button type="success" @click="visible=true">新建</el-button>

      <!--新增-->
      <el-dialog :visible.sync="visible" title="添加生日" width="300px" :center="true">
        <el-form
          class="new-box"
          status-icon
          :model="birthday"
          ref="birthdayForm"
          :rules="rules">

          <el-form-item prop="memoEmail">
            <el-input v-model="birthday.memoEmail" placeholder="请输入预定发送的邮箱"/>
          </el-form-item>


          <el-form-item prop="memoDate">
            <el-col>
              <el-date-picker
                v-model="birthday.memoDate"
                type="date"
                placeholder="哪一天生日呢"
                :picker-options="pickerOptions"
                style="width: 100%"
                value-format="timestamp"/>
            </el-col>
          </el-form-item>

          <el-form-item prop="memoPre">
            <el-select v-model="birthday.preTime" placeholder="请选择提前提醒的时间" style="width: 100%;" @change="getPreTime">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>


          <el-form-item prop="memoContent">
            <el-input type="text"
                      placeholder="谁的生日"
                      resize="none"
                      v-model="birthday.memoContent"/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addBirthday('birthdayForm')">保存</el-button>
            <el-button @click="resetForm('birthdayForm')">清空</el-button>
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

  export default {
    name: "birthday",
    data() {
      return {
        //本页负责类型:1-生日
        memoType: 1,
        //分页
        pageSize: 7,
        total: 0,
        currentPage: 1,
        birthdayList: [],


        //新建窗口可视
        visible: false,

        rules: {
          memoEmail: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
          ],
          memoDate: [
            {required: true, message: '请选择生日时间', trigger: 'blur'},
          ],
          memoPre: [
            {required: true, message: '请选择提前时间', trigger: 'blur'},
          ],
          memoContent: [
            {required: true, message: '请输入生日人姓名', trigger: 'blur'},
          ]
        },


        birthday: {
          memoEmail: '',
          memoDate: '',
          memoContent: "",
          preTime: ''
        },
        //提前选项
        options: [{
          value: 0,
          label: '无'
        }, {
          value: 3,
          label: '三天'
        }, {
          value: 5,
          label: '五天'
        }, {
          value: 7,
          label: '七天'
        }],


        pickerOptions: {
          //禁用日期
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },

      }
    },

    created() {
      this.loadBirthday();
    },


    methods: {
      //显示提前时间
      showPre(time) {
        if (time > 3) {
          return time === 5 ? '五天' : '七天';
        } else {
          return time === 0 ? '无' : '三天';
        }
      },

      //转换时间戳
      getDate(timeStamp) {
        return date.myFormatByDate(timeStamp);
      },

      getDatetime(timestamp) {
        return date.myFormatByDatetime(timestamp);
      },

      leftDate(timestamp) {
        return date.leftDate(timestamp);
      },

      //删除生日按id
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          memo.deleteMemo(row).then(res => {
            if (res.data.code === 0) {
              this.$message.success(res.data.msg);
              this.loadBirthday();
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
        this.loadBirthday();
        scrollTo(0, 0);
      },

      //加载生日
      loadBirthday() {
        memo.getMemoListByType(this.memoType, this.currentPage, this.pageSize).then(res => {
          this.birthdayList = res.data.data.list;
          this.total = res.data.data.total;
        })
      },

      //清空新建输入框
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      getPreTime() {
        // console.log(select);
        // this.birthday.preTime = select.value;
        console.log(this.birthday.preTime);
      },

      //添加生日
      addBirthday(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            memo.addMemo(this.memoType,
              this.birthday.memoEmail,
              this.birthday.preTime,
              this.birthday.memoDate,
              this.birthday.memoContent).then(res => {
              this.$message.success(res.data.msg);
              this.visible = false;
              this.loadBirthday();
            })
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
  #birthday {
    text-align: center;
  }

  #newBirthday {
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

