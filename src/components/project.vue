<template>
  <div>
    <el-card id="project">
      <!--===============顶部布局：返回、保存、新建一行==========================================================================-->
      <div>
        <el-link :underline="false" @click="back()"><i class="el-icon-back">Back</i></el-link>
        <el-button icon="el-icon-plus" size="small" style="text-align: right;float: right" @click="preNewColumn()">
          新建一行
        </el-button>
        <!--=========================================新增行================================================--->
        <el-dialog :visible.sync="newColumnView" title="新增行" width="300px" style="text-align: center" :close-on-click-modal="false">
          <el-form v-model=columnBody status-icon>
            <el-form-item style="width: 100%">
              <el-input v-model=columnBody placeholder="请输入行内容"/>
            </el-form-item>
            <el-form-item style="width: 100%">
              <el-button type="primary" @click="newColumn()">确定</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!--===============================================================================================-->
        <el-button icon="el-icon-plus" type="success" size="small"
                   style="text-align: right;float: right;margin-right: 20px" @click="saveProject()">保存
        </el-button>
      </div>

      <!--      为了id改变会被watch到-->
      <p style="display: none">{{id = this.$route.params.id}}</p>

      <!--    没有日记的情况-->
      <el-card shadow="hover" v-if="column.length<=0" style="margin: 20% auto;text-align: center">该项目还没启动，从新建一行开始吧！
      </el-card>

      <div class="t-ctn">
        <div class="s-ctn">
          <!--          列-->
          <div v-for="(item,f) in column" :key="f">
            <el-card style="height: 500px;width: 300px;float: left;margin: 20px 10px 0 10px;">
              <!--              卡片头部：显示行名和操作-->
              <div slot="header">
                <div style="width: 200px;padding:0">
                  <strong><span>{{item.body}}</span></strong>
                </div>
                <div>
                  <el-dropdown trigger="click"
                               style="float: right;margin-left: 20px">
                    <span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon-more"/></span>
                    <el-dropdown-menu slot="dropdown">
                      <!--                      在click后加native才有效-->
                      <el-dropdown-item @click.native="preUpdateColumn(f)">修改列主题</el-dropdown-item>
                      <el-dropdown-item @click.native="deleteColumn(f)">删除列</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <el-button @click="preNewCard(f)" icon="el-icon-plus" style="padding: 2px 0;"
                             type="text"/>
                </div>
              </div>

              <!--              卡片主体=====================================================================================-->
              <div style="overflow-y: auto;height: 400px">
                <div style="height: auto">
                  <draggable v-model="item.child" :move="onMove" :options="dragOptions" @start="isDragging=true"
                             @end="isDragging=false">
                    <transition-group type="transition" class="list-group">
                      <el-card shadow="hover" body-style="padding:0" style="margin: 5px 5px 5px 5px;"
                               v-for="(i,c) in item.child" :key="c" class="list-group-item">
                        <i class="el-icon-bank-card" style="margin: 0 0 0 10px"/>

                        <el-dropdown trigger="click" style="float: right;margin:0 10px 0 0">
                          <span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon-more"/></span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="preUpdateCard(f,c)">修改卡片主题</el-dropdown-item>
                            <el-dropdown-item @click.native="deleteCard(f,c)">删除卡片</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                        <p style="width: 220px;margin: 10px 10px 10px 10px">{{i.cardBody}}</p>
                      </el-card>
                    </transition-group>
                  </draggable>
                </div>
              </div>
            </el-card>

            <!--=======================================新增卡片=================================================--->
            <el-dialog :visible.sync="newCardView" title="新增卡片" width="300px" style="text-align: center" :close-on-click-modal="false">
              <el-form v-model="cardBody" status-icon>
                <el-form-item style="width: 100%">
                  <el-input v-model="cardBody" placeholder="请输入卡片内容"/>
                </el-form-item>
                <el-form-item style="width: 100%">
                  <el-button type="primary" @click="newCard">确定</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
            <!--===============================================================================================--->
            <!--=======================================修改卡片=================================================--->
            <el-dialog :visible.sync="updateCardView" title="修改卡片" width="300px" style="text-align: center" :close-on-click-modal="false">
              <el-form v-model="cardBody" status-icon>
                <el-form-item style="width: 100%">
                  <el-input v-model="cardBody" placeholder="请输入卡片内容"/>
                </el-form-item>
                <el-form-item style="width: 100%">
                  <el-button type="primary" @click="updateCard">确定</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
            <!--===============================================================================================--->

            <!--=========================================修改行================================================--->
            <el-dialog :visible.sync="updateColumnView" title="修改行" width="300px" style="text-align: center" :close-on-click-modal="false">
              <el-form v-model=columnBody status-icon>
                <el-form-item style="width: 100%">
                  <el-input v-model=columnBody placeholder="请输入行内容"/>
                </el-form-item>
                <el-form-item style="width: 100%">
                  <el-button type="primary" @click="updateColumn()">确定</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
            <!--===============================================================================================-->
          </div>
        </div>

      </div>


    </el-card>
  </div>
</template>

<script>
  import date from "../utils/date";
  import project from "../api/project";
  import draggable from "vuedraggable"

  export default {
    name: "project",
    components: {draggable},
    data() {
      return {
        id: -1,
        index: -1,
        childIndex: -1,


        //行
        column: [
          // {body: '引导行', child: [{cardBody: '你可以自由的拖动此卡片，通过新增行和卡片，来实现你的项目管理'}]}
        ],

        isDragging: false,
        delayedDragging: false,

        //卡片
        newCardView: false,
        updateCardView: false,
        cardBody: '',

        newColumnView: false,
        updateColumnView: false,
        columnBody: '',
      }
    },

    watch: {
      //监测id变化从而刷新页面数据
      id() {
        this.loadProject();
      },

      //拖拽用的
      isDragging(newValue) {
        if (newValue) {
          this.delayedDragging = true;
          return;
        }
        this.$nextTick(() => {
          this.delayedDragging = false;
        });
      }
    },

    computed: {
      //拖拽操作配置
      dragOptions() {
        return {
          animation: 0,//动画时间
          group: "description",//分组，同一组不同list可以拖拽
          ghostClass: "ghost"//拖动时候的样子css样式
        };
      },
    },

    methods: {
      //为了将查询到的字符串从链表转化为数组
      tranArray(list) {
        let result = [];
        for (let i in list) {
          if (!list.hasOwnProperty(i)) continue;
          result.push(list[i]);
        }
        return result;
      },

      //转换时间戳
      getDatetime(timeStamp) {
        return date.myFormatByDatetime(timeStamp);
      },

      //加载项目详情数据
      loadProject() {
        project.getProjectDetail(this.id).then(res => {
          this.column = JSON.parse(res.data);
          this.column = this.tranArray(this.column);
        })
      },

      //拖拽移动
      onMove({relatedContext, draggedContext}) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (
          (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        );
      },


      //返回项目列表界面
      back() {
        history.back();
      },

      //保存项目详情
      saveProject() {
        project.saveProject(this.id, JSON.stringify(this.column)).then(res => {
          this.$message.success(res.msg);
        })
      },

      //新建行时弹出输入框
      preNewColumn() {
        this.newColumnView = true;
      },

      //输入框确认新建一行
      newColumn() {
        this.newColumnView = false;
        return this.column.push({body: this.columnBody, child: []});
      },

      //修改行时弹出输入框
      preUpdateColumn(index) {
        this.index = index;
        this.columnBody = this.column[index].body;
        this.updateColumnView = true;
      },

      //更新行的内容
      updateColumn() {
        this.column[this.index].body = this.columnBody;
        this.updateColumnView = false;
      },

      //删除行
      deleteColumn(index) {
        this.$confirm('此操作将永久删除该行, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.column.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      //新建行时弹出输入框
      preNewCard(index) {
        this.index = index;
        this.newCardView = true;
      },

      //新增卡片
      newCard() {
        this.column[this.index].child.push({cardBody: this.cardBody});
        this.newCardView = false;
      },

      //修改卡片时弹出输入框
      preUpdateCard(f, c) {
        console.log(f);
        this.index = f;
        console.log(c);
        this.childIndex = c;
        this.cardBody = this.column[f].child[c].cardBody;
        this.updateCardView = true;
      },

      //更新卡片的内容
      updateCard() {
        this.column[this.index].child[this.childIndex].cardBody = this.cardBody;
        this.updateCardView = false;
      },

      //删除卡片
      deleteCard(father, child) {
        this.$confirm('此操作将永久删除该卡片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.column[father].child.splice(child, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

    }
  }
</script>

<style scoped>
  #project {
    margin: 20px auto;
    padding: 20px;
    height: 650px;
  }


  .t-ctn {
    width: 100%;
    overflow-x: auto;
  }

  .t-ctn .s-ctn {
    height: 550px;
    white-space: nowrap;
  }

  .t-ctn .s-ctn div {
    font-size: 14px;
    box-sizing: border-box;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    display: inline-block;
    /*width: 200px;*/
    height: 100%;
    /*border: 10px solid red;*/
  }

  /*下拉*/
  .el-dropdown-link {
    cursor: pointer;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }

  .list-group {
    min-height: 20px;
  }

  .list-group-item {
    cursor: move;
  }

  .list-group-item i {
    cursor: pointer;
  }

</style>
