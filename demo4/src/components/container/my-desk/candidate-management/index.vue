<template>
  <div>
    <el-page-header @back="goBack" content="候选者管理"></el-page-header>
    <el-row class="search-form">
      <el-form size="mini" :inline="true" ref="searchForm" :model="searchForm" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item prop="candidate">
              <el-input v-model="searchForm.candidate" placeholder="请输入">
                <span slot="prefix" class="el-icon-edit">候选人姓名</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="customerName">
              <el-select class="select-slot" v-model="searchForm.customerName"
              filterable placeholder="请选择">
                <span slot="prefix" class="el-icon-collection-tag"> 客户名称</span>
                <el-option
                  v-for="item in searchForm.customerNameList"
                    :key="item.custormId"
                    :label="item.custormName"
                    :value="item.custormName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="projectName">
              <el-select class="select-slot" v-model="searchForm.projectName"
              filterable placeholder="请选择">
                <span slot="prefix" class="el-icon-collection-tag"> 项目名称</span>
                <el-option
                  v-for="item in searchForm.projectNameList"
                  :key="item.programmId"
                  :label="item.programmName"
                  :value="item.programmName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="jobName">
              <el-select class="select-slot" v-model="searchForm.jobName"
              filterable placeholder="请选择">
                <span slot="prefix" class="el-icon-collection-tag"> 工作岗位</span>
                <el-option
                  v-for="item in searchForm.workJobList"
                  :key="item.jobId"
                  :label="item.jobName"
                  :value="item.jobName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="text-align: center;">
          <el-form-item>
            <el-button type="info" @click="resetSearch">重置</el-button>
            <el-button type="primary" @click="goSearch">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="date"
          label="日期"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="候选人">
        </el-table-column>
        <el-table-column
          prop="province"
          label="客户">
        </el-table-column>
        <el-table-column
          prop="city"
          label="部门">
        </el-table-column>
        <el-table-column
          prop="province"
          label="项目">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">跟踪</el-button>
            <el-button type="text" size="small">分配</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="paging"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNumber">
      </el-pagination>
    </el-row>

  </div>
</template>
<script>
export default {
  name: "candidate-management",
  data(){
    return {
      totalNumber: 0,
      pageSize: 10,
      pageSizes:[10, 20, 30, 40],
      currentPage: 1,
      searchForm:{
        candidate: '',
        jobName: '',
        projectName: '',
        customerName: '',
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }],
    }
  },
  mounted(){
    this.getCustormList();//客户列表
    this.getProjectList();//项目列表
  },
  methods: {
    // 表格分页 每页条数
    handleSizeChange (val) {
      this.pageSize = val
      //加载表格数据
      //...
    },
    // 表格分页 当前第几页
    handleCurrentChange (val) {
      this.currentPage = val
      //加载表格数据
      //...
    },
    //获取所有客户列表
    getCustormList(){
      this.$axios.get("/custorm/").then((res) => {
        this.searchForm.customerNameList = res.data;
      }).catch((err)=>{
        this.searchForm.customerNameList = []
        this.$message.error('服务器内部错误')
      });
    },
    //获取所有项目列表
    getProjectList(){
      this.$axios.get("/programm/programm").then((res) => {
        this.searchForm.projectNameList = res.data.data;
      }).catch((err)=>{
        this.searchForm.projectNameList = []
        this.$message.error('服务器内部错误')
      });
    },
    // 重置搜索条件
    resetSearch(){
      this.$refs['searchForm'].resetFields();
    },
    // 搜索
    goSearch(){
        // this.$axios
        // .post("/analysis/getAnalysis", {
        //   custormName: this.searchForm.customerName,
        //   demandNumber: Number(this.searchForm.demandNumber),
        //   endTime: this.searchForm.endDate,
        //   programmName: this.searchForm.projectName,
        //   startTime: this.searchForm.startDate
        // })
        // .then((successResponse) => {
        //   if (successResponse.data.code == 200) {
        //     this.tableData = successResponse.data.data
        //   } else {
        //     this.tableData = []
        //     this.$message.error(successResponse.data.msg)
        //   }
        // })
        // .catch( (err)=> {
        //   this.tableData = []
        //   this.$message.error('服务器错误')
        // });
    },
    //返回
    goBack(){
      this.$router.back()
    },
  },
};
</script>
<style lang='scss' scoped>
.search-form{
  text-align: left;
  padding-left: 20px;
  margin: 20px 0;
  .line{
    text-align: center;
    margin-right: 10px;
  }
}
.search-form >>> .el-input--prefix .el-input__inner{
  padding-left: 80px;
  text-align: right;
}
.paging{
  text-align: right;
  margin-top: 10px;
}
</style>
