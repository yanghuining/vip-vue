<!-- 首页样式 -->
<template>
  <div>

      <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input
              v-model="search"
              class="search_name"
              size="mini"
              placeholder="输入姓名查询">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="text"
              @click="onSearch()"
              class="el-icon-search">查询
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              class="el-icon-refresh"
              type="text"
              @click="refreshData">刷新
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              class="el-icon-circle-plus-outline"
              type="text"
              @click="dialogVisible = true">添加
            </el-button>
          </el-form-item>
          <router-link :to ="{path: '/today'}">
            <el-button   type="primary" size="mini"
           >今日报告
             
            </el-button>
              </router-link>
              <router-link :to ="{path: '/home'}">
                <el-button   type="primary" size="mini"
               >进入管理版
                 
                </el-button>
                  </router-link>
      </el-form>


      <!--结果表格 -->
      <el-table
        :data="tableData"
        highlight-current-row
        border
        style="width: 100%">
        <el-table-column
          label="编号">
          <template slot-scope="scope">
            <span>{{ scope.row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="日期">
          <template slot-scope="scope">
            <i class="el-icon-time hidden-sm-and-down"></i>
            <span>{{ scope.row.userDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="right">
              <p>姓名: {{ scope.row.userName }}</p>
              <p>住址: {{ scope.row.userAddress }}</p>
              <p>日期：{{ scope.row.userDate }}</p>
              <p>积分：{{ scope.row.userGrade }}</p>
              <div slot="reference" class="name-wrapper">
                <el-button type="text">{{ scope.row.userName }}</el-button>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="电话">
          <template slot-scope="scope">
            <span>{{ scope.row.userAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="积分"
          width="250"
          class="right-items" style="float: right">
          <template slot-scope="scope">
            <span>{{ scope.row.userGrade }}</span>
                <el-button
              size="mini"
              @click="handleCun(scope.$index, scope.row)">存币
            </el-button>
            <el-button
              size="mini"
              @click="handleQu(scope.$index, scope.row)">取币
            </el-button>
          
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="300">
          <template slot-scope="scope">
            <router-link :to ="{path: '/action', query: {userId:ruleForm.userId}}">
              <el-button   type="primary" size="mini"
              @click="handleEdit(scope.$index, scope.row)">查看记录
               
              </el-button>
                </router-link>
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          
          </template>
        </el-table-column>
      </el-table>
<!-- 添加弹窗 -->
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm" size="medium">
        <el-dialog
          title="添加"
          :append-to-body='true'
          :visible.sync="dialogVisible"
          width="80%"
          :before-close="handleClose">
          <el-input type="hidden" v-model="ruleForm.userId"/>
          <el-form-item label="时间" prop="userDate">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.userDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="住址" prop="userAddress">
            <el-input v-model="ruleForm.userAddress"></el-input>
          </el-form-item>
          <el-form-item label="积分" prop="userGrade">
          <el-input v-model="ruleForm.userGrade"></el-input>
        </el-form-item>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel()" size="medium">取 消</el-button>
            <el-button @click="addUser()" type="primary" size="medium">确 定</el-button>
          </span>
        </el-dialog>
      </el-form>
<!-- 编辑弹窗 -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm" size="medium">
      <el-dialog
        title="编辑"
        :append-to-body='true'
        :visible.sync="dialogUpdate"
        width="80%"
        :before-close="handleClose">
        <el-input type="hidden" v-model="ruleForm.userId"/>
        <el-form-item label="时间" prop="userDate">
          <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.userDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="userAddress">
          <el-input v-model="ruleForm.userAddress"></el-input>
           </el-form-item>
          <el-form-item label="积分" prop="userGrade">
          {{ruleForm.userGrade}}
        </el-form-item>
<span slot="footer" class="dialog-footer">
            <el-button @click="cancel()" size="medium">取 消</el-button>
            <el-button @click="updateUser()" type="primary" size="medium">确 定</el-button>
          </span>
      </el-dialog>

      <!-- 存币弹窗 -->
    </el-form>
         <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm" size="medium">
        <el-dialog
          title="存币"
          :append-to-body='true'
          :visible.sync="dialogCun"
          width="30%">
          <el-input type="hidden" v-model="ruleForm.userId"/>
         
          <el-form-item label="姓名" >   {{ruleForm.userName}}

          </el-form-item>

          <el-form-item label="当前">{{ruleForm.userGrade}}
  
          </el-form-item>
          <el-form-item label="存币">
          <el-input   class="search_name"
           placeholder="请输入本次存币数量"
          v-model="ruleForm.userCun"
          ></el-input>
        </el-form-item>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel()" size="medium">取 消</el-button>
            <el-button @click="cunUser()" type="primary" size="medium">确 定</el-button>
          </span>
        </el-dialog>
      </el-form>  
<!-- 取币弹窗 -->
</el-form>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm" size="medium">
<el-dialog
 title="取币"
 :append-to-body='true'
 :visible.sync="dialogQu"
 width="30%"
 >
 <el-input type="hidden" v-model="ruleForm.userId"/>

 <el-form-item label="姓名" >   {{ruleForm.userName}}

 </el-form-item>

 <el-form-item label="当前">{{ruleForm.userGrade}}
</el-form-item>
 <el-form-item label="取币">
 <el-input   class="search_name"
  placeholder="请输入本次取币数量"
 v-model="ruleForm.userCun"
 ></el-input>
</el-form-item>
 <span slot="footer" class="dialog-footer">
   <el-button @click="cancel()" size="medium">取 消</el-button>
   <el-button @click="quUser()" type="primary" size="medium">确 定</el-button>
 </span>
</el-dialog>
</el-form>  
      <br>
      <div class="pages">
        <el-pagination
          background
          :disabled = "disablePage"
          :current-page.sync="currentPage"
          small
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    userId: '',
                    userName: '',
                    userDate: '',
                    userAddress: ''
                },
                rules: {
                    userName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
                    ],
                    userAddress: [
                        { required: true, message: '请输入住址', trigger: 'blur' },
                        { min: 5, message: '长度大于 5 个字符', trigger: 'blur' }
                    ],
                },
                tableData: [],
                search: '',
                dialogVisible: false,
                dialogUpdate: false,
                dialogCun: false,
                dialogQu: false,
                pageSize: 5,
                currentPage: 1,
                total: 0,
                disablePage: false
            }
        },
        methods: {
//存币弹窗方法
          handleCun(index, row) {
                this.dialogCun = true;
                this.ruleForm = Object.assign({}, row); //这句是关键！！！
            },

            //取币弹窗方法
          handleQu(index, row) {
                this.dialogQu = true;
                this.ruleForm = Object.assign({}, row); //这句是关键！！！
            },
          // 编辑弹窗方法
            handleEdit(index, row) {
                this.dialogUpdate = true;
                this.ruleForm = Object.assign({}, row); //这句是关键！！！
            },

            // 删除弹窗方法
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('删除操作, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let postData = this.qs.stringify({
                        userId: row.userId,
                    });
                    this.axios({
                        method: 'post',
                        url:'/delete',
                        data:postData
                    }).then(response =>
                    {
                        this.getPages();
                        this.currentPage = 1;
                        this.axios.post('/page').then(response =>
                        {
                            this.tableData = response.data;
                        }).catch(error =>
                        {
                            console.log(error);
                        });
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        console.log(response);
                    }).catch(error =>
                    {
                        console.log(error);
                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

   // 关闭弹窗方法
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },


            handleCurrentChange() {
                console.log(`当前页: ${this.currentPage}`);
                let postData = this.qs.stringify({
                    page: this.currentPage
                });
                this.axios({
                    method: 'post',
                    url:'/page',
                    data:postData
                }).then(response =>
                {
                    this.tableData = response.data;
                }).catch(error =>
                {
                    console.log(error);
                });
            },
            cancel() {
                this.dialogUpdate = false;
                this.dialogVisible = false;
              this.dialogCun = false;
              this.dialogQu = false;
                this.emptyUserData();
            },
            emptyUserData(){
                this.ruleForm = {
                    userName: '',
                    userDate: '',
                    userAddress: '',
                    userGrade:''
                }
            },


// 添加用户调接口
            addUser() {
                let postData = this.qs.stringify({
                    userDate: this.ruleForm.userDate,
                    userName: this.ruleForm.userName,
                    userAddress: this.ruleForm.userAddress,
                    userGrade:this.ruleForm.userGrade
                });
                this.axios({
                    method: 'post',
                    url:'/insert',
                    data:postData
                }).then(response =>
                {
                    this.axios.post('/page').then(response =>
                    {
                        this.tableData = response.data;
                        this.currentPage = 1;
                        this.$message({
                            type: 'success',
                            message: '已添加!'
                        });
                    }).catch(error =>
                    {
                        console.log(error);
                    });
                    this.getPages();
                    this.dialogVisible = false
                    console.log(response);
                }).catch(error =>
                {
                    console.log(error);
                });
            },
       // 更新用户调接口
            updateUser() {
                let postData = this.qs.stringify({
                    userId: this.ruleForm.userId,
                    userDate: this.ruleForm.userDate,
                    userName: this.ruleForm.userName,
                    userAddress: this.ruleForm.userAddress,
                    userGrade:this.ruleForm.userGrade
                  
            
                });
                this.axios({
                    method: 'post',
                    url:'/update',
                    data:postData
                }).then(response =>
                {
                    this.handleCurrentChange();
                    this.cancel();
                    this.$message({
                        type: 'success',
                        message: '更新成功!'
                    });
                    console.log(response);
                }).catch(error =>
                {
                    this.$message({
                        type: 'success',
                        message: '更新失败!'
                    });
                    console.log(error);
                });
            },
            //存币调接口
              cunUser() {
                let postData = this.qs.stringify({
                    userId: this.ruleForm.userId,
                    userName:this.ruleForm.userName,
                    actionGrade:this.ruleForm.userCun,
                    userGrade:this.ruleForm.userCun,
                    type:1
                });
                this.axios({
                    method: 'post',
                    url:'/cun',
                    data:postData
                }).then(response =>
                {
                    this.handleCurrentChange();
                    this.cancel();
                    this.$message({
                        type: 'success',
                        message: '更新成功!'
                    });
                    console.log(response);
                }).catch(error =>
                {
                    this.$message({
                        type: 'success',
                        message: '更新失败!'
                    });
                    console.log(error);
                });
            },

             //取币调接口
             quUser() {
                let postData = this.qs.stringify({
                    userId: this.ruleForm.userId,
                    userName:this.ruleForm.userName,
                    userGrade:this.ruleForm.userCun,
                    actionGrade:this.ruleForm.userCun,
                    type:2
                });
                this.axios({
                    method: 'post',
                    url:'/cun',
                    data:postData
                }).then(response =>
                {
                    this.handleCurrentChange();
                    this.cancel();
                    this.$message({
                        type: 'success',
                        message: '更新成功!'
                    });
                    console.log(response);
                }).catch(error =>
                {
                    this.$message({
                        type: 'success',
                        message: '更新失败!'
                    });
                    console.log(error);
                });
            },

            //用名字搜索
            onSearch() {
                let postData = this.qs.stringify({
                    userName: this.search
                });
                this.axios({
                    method: 'post',
                    url: '/ListByName',
                    data: postData
                }).then(response =>
                {
                    this.tableData = response.data;
                    this.disablePage = true;
                }).catch(error =>
                {
                    console.log(error);
                });
            },
           /* memory() {
                let postData = this.qs.stringify({
                   // userName: this.search
                   userId:76
                });
                this.axios({
                    method: 'post',
                    url: '/memory',
                    data: postData
                }).then(response =>
                {
                    this.tableData = response.data;
                    this.disablePage = true;
                }).catch(error =>
                {
                    console.log(error);
                });
            },*/
            getPages() {
                this.axios.post('/rows').then(response =>
                {
                    this.total = response.data;
                }).catch(error =>
                {
                    console.log(error);
                });
            },
            refreshData() {
                location.reload();
            }
        },
        created() {
            /*this.axios.get('static/user.json').then(response =>
            {
                this.tableData = response.data.tableData;
                this.total = response.data.tableData.length;
                // console.log(JSON.parse(JSON.stringify(response.data))['tableData'])
            });*/
            this.axios.post('/page').then(response =>
            {
                this.tableData = response.data;
            }).catch(error =>
            {
                console.log(error);
            });

            this.axios.post('/rows').then(response =>
            {
                this.total = response.data;
            }).catch(error =>
            {
                console.log(error);
            });

        },
        jump() {
              this.$router.push({path:'/components/action'});
            }
    }

   
</script>
<style scoped>
  .search_name{
    width: 200px;
  }
  .pages{
    margin: 0px;
    padding: 0px;
    text-align: right;
  }
</style>
