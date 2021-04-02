<template>
  <div>
    <el-page-header @back="goBack" content="候选者管理"></el-page-header>

    <!-- form表单 -->
    <el-row class="search-form">
      <el-form size="mini" :inline="true" ref="searchForm" :model="searchForm" label-width="80px">
        <el-row>
          <el-col :span="5">
            <el-form-item prop="talentName">
              <el-input clearable v-model="searchForm.talentName" placeholder="请输入">
                <span slot="prefix" class="el-icon-edit">姓名</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="educationBackground">
              <el-input clearable v-model="searchForm.educationBackground" placeholder="请输入">
                <span slot="prefix" class="el-icon-edit">学历</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="graduationTime">
              <el-date-picker
              clearable
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="毕业日期"
              v-model="searchForm.graduationTime"
              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="goSearch">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>

    <!-- 表格列表 -->
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;height: auto;">
        <el-table-column
          fixed
          prop="talentName"
          label="姓名"
          width="220">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="220">
        </el-table-column>
        <el-table-column
          prop="graduationSchool"
          label="毕业学校"
          width="220">
        </el-table-column>
        <el-table-column
          prop="graduationTime"
          label="毕业时间"
          width="220">
        </el-table-column>
        <el-table-column
          prop="educationBackground"
          label="学历"
          width="220">
        </el-table-column>
        <el-table-column
          prop="origin"
          label="来源"
          width="220">
        </el-table-column>
        <el-table-column
          prop="origin"
          label="最低期望薪资"
          width="220">
        </el-table-column>
        <el-table-column
          prop="maxSalary"
          label="最高期望薪资"
          width="220">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="电话"
          width="220">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="220">
          <template slot-scope="scope">
            <el-button @click="goTrack(scope.row)" type="text" size="small">跟踪</el-button>
            <el-button @click="goDistribution(scope.row)"  type="text" size="small">分配</el-button>
            <el-button @click="updateStatus(scope.row)"  type="text" size="small">状态修改</el-button>
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
        talentName: '',
        graduationTime: '',
        educationBackground: '',
        status:""
      },
      tableData: [],
    }
  },
  mounted(){
    this.getData()//获取表格列表
  },
  methods: {
    getData(){
      this.$axios
      .post("/talentPool", {
        graduationTime: this.searchForm.graduationTime,
        educationBackground: this.searchForm.educationBackground,
        talentName: this.searchForm.talentName,
        pageSize: this.pageSize,
        pageNumber: this.currentPage
      })
      .then((successResponse) => {
        this.totalNumber = successResponse.data.data.total
        this.tableData = successResponse.data.data.list
      })
      .catch( (err)=> {
        this.tableData = []
        this.$message.error('服务器错误')
      });
    },
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
    // 搜索
    goSearch(){
      this.currentPage = 1
      this.getData();
    },
    //返回
    goBack(){
      this.$router.back()
    },
    //跟踪
    goTrack(row){
      consolr.log('跟踪')
    },
    //分配
    goDistribution(row){
      this.$router.push({path: '/progress',query: {
        detailDate: row
      }})
    },
    updateStatus(row){
      var status = null
      if(row.status == 0){
        status = 1
      }else{
        status = 0
      }
      this.$axios
      .put("/talentPool/updateStatus?talentId="+row.talentId+"&status="+status).then((successResponse)=>{
        this.$message.success(successResponse.data.msg)
      }).catch((err)=>{
        this.$message.error('服务器错误')
      })
    }
  },
};
</script>
<style lang='scss' scoped>
.search-form{
  text-align: left;
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
