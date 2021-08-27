<template>
  
    <el-table
        :data="tableData"
        highlight-current-row
        border
        style="width: 100%">

        <el-table-column
          label="用户id"
          width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.userId }}</span>
          </template>
        </el-table-column>
       
        <el-table-column
          label="姓名"
          width="100">
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
        label="操作时间"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.userDate }}</span>
        </template>
      </el-table-column>
        <el-table-column
          label="操作
          ">
          <template slot-scope="scope">
           
            <span >
       <!--结果表格 -->
           <!--    （ID是{{ scope.row.userId }}）{{ scope.row.userName }}在{{ scope.row.userDate}}的时候-->
          操作前：{{ scope.row.oldGrade }}
              <el-tag v-if="scope.row.type ==1">存入</el-tag>
              <el-tag v-if="scope.row.type ==2">取出</el-tag>
              {{ scope.row.actionGrade }}，当前还有{{ scope.row.userGrade }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="当前积分"
          width="100"
          class="right-items" style="float: right">
          <template slot-scope="scope">
            <span>{{ scope.row.userGrade }}</span>
  
              
        </template>
    </el-table-column>

  </el-table>
 </template>

 <script>
    export default {
        data() {
            return {
                
                tableData: [],
                
            }
        },
        methods: {


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

        getTextByType (type) {
      switch (type) {
        case 1:
          return '存入'
        case 2:
          return '取出'
      
      }},
       
        created() {
            /*this.axios.get('static/user.json').then(response =>
            {
                this.tableData = response.data.tableData;
                this.total = response.data.tableData.length;
                // console.log(JSON.parse(JSON.stringify(response.data))['tableData'])
            });*/
         
            let postData = this.qs.stringify({
                   // userName: this.search
                   
                   userId:this.$route.query.userId
                });
                this.axios({
                    method: 'post',
                    url: '/memory',
                    data: postData
                }).then(response =>
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
