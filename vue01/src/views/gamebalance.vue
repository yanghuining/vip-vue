<!-- 首页样式 -->
<template>

  <div>
            <el-button
              class="el-icon-refresh"
              type="text"
              @click="refreshData">刷新
            </el-button>
          
<el-button
              class="el-icon-circle-plus-outline"
              type="text"
              @click="dialogVisible = true">新增类别
            </el-button>
            <el-button
              class="el-icon-circle-plus-outline"
              type="text"
              @click="dialogVisible = true">添加新预约
            </el-button>
        
<el-form>{{ valueup }}</el-form>

      <!--结果表格 -->
      <el-table
        :data="tableData"
        highlight-current-row
        border
        style="width: 100%">
        <el-table-column
          label="编号">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        
  
        <el-table-column
          label="稿件内容">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="预算参考"
          
          class="right-items" style="float: right">
          <template slot-scope="scope">
            <span>{{ scope.row.budget }}</span>
           
          
          </template>
        </el-table-column>
       
       <el-table-column
          label="实际价格">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
           <el-table-column
          label="已支付">
          <template slot-scope="scope">
            <span>{{ scope.row.paid }}</span>
          </template>
        </el-table-column>
      
           <el-table-column
          label="待支付">
          <template slot-scope="scope">
            <span>{{ scope.row.balance }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          
          width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          
          width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
             <el-table-column
          label="创建时间"
          
          width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.creattime }}</span>
          </template>
        </el-table-column>
      <el-table-column
          label="更新时间"
          
          width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.updatetime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          
          width="300">
          <template slot-scope="scope">
             <el-button
             type="primary" size="mini"
              @click="handleBase(scope.$index, scope.row)">约稿
  </el-button>
           <el-button
             type="primary" size="mini"
              @click="handleEnd(scope.$index, scope.row)">结清
  </el-button>
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)">编辑
   
          </el-button>
          </template>
        </el-table-column>
      </el-table>
<span>未上架库存</span>
        <el-button
              class="el-icon-circle-plus-outline"
              type="text"
              @click="dialogVisible = true">添加新库存娃娃
            </el-button>
      
       <!--仓库表格 -->
      <el-table
        :data="twoData"
        highlight-current-row
        border
        style="width: 100%">
        
  
        
        <el-table-column
          label="娃娃名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="库存"
          
          class="right-items" style="float: right">
          <template slot-scope="scope">
            <span>{{ scope.row.quantity }}</span>
           
          
          </template>
        </el-table-column>
       
       <el-table-column
          label="进货单价">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
           <el-table-column
          label="总价值">
          <template slot-scope="scope">
            <span>{{ scope.row.price*scope.row.quantity }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          
          width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
       

        <el-table-column
          label="操作"
          
          width="300">
          <template slot-scope="scope">


            <el-button
             type="primary" size="mini"
              @click="handleUp(scope.$index, scope.row)">上架
            </el-button>
                <el-button
             type="primary" size="mini"
              @click="handleBase(scope.$index, scope.row)">补充
  </el-button>
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)">编辑
   
          </el-button>
          </template>
        </el-table-column>
      </el-table>
<!-- 添加弹窗 -->
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="8git init0px" class="demo-ruleForm" size="medium">
        <el-dialog
          title="添加约稿内容"
          :append-to-body='true'
          :visible.sync="dialogVisible"
          width="30%"
          >
            <el-input type="hidden" v-model="ruleForm.type"/>
          <el-form-item label="成本类别" prop="type">
            <el-input v-model="ruleForm.type"></el-input>
          </el-form-item>
          <el-form-item label="稿件分类" prop="kind"  >
            <el-input v-model="ruleForm.kind"></el-input>
          </el-form-item>
          <el-form-item label="稿件内容" prop="name" >
            <el-input v-model="ruleForm.name" ></el-input>
          </el-form-item>
          <el-form-item label="预算" prop="budget">
          <el-input v-model="ruleForm.budget"></el-input>
          </el-form-item>
             <el-form-item label="备注信息" prop="remark" >
            <el-input v-model="ruleForm.remark" ></el-input>
          
        </el-form-item>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel()" size="medium">取 消</el-button>
            <el-button @click="addPlan()" type="primary" size="medium">确 定</el-button>
          </span>
        </el-dialog>
      </el-form>
<!-- 编辑弹窗 -->
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="8git init0px" class="demo-ruleForm" size="medium">
        <el-dialog
          title="编辑约稿信息"
          :append-to-body='true'
          :visible.sync="dialogUpdate"
          width="30%"
          >
            <el-input type="hidden" v-model="ruleForm.type"/>
          <el-form-item label="成本类别" prop="type">
            <el-input v-model="ruleForm.type"></el-input>
          </el-form-item>
          <el-form-item label="稿件分类" prop="kind"  >
            <el-input v-model="ruleForm.kind"></el-input>
          </el-form-item>
          <el-form-item label="稿件内容" prop="name" >
            <el-input v-model="ruleForm.name" ></el-input>
          </el-form-item>
          <el-form-item label="预算" prop="budget">
          <el-input v-model="ruleForm.budget"></el-input>
          </el-form-item>
             <el-form-item label="备注信息" prop="remark" >
            <el-input v-model="ruleForm.remark" ></el-input>
          
        </el-form-item>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel()" size="medium">取 消</el-button>
            <el-button @click="modifyplan()" type="primary" size="medium">确 定</el-button>
          </span>
        </el-dialog>
      </el-form>


<!-- 约稿弹窗 -->

<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm" size="medium">
<el-dialog
 title="约稿"
 :append-to-body='true'
 :visible.sync="dialogBase"
 width="30%"
 >
 

 <el-form-item label="稿件名称" >   {{ruleForm.name}}

 </el-form-item>

 <el-form-item label="约稿价格">
   <el-input   class="search_name"
 v-model="ruleForm.price"
 ></el-input>
</el-form-item>
 <el-form-item label="已付定金">
 <el-input   class="search_name"
  placeholder="付定金写定金价格，无定金写0"
 v-model="ruleForm.paid"
 ></el-input>
</el-form-item>
 <span slot="footer" class="dialog-footer">
   <el-button @click="cancel()" size="medium">取 消</el-button>
   <el-button @click="appoint()" type="primary" size="medium">确 定</el-button>
 </span>
</el-dialog>
</el-form>  
<!-- 结清弹窗 -->

<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm" size="medium">
<el-dialog
 title="结清"
 :append-to-body='true'
 :visible.sync="dialogEnd"
 width="30%"
 >
 

 <el-form-item label="稿件名称" >   {{ruleForm.name}}

 </el-form-item>

 <el-form-item label="约稿价格"> {{ruleForm.price}}

</el-form-item>
 <el-form-item label="结清">确认全部结清点击确定
 
</el-form-item>
 <span slot="footer" class="dialog-footer">
   <el-button @click="cancel()" size="medium">取 消</el-button>
   <el-button @click="end()" type="primary" size="medium">确 定</el-button>
 </span>
</el-dialog>
</el-form>  
 <!-- 上架弹窗 -->

<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm" size="medium">
<el-dialog
 title="上架"
 :append-to-body='true'
 :visible.sync="dialogUp"
 width="30%"
 >
 <el-input type="hidden" v-model="ruleForm.newId"/>

 <el-form-item label="娃娃名称" >   {{ruleForm.name}}

 </el-form-item>

 <el-form-item label="原库存量">{{ruleForm.quantity}}
</el-form-item>
<el-form-item label="上架机器号">
 <el-input   
  placeholder="请输入上架机器号"
 v-model="ruleForm.toid"
 ></el-input>
</el-form-item>
 <el-form-item label="上架数量">
 <el-input   class="search_name"
  placeholder="请输入上架数量"
 v-model="ruleForm.action"
 ></el-input>
</el-form-item>
 <span slot="footer" class="dialog-footer">
   <el-button @click="cancel()" size="medium">取 消</el-button>
   <el-button @click="upInventory()" type="primary" size="medium">确 定</el-button>
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
        id: "",
        kind: "",
        type: "",
        name: "",
        budget: "",
        price: "",
        paid: "",
        balance: "",
        remark: "",
        creattime: "",
        updatetime: "",
        status: "",
      },
      tableData: [],
      twoData: [],
      search: "",
      dialogVisible: false,
      dialogUpdate: false,
      dialogCun: false,
      dialogQu: false,
      dialogUp: false,
      dialogBase: false,
      dialogEnd: false,
      pageSize: 100,
      currentPage: 1,
      total: 0,
      disablePage: false,
    };
  },
  methods: {
    //机器更新库存弹窗方法
    handleQu(index, row) {
      this.dialogQu = true;
      this.ruleForm = Object.assign({}, row); //这句是关键！！！
    },

    //上架弹窗方法
    handleUp(index, row) {
      this.dialogUp = true;
      this.ruleForm = Object.assign({}, row); //这句是关键！！！
    },

    //约稿弹窗方法
    handleBase(index, row) {
      this.dialogBase = true;
      this.ruleForm = Object.assign({}, row); //这句是关键！！！
    },


    //结清弹窗方法
    handleEnd(index, row) {
      this.dialogEnd = true;
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
      this.$confirm("删除操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let postData = this.qs.stringify({
            userId: row.userId,
          });
          this.axios({
            method: "post",
            url: "/delete",
            data: postData,
          })
            .then((response) => {
              this.getPages();
              this.currentPage = 1;
              this.axios
                .post("/page")
                .then((response) => {
                  this.tableData = response.data;
                })
                .catch((error) => {
                  console.log(error);
                });
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 关闭弹窗方法
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    handleCurrentChange() {
      console.log(`当前页: ${this.currentPage}`);
      let postData = this.qs.stringify({
        page: this.currentPage,
      });
      this.axios({
        method: "post",
        url: "gamebalance/list",
        data: postData,
      })
        .then((response) => {
          this.tableData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.axios({
        method: "post",
        url: "inventory/base",
        data: postData,
      })
        .then((response) => {
          this.twoData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancel() {
      this.dialogUpdate = false;
      this.dialogVisible = false;
      this.dialogCun = false;
      this.dialogQu = false;
      this.dialogUp = false;
      this.dialogBase = false;
      this.dialogEnd=false,
      this.emptyUserData();
    },
    emptyUserData() {
      this.ruleForm = {
        userName: "",
        userDate: "",
        userAddress: "",
        userGrade: "",
      };
    },

    // 添加机器调接口
    addPlan() {
      let postData = this.qs.stringify({
        type: this.ruleForm.type,
        kind: this.ruleForm.kind,
        name: this.ruleForm.name,
        budget: this.ruleForm.budget,
        remark: this.ruleForm.remark,
      });
      this.axios({
        method: "post",
        url: "/gamebalance/insert",
        data: postData,
      })
        .then((response) => {
          this.axios
            .post("/gamebalance/list")
            .then((response) => {
              this.tableData = response.data;
              this.currentPage = 1;
              this.props.form.resetFields();
              this.$message({
                type: "success",
                message: "已添加!",
              });
              this.form = { brand_right: 0 };
            })
            .catch((error) => {
              console.log(error);
            });

          this.getPages();

          this.dialogVisible = false;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 更新用户调接口
    modifyplan() {
      let postData = this.qs.stringify({
        id: this.ruleForm.id,
         type: this.ruleForm.type,
        kind: this.ruleForm.kind,
        name: this.ruleForm.name,
        budget: this.ruleForm.budget,
        remark: this.ruleForm.remark,
      });
      this.axios({
        method: "post",
        url: "/gamebalance/modify",
        data: postData,
      })
        .then((response) => {
          this.handleCurrentChange();
          this.cancel();
          this.$message({
            type: "success",
            message: "更新成功!",
          });
          console.log(response);
        })
        .catch((error) => {
          this.$message({
            type: "success",
            message: "更新失败!",
          });
          console.log(error);
        });
    },

    //机器更新库存调接口
    quUser() {
      let postData = this.qs.stringify({
        newId: this.ruleForm.newId,
        name: this.ruleForm.name,
        quantity: this.ruleForm.newquantity,
      });
      this.axios({
        method: "post",
        url: "/inventory/cun",
        data: postData,
      })
        .then((response) => {
          this.handleCurrentChange();
          this.cancel();
          this.$message({
            type: "success",
            message: "更新成功!",
          });
          console.log(response);
        })
        .catch((error) => {
          this.$message({
            type: "success",
            message: "更新失败!",
          });
          console.log(error);
        });
    },

    //约稿调接口
    appoint() {
      let postData = this.qs.stringify({
        id: this.ruleForm.id,
        price: this.ruleForm.price,
        paid: this.ruleForm.paid,
        status: this.ruleForm.status,
        action:1
        
      });
      this.axios({
        method: "post",
        url: "/gamebalance/art",
        data: postData,
      })
        .then((response) => {
          this.handleCurrentChange();
          this.cancel();
          this.$message({
            type: "success",
            message: "更新成功!",
          });
          console.log(response);
        })
        .catch((error) => {
          this.$message({
            type: "success",
            message: "更新失败!",
          });
          console.log(error);
        });

    },

    //结清调接口
    end() {
      let postData = this.qs.stringify({
        id: this.ruleForm.id,
        price: this.ruleForm.price,
        status: this.ruleForm.status,
         action:2
      })
      this.axios({
        method: "post",
        url: "/gamebalance/art",
        data: postData,
      })
        .then((response) => {
          this.handleCurrentChange();
          this.cancel();
          this.$message({
            type: "success",
            message: "更新成功!",
          });
          console.log(response);
        })
        .catch((error) => {
          this.$message({
            type: "success",
            message: "更新失败!",
          });
          console.log(error);
        });
    },
    //上架调接口
    upInventory() {
      let postData = this.qs.stringify({
        id: this.ruleForm.id,
        toId: this.ruleForm.toid,
        actionquantity: this.ruleForm.action,
        name: this.ruleForm.name,
      });
      this.axios({
        method: "post",
        url: "/inventory/cun",
        data: postData,
      })
        .then((response) => {
          this.handleCurrentChange();
          this.cancel();
          this.$message({
            message: response.data,
          });
          console.log(response);
        })
        .catch((error) => {
          this.$message({
            type: "success",
            message: "更新失败!",
          });
          console.log(error);
        });
    },

    getPages() {
      this.axios
        .post("/inventory/rows")
        .then((response) => {
          this.total = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    refreshData() {
      location.reload();
    },
  },
  created() {
    /*this.axios.get('static/user.json').then(response =>
            {
                this.tableData = response.data.tableData;
                this.total = response.data.tableData.length;
                // console.log(JSON.parse(JSON.stringify(response.data))['tableData'])
            });*/
    this.axios
      .post("/gamebalance/list")
      .then((response) => {
        this.tableData = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    this.axios
      .post("/inventory/base")
      .then((response) => {
        this.twoData = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    this.axios
      .post("/inventory/rows")
      .then((response) => {
        this.total = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    this.axios
      .post("/gamebalance/pay")
      .then((response) => {
        this.valueup = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    let postData = this.qs.stringify({
      date: "2022-05-12",
    });
    this.axios({
      method: "post",
      url: "/money/today",
      data: postData,
    })
      .then((response) => {
        this.taodayquantity = response.data.taodayquantity;
        this.todaypay = response.data.todaypay;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  jump() {
    this.$router.push({ path: "/components/action" });
  },
};
</script>
<style scoped>
.search_name {
  width: 200px;
}
.pages {
  margin: 0px;
  padding: 0px;
  text-align: right;
}
</style>
