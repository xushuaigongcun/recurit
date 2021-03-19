<template>
 <div>
<el-card class="box-card" v-for="(tableData,index) in analysis" :key="index" >
  <div slot="header" class="clearfix" :class="addStatus(tableData)">
    <span>需求信息</span>
    <el-button type="text" @click="findData(tableData)">修改</el-button>
    <el-button type="text" @click="add(tableData)">添加</el-button>
  </div>
  <div>
    <el-row>
   <span v-show="false">客户id :  </span ><span v-show="false">{{tableData.custormId}}</span>
   <span>客户名称 :  </span><span>{{tableData.custormName}}</span>
   </el-row>
   <el-row>
   <span v-show="false">项目id :  </span><span  v-show="false">{{tableData.programmId}}</span>
   <span>项目名称 :  </span><span>{{tableData.programmName}}</span>
   </el-row>
   <span>开始时间 :  </span><span>{{tableData.startTime}}</span>
   <el-row>
   
   <span>结束时间 :  </span><span>{{tableData.endTime}}</span>
   </el-row>
   <el-row>
     <span>需求编号  :   </span><span>{{tableData.demandNumber}}</span>
   </el-row>
   <el-row>
     <span>需求描述</span>
     <span>
       {{tableData.demandDesc}}
     </span>
   </el-row>
   <el-row>
   <span>岗位信息 :  </span>
   </el-row>
   <el-row>
       <template>
    <el-table
      :data="tableData.list"
      style=""
      height="150px">
       <el-table-column
        prop="demandNumber"
        label="需求编号"
        width="120px" fixed>
      </el-table-column>

      <el-table-column
        prop="analysisId"
        label="需求id"     width="120px">
      </el-table-column>
     
      <el-table-column
        prop="jobName"
        label="工作岗位"  width="120px">
      </el-table-column>
       <el-table-column
        prop="originator"
        label="负责人"  width="120px">
      </el-table-column>
       <el-table-column
        prop="requireNumber"
        label="需要人数"  width="120px">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间"  width="120px">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="结束时间"  width="120px">
      </el-table-column>
      <el-table-column label="操作" width="200px" >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(tableData.list[scope.$index])">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(tableData.list[scope.$index])">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </template>

   </el-row>
   
  </div>
</el-card>

<el-dialog title="需求信息" :visible.sync=" dialogTableVisible" width="800px" >
 <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
  <el-row>
    <el-col :span="8">
  <el-form-item label="需求人数" prop="requireNumber">
    <el-input v-model="ruleForm.name" disabled ></el-input>
  </el-form-item>
    </el-col>
  <el-col :span="8">
  <el-form-item label="请选择项目" prop="programmName">
    <el-select v-model="ruleForm.programmName" placeholder="请选择项目" @change="getCustorm">
      <el-option :label="programm.programmName" :value="programm.programmName" v-for="programm  in programms" :key = "programm.programmId" ></el-option>

    </el-select>
  </el-form-item>
  </el-col>
  </el-row>
  <el-row>
    <el-col :span="6">
      <el-form-item v-show="false" label="客户id" prop="custormId" >
        <el-input v-model="ruleForm.custormId"></el-input>
      </el-form-item>
    </el-col>
     <el-col :span="8">
    <el-form-item label="客户名称" prop="custormName" >
      <el-input v-model="ruleForm.custormName" :disabled="true"></el-input>
    </el-form-item>
     </el-col>
      <el-col :span="6">
    <el-form-item v-show="false" label="部门id" prop="deptId">
      <el-input v-model="ruleForm.deptId"></el-input>
    </el-form-item>
      </el-col>
       <el-col :span="8">
    <el-form-item label="部门名称" prop="deptName" >
      <el-input v-model="ruleForm.deptName" :disabled="true"></el-input>
    </el-form-item>
       </el-col>
  </el-row>
        <el-row>
      <el-col :span="8">
      <!-- <el-form-item > -->
      <el-form-item label="起始时间"  :label-width="formLabelWidth" prop="startTime">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.startTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
  <!-- </el-form-item> -->
      </el-col>
      <el-col :span="8">
      <el-form-item prop="endTime" :label-width="formLabelWidth" >
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.endTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="需求描述" prop="demandDesc" >
      <el-input v-model="ruleForm.demandDesc"></el-input>
    </el-form-item>
    <el-form-item label="需求编号" prop="demandNumber" v-show="false">
      <el-input v-model="ruleForm.demandNumber"></el-input>
    </el-form-item>

  <el-form-item>
<!-- 弹出框Form -->
<el-button type="primary" @click="dialogTableVisible = false">取消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
  </el-form-item>
</el-form>

</el-dialog>

<!-- 详情弹框-->
<el-dialog title="需求信息" :visible.sync="dialogFormVisible" :destroy-on-close='true'>
  <el-form :model="form" ref="form" :rules="dialogRule" label-width="formLabelWidth" >
    <el-row >
      <el-col :span="12">
     <el-form-item label="工作岗位" :label-width="formLabelWidth" required prop="jobName">  
    <el-select v-model="form.jobName" placeholder="工作岗位"  @blur="job">
      <el-option v-for="item in jobs" :label="item.jobName" :key="item.jobId " :value="item.jobName"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="id" :label-width="formLabelWidth" prop="analysisId" v-show="false">
      <el-input v-model="form.analysisId" autocomplete="off"></el-input>
    </el-form-item>
      </el-col>
      <el-col :span="10">
    <el-form-item label="招聘人数" :label-width="formLabelWidth" required prop="requireNumber">
      <el-input v-model="form.requireNumber" autocomplete="off"></el-input>
    </el-form-item>
      </el-col>
    </el-row>
  <el-row>
    <el-form-item label="工作描述" :label-width="formLabelWidth" prop="jobDesc">
      <el-input v-model="form.jobDesc" autocomplete="off"></el-input>
    </el-form-item>
       <el-form-item label="负责人" :label-width="formLabelWidth" required prop="originator">
      <el-input v-model="form.originator" autocomplete="off"></el-input>
    </el-form-item>
  </el-row>
  <el-row>
  
       <el-form-item label="工作地点" :label-width="formLabelWidth">
      <el-input v-model="form.address" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="指定招聘人"  :label-width="formLabelWidth" prop="recuritIds">
    <el-select v-model="form.recuritIds" placeholder="请选择项目" multiple @blur="getRecurit">
      <el-option :label="programm.programmName" :value="programm.programmId" v-for="programm  in programms" :key = "programm.programmId" ></el-option>
    </el-select>
  </el-form-item>
  
  </el-row>
    <el-row>
      <el-col :span="12">
      <el-form-item label="起始时间" required :label-width="formLabelWidth">
      <el-form-item prop="startTime">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
  </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item prop="endTime" :label-width="formLabelWidth">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="update" >更新</el-button>
  </div>
</el-dialog>

<!-- 详情弹框-->
<el-dialog title="需求信息" :visible.sync="dialogAddFormVisible" :destroy-on-close='true'>
  <el-form :model="addForm" ref="addForm" :rules="dialogRule" label-width="formLabelWidth" >
    <el-row >
      <el-col :span="12">
     <el-form-item label="工作岗位" :label-width="formLabelWidth" required prop="jobName">  
    <el-select v-model="addForm.jobName" placeholder="工作岗位"  @blur="job">
      <el-option v-for="item in jobs" :label="item.jobName" :key="item.jobId " :value="item.jobName"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="id" :label-width="formLabelWidth"  prop="analysisId" v-show="false">
      <el-input v-model="addForm.analysisId" autocomplete="off"></el-input>
    </el-form-item>
      </el-col>
      <el-col :span="10">
    <el-form-item label="招聘人数" :label-width="formLabelWidth" required prop="requireNumber">
      <el-input v-model="addForm.requireNumber" autocomplete="off"></el-input>
    </el-form-item>
      </el-col>
    </el-row>
  <el-row>
    <el-form-item label="工作描述" :label-width="formLabelWidth" prop="jobDesc">
      <el-input v-model="addForm.jobDesc" autocomplete="off"></el-input>
    </el-form-item>
       <el-form-item label="负责人" :label-width="formLabelWidth" required prop="originator">
      <el-input v-model="addForm.originator" autocomplete="off"></el-input>
    </el-form-item>
  </el-row>
  <el-row>
  
       <el-form-item label="工作地点" :label-width="formLabelWidth">
      <el-input v-model="addForm.address" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="指定招聘人"  :label-width="formLabelWidth" prop="recuritIds">
    <el-select v-model="addForm.recuritIds" placeholder="请选择项目" multiple @blur="getRecurit">
      <el-option :label="programm.programmName" :value="programm.programmId" v-for="programm  in programms" :key = "programm.programmId" ></el-option>
    </el-select>
  </el-form-item>
  
  </el-row>
    <el-row>
      <el-col :span="12">
      <el-form-item label="起始时间" required :label-width="formLabelWidth">
      <el-form-item prop="startTime">
        <el-date-picker type="date" placeholder="选择日期" v-model="addForm.startTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
  </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item prop="endTime" :label-width="formLabelWidth">
        <el-date-picker type="date" placeholder="选择日期" v-model="addForm.endTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogAddFormVisible = false">取 消</el-button>
     <el-button type="primary" @click="addAnalysis">添加</el-button>
  </div>
</el-dialog>
</div>
</template>
<style>
  .stausBackgroundA {
    background: #8198eb6c;
  }
  .stausBackgroundB {
    background: rgba(58, 153, 58, 0.438);
  }
  .stausBackgroundC {
    background: rgb(212, 105, 105);
  }
  .stausBackgroundD {
    background: gray;
  }
  .box-card {
    width: 400px  !important;
    height: 400px;
}
.el-card {
    margin-left: 30px;
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    color: #303133;
    -webkit-transition: .3s;
    transition: .3s;
    margin-top: 30px;
}
.el-card, .el-message {
    border-radius: 4px;
    overflow: hidden;
    float: left;
}
  
 
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 600px;
  }
</style>
<script>
export default {
     data() {
        return {
          programms:'',
           ruleForm: {
          programmId: '',
          custormId: '',
          custormName: '',
          deptId: '',
          deptName:'',
          startTime: '',
          endTime: '',
          requireNumber: '',
          demandDesc:'',
          demandNumber:''
        },
        jobs:'',
         form: {
           analysisId:'',
          originator:'',
          jobName: '',
          address: '',
          jobDesc: '',
          startTime: '',
          endTime: '',
          skill: [],
          requireNumber: '',
          recuritIds:[],
        },
         addForm: {
          analysisId:'',
          originator:'',
          jobName: '',
          address: '',
          jobDesc: '',
          startTime: '',
          endTime: '',
          skill: [],
          requireNumber: '',
          recuritIds:[],
        },
          analysis:[],
          //大需求表单
          dialogTableVisible: false,
          //小需求表单
          dialogFormVisible: false,
          dialogAddFormVisible :false,
           rules: {
          programmId: [
            { required: true, message: '请选择项目名称', trigger: 'change' }
          ],
         
          custormName: [
            { required: true, message: '客户名称不能为空', trigger: 'change' }
          ],
          deptName: [
            { required: true, message: '部门不能为空', trigger: 'blur' }
          ]
        },
         dialogRule:{
             recuritIds: [
            { type: 'array', required: true, message: '请至少选择一个招聘者', trigger: 'change' }
          ],  
          jobName: [
            { required: true, message: '工作不能为空', trigger: 'change' }
          ],
           originator : [
            { required: true, message: '请选择联系人', trigger: 'change' }
          ],
           startTime: [
            { required: true, message: '请选择时间', trigger: 'change' }
          ],
           endTime: [
            { required: true, message: '请选择时间', trigger: 'change' }
          ],
           requireNumber: [
            { required: true, message: '请选择人数', trigger: 'change' }
          ],
        },
          formLabelWidth: '120px'
        }
      },
      mounted(){
          this.load();

      },
       methods:{
        load(){
        this.$axios.get('/analysis')
        .then(successResponse=>{
            this.analysis=successResponse.data;
            console.log(this.analysis)});

      },
      findData(tableData){
        this. dialogTableVisible = true;
        this.ruleForm = tableData;
        console.log(this.ruleForm);
        
      
      },
       async getCustorm(){
          const{programmId} = this.ruleForm;
          await this.$axios.get('/custDeptProgramm?programmId='+programmId)
          .then(successResponse=>{
            this.ruleForm.custormId = successResponse.data.custormId;
            this.ruleForm.custormName = successResponse.data.custormName;
            this.ruleForm.deptId = successResponse.data.deptId;
            this.ruleForm.deptName = successResponse.data.deptName;
            console.log(this.ruleForm);
          })
        },
         submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.save();
            this.dialogTableVisible = false;
            
          } else {
            alert('error submit!!');
            return false;
          }
        });
      },
      job(){
        this.$axios.get('/job/')
        .then(successResponse=>{
            this.jobs = successResponse.data;
            console.log(this.jobs);
            });

      },
        save(){
         console.log(this.ruleForm);
         
          this.$axios.put('/analysis',this.ruleForm)
          .then(successResponse=>{
            if(successResponse.data.code==200){
              alert("更新成功");
            }else{
              alert("更新失败")
            }

          })

        },
       handleEdit(analysisIndex) {
         this.form = analysisIndex;
         this.dialogFormVisible = true;
        console.log(this.form);
        
      },
      handleDelete(analysisIndex) {
        console.log(analysisIndex.analysisId);
        alert("确定要删除吗，删除后不可恢复");
          this.$axios.delete('/recurit/'+analysisIndex.analysisId)
          .then(successResponse=>{
            if(successResponse.data.code==200){
              
              alert("删除成功");
            }else{
              alert("删除失败");
            }

          })
      },
      getRecurit(){
        this.$axios.get('/programm/programm')
        .then(successResponse=>{
            if(successResponse.data.code == 200){
              this.programms = successResponse.data.data;
              console.log(this.programms);
            }else{
              console.log(successResponse);
            }
            
            });
        
      },
      update(){
        this.$axios.put('/recurit',this.form)
        .then(successResponse=>{
          if(successResponse.data.code==200){
            this.dialogFormVisible = false;
            alert("保存成功");
          }
          else{
            this.dialogFormVisible = false;
            alert("保存失败");
          }
        })
      },
      add(tableData){
        console.log(tableData);
        this.addForm.demandNumber = tableData.demandNumber;
         console.log(this.addForm.demandNumber+"===================="+this.addForm.analysisId);
         console.log(this.addForm);
        this.dialogAddFormVisible = true;
       
        
      },
      addAnalysis(){
          this.$refs['addForm'].validate((valid) => {
          if (valid) {
            //this.dialogFormVisible = true;
             this.$axios.post('/recurit/add',this.addForm)
        .then(successResponse=>{
          if(successResponse.data.code==200){
            this.dialogAddFormVisible = false;
              alert("保存成功");
          }
          else{
            this.dialogAddFormVisible = false;
            alert("保存失败");
          }
            })
            
          } else {
            this.dialogAddFormVisible = false;
            console.log('error submit!!');
            return false;
          }
        });
      },
      addStatus(flag){
        console.log(flag.flag);
        switch(flag.flag){
         case 0 : return 'stausBackgroundA'
         case 1 : return 'stausBackgroundB'
         case 2 : return 'stausBackgroundC'
         case 3 : return 'stausBackgroundD'
        }

      }
    }
}
</script>