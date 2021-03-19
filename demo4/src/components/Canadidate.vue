
  <template v-for="item in tableData">
  <div   >
    <el-table :data="tableData" 
      style="width: 100%">
      <el-table-column
        prop="interviewId"
        label="面试id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="interviewStatus"
        label="面试状态"
        width="180">
      </el-table-column>
      <el-table-column
        prop="faceTime"
        label="面试时间">
      </el-table-column>
      <!-- <template > -->
        <el-table-column  
        label="电话"
          width="180" 
          prop='faceTelephone' >
          <!-- {{recurit.}} -->
        </el-table-column>
      <!-- </template> -->
        
      <el-table-column
        width="180"
        label="面试公司"
        prop='company'>
         <!-- {{recurit.}} -->
      </el-table-column>
      <el-table-column
        width="180"
        label="面试结果"
        prop='status'>   
      </el-table-column>
    </el-table>
     
  </div>
  </template>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
import {Loading} from 'element-ui'
  export default {
    name : 'Candidate',
    mounted(){
        this.load();
    },
    methods:{
        load(){
        let LoadingInstance = Loading.service(this.$options);
        this.$axios.get('/userEntity/loadStatus?id=1')
        .then(successResponse=>{
            this.tableData=successResponse.data;
            console.log(this.tableData)});
            LoadingInstance.close();

        }

    },
    data() {
      return {
        tableData: [],
        
        loading :false
      }
    }
  }
</script>