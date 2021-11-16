<template>
  <div>
    <el-input
              v-model="search"
              class="search_name"
              size="mini"
              placeholder="输入开始时间,格式为2021-12-11,不输入默认为当天的数据">
            </el-input>
         
      
            <el-button
              type="text"
               @click="onSearch()"
              class="el-icon-search">查询
            </el-button>
    <el-table
        :data="tableData"
        highlight-current-row
        border
        style="width: 100%">
           
        <el-table-column
        label="操作时间"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
        </template>
      
</el-table-column>
      
        <el-table-column
        label="品名"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      
</el-table-column>
    
        <el-table-column
          label="操作
          ">
          <template slot-scope="scope">
           
            <span >
       <!--结果表格 -->
           <!--    （ID是{{ scope.row.userId }}）{{ scope.row.userName }}在{{ scope.row.userDate}}的时候-->
    
              <el-tag v-if="scope.row.type ==1">原有机器内数量：{{ scope.row.oldquantity }}，更新库存至{{ scope.row.quantity }} </el-tag>
              <el-tag v-if="scope.row.type ==2">库存娃娃数量为：{{ scope.row.oldquantity }}，上架数量：{{ scope.row.actionquantity }},
                到机器{{ scope.row.newId }}，上架后机器内数量为：{{ scope.row.quantity }} </el-tag>
                <el-tag v-if="scope.row.type ==3">原有娃娃数量：{{ scope.row.oldquantity }}，补充娃娃数量：{{ scope.row.actionquantity }},补充后娃娃数量：{{ scope.row.quantity }} </el-tag>
            </span>
          </template>
        </el-table-column>
     

  </el-table>
  </div>
 </template>

 <script>
    export default {
        data() {
            return {
                search: '',
                tableData: [],
                
            }
        },
        methods: {

   onSearch() {
                let postData = this.qs.stringify({
                    date: this.search
                });
                this.axios({
                    method: 'post',
                    url: '/inventory/last',
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
                    method: 'get',
                    url: '/inventory/last',
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
    width:350px;
  }
  .pages{
    margin: 0px;
    padding: 0px;
    text-align: right;
  }
</style>
