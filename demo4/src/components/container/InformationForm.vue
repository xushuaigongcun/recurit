<template>
  <div>
    <div>
      <h1>1.基本信息：</h1>
      <el-form
        :inline="true"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        :model="ruleForm"
        label-width="180px"
        size="mini"
      >
        <el-row class="form-list">
          <el-col :span="8">
            <el-form-item label="姓名" prop="talentName">
              <el-input v-model="ruleForm.talentName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学历" prop="educationBackground">
              <el-input v-model="ruleForm.educationBackground"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="ruleForm.gender" size="medium">
                <el-radio border label="0" :value="0">男</el-radio>
                <el-radio border label="1" :value="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话" prop="telephone">
              <el-input v-model="ruleForm.telephone" @blur="checkPhone"></el-input>
              <font style="display:block;" color="red" size="1px">{{ msgphone.msg }}</font>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="微信">
              <el-input v-model="ruleForm.wechat"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毕业学校" prop="graduationSchool">
              <el-input v-model="ruleForm.graduationSchool"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="目前居住">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号" prop="identified" inline-message="true">
              <el-input
                v-model="ruleForm.identified"
                @blur="checkIdentified"
              ></el-input>
              <font style="display:block;" color="red" size="1px">{{ msg }}</font>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入者" prop="entryPeople">
              <el-input v-model="ruleForm.entryPeople"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="招聘者" prop="recuritPeople">
              <el-input v-model="ruleForm.recuritPeople"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毕业时间" prop="graduationTime">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.graduationTime"
                  style="width: 200%"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="来源渠道">
              <el-select v-model="ruleForm.origin" placeholder="请选择">
                <el-option
                  v-for="item in origins"
                  :label="item.className"
                  :key="item.classId"
                  :value="item.className"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="何时到岗">
              <el-select v-model="ruleForm.workTime" placeholder="请选择">
                <el-option
                  v-for="item in works"
                  :label="item.className"
                  :key="item.classId"
                  :value="item.className"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最低期望薪资">
              <el-select v-model="ruleForm.minSalary" placeholder="请选择">
                <el-option
                  v-for="item in minSalary"
                  :label="item.className"
                  :key="item.classId"
                  :value="item.className"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  label="最高期望薪资">
              <el-select v-model="ruleForm.maxSalary" placeholder="请选择">
                <el-option
                  :label="item.className"
                  :value="item.className"
                  v-for="item in maxSalary"
                  :key="item.classId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="拥有技能" prop="skill">
              <el-checkbox-group v-model="ruleForm.skill">
                <el-checkbox-button
                  v-for="item in skill"
                  :key="item.classId"
                  :label="item.className"
                  :value="item.className"
                ></el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="save-btn">
          <el-form-item size="medium" align-center :inline="false">
            <el-button type="primary" @click="onSubmit('ruleForm')"
              >保存</el-button
            >
          </el-form-item>
        </el-row>
      </el-form>
    </div>

    <div>
      <h1>2.岗位分配：</h1>
      <div>
        <el-form size="mini" :inline="true" ref="postForm" :model="postForm" label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="客户名称" prop="customerName">
                <el-select class="select-slot" v-model="postForm.customerName"
                @change="selectedCustomer"
                filterable placeholder="请选择">
                  <el-option
                    v-for="item in postForm.customerNameList"
                      :key="item.custormId"
                      :label="item.custormName"
                      :value="item.custormId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="postForm.customerName">
              <el-form-item label="部门名称" prop="jobName">
                <el-select class="select-slot" v-model="postForm.department"
                @change="selectedDepartment"
                filterable placeholder="请选择">
                  <el-option
                    v-for="item in postForm.departmentList"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="postForm.department">
              <el-form-item label="项目名称" prop="projectName">
                <el-select class="select-slot" v-model="postForm.projectName"
                @change="selectedProjectName"
                filterable placeholder="请选择">
                  <el-option
                    v-for="item in postForm.projectNameList"
                    :key="item.programmId"
                    :label="item.programmName"
                    :value="item.programmId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="postForm.projectName">
              <el-form-item label="需求编号" prop="projectName">
                <el-select class="select-slot" v-model="postForm.demandName"
                @change="selectedDemandName"
                filterable placeholder="请选择">
                  <el-option
                    v-for="item in postForm.demandNameList"
                    :key="item.demandNumber"
                    :value="item.demandNumber"
                    :label="item.demandNumber">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="postForm.demandName">
              <el-form-item label="工作岗位" prop="jobName">
                <el-select class="select-slot" v-model="postForm.jobName"
                filterable placeholder="请选择">
                  <el-option
                    v-for="item in postForm.jobNameList"
                    :key="item.analysisId"
                    :label="item.jobName"
                    :value="item.analysisId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="save-btn">
            <el-form-item size="medium" align-center :inline="false">
              <el-button type="primary" @click="onSubmitPost('postForm')"
                >保存</el-button
              >
            </el-form-item>
          </el-row>

          <!-- <el-row style="text-align: center;">
            <el-form-item size="medium">
              <el-button type="info" @click="goBack">返回</el-button>
              <el-button type="primary" @click="goSave">下一步</el-button>
            </el-form-item>
          </el-row> -->
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InformationForm",
  props: {
    candidateData: {
      type: Object,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      postForm:{
        demandName: '',
        demandNameList: [],
        jobName: '',
        jobNameList: [],
        projectName: '',
        projectNameList: [],
        customerName: '',
        customerNameList: [],
        department: '',
        departmentList: [],
      },
      ruleForm: {
        talentName: "",
        educationBackground: "",
        gender: "",
        telephone: "",
        graduationSchool: "",
        address: "",
        identified: "",
        entryPeople: "",
        recuritPeople: "",
        graduationTime: "",
        skillNames: [],
        // skills:{
        //   identified:'',
        //   skillName:''
        // },
        skill: [],

        minSalary: "",
        maxSalary: "",
        origin: "",
        work: "",
        wechat: "",
      },
      skill: [],
      minSalary: [],
      maxSalary: [],
      works: [],
      origins: [],
      msgphone: { data: "", code: "", msg: "" },
      msg: "",
      rules: {
        talentName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        educationBackground: [
          { required: true, message: "请输入学历", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        identified: [
          { required: true, message: "请输入身份证", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "证件号码格式有误！",
            trigger: "blur",
          },
        ],
        telephone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "请输入正确的号码格式",
            trigger: "blur",
          },
        ],
        graduationSchool: [
          { required: true, message: "请输入毕业学校", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        entryPeople: [
          { required: true, message: "请输入录入人", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        graduationTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        skill: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个技能",
            trigger: "change",
          },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
      stepActive: '1',
      getCandidateData: {},
    };
  },
  created(){
    if(this.candidateData !== null){
      this.getCandidateData = this.candidateData
      this.ruleForm = this.getCandidateData
    }
  },
  mounted() {
    this.salary();
    this.load();
    this.work();
    this.origin();
    this.getCustormList();//客户列表
  },
  methods: {
    //选择客户
    selectedCustomer(){
      this.postForm.department = ""
      this.postForm.projectName = ""
      this.postForm.demandName = ""
      this.postForm.jobName = ""
      //调用部门接口
      this.getDeptList()
    },
    //选择部门
    selectedDepartment(){
      this.postForm.projectName = ""
      this.postForm.demandName = ""
      this.postForm.jobName = ""
      //调用项目接口
      this.getProjectList();//项目列表
    },
    //选择项目
    selectedProjectName(){
      this.postForm.demandName = ""
      this.postForm.jobName = ""
      //调用需求接口
      this.getDemandList()//需求列表
    },
    selectedDemandName(){
      this.postForm.jobName = ""
      //调用岗位列表
      this.getJobNameList();//岗位列表
    },
    onSubmitPost(forName){
      this.$refs[forName].validate((valid) => {
        if (valid) {
          //保存接口
          this.$axios
        .post("/analysisJobTalent/save", {
          demandNumber: this.postForm.demandName,
          custormId: this.postForm.customerName,
          deptId: this.postForm.department,
          programmId: this.postForm.projectName,
          analysisId: this.postForm.jobName,
          talentId: this.getCandidateData.talentId,
        })
        .then((successResponse) => {
          if (successResponse.data.code == 200) {
            this.$router.back()
          } else {
            alert(successResponse.data.msg);
          }
        });
        } else {
          return false;
        }
      });
    },
    onSubmit(forName) {
      //校验表单
      this.$refs[forName].validate((valid) => {
        if (valid) {
          this.sendform();
        } else {
          return false;
        }
      });
    },
    //提交表单给后台
    sendform() {
      const {
        talentName,
        identified,
        educationBackground,
        wechat,
        gender,
        telephone,
        graduationSchool,
        address,
        entryPeople,
        recuritPeople,
        graduationTime,
        skill,
        minSalary,
        maxSalary,
        origin,
        workTime,
      } = this.ruleForm;
      console.log()
      var skills = new Array();
      for (var i of skill) {
        var skillsp = { identified: "", skillId: "", skillName: "" };
        skillsp.skillName = i;
        // this.sizeForm.skills.push(skillsp);
        skills.push(skillsp);
      }
      this.$axios
        .post("/talentPool/save", {
          talentName,
          identified,
          educationBackground,
          wechat,
          gender,
          telephone,
          graduationSchool,
          address,
          entryPeople,
          recuritPeople,
          graduationTime,
          skill,
          minSalary,
          maxSalary,
          origin,
          workTime,
        })
        .then((successResponse) => {
          if (successResponse.data.code == 200) {
            this.$router.push({ path: "/list" });
          } else {
            alert(successResponse.data.msg);
          }
        });
    },
    load() {
      this.$axios
        .get("/directionary/dir?directionId=5")
        .then((successResponse) => {
          this.skill = successResponse.data;
          console.log(this.skill)
        });
    },
    salary() {
      this.$axios
        .get("/directionary/dir?directionId=1")
        .then((successResponse) => {
          this.minSalary = successResponse.data;
          this.maxSalary = successResponse.data;
        });
    },
    work() {
      this.$axios
        .get("/directionary/dir?directionId=3")
        .then((successResponse) => {
          this.works = successResponse.data;
        });
    },
    origin() {
      this.$axios
        .get("/directionary/dir?directionId=2")
        .then((successResponse) => {
          this.origins = successResponse.data;
        });
    },
    checkPhone() {
      const { telephone } = this.ruleForm;
      this.$axios
        .get("/talentPool/checkPhone?telephone=" + telephone)
        .then((successResponse) => {
          this.msgphone = successResponse.data;
        });
    },
    checkIdentified() {
      const { identified } = this.ruleForm;
      this.$axios
        .get("/talentPool/checkIdentified?identified=" + identified)
        .then((successResponse) => {
          this.msg = successResponse.data.msg;
        });
    },
    //获取所有客户列表
    getCustormList(){
      this.$axios.get("/custorm/").then((res) => {
        this.postForm.customerNameList = res.data;
      }).catch((err)=>{
        this.postForm.customerNameList = []
        this.$message.error('服务器内部错误')
      });
    },
    //部门列表
    getDeptList(){
      this.$axios.get("/custormDept?custormId="+this.postForm.customerName).then((res) => {
        this.postForm.departmentList = res.data;
      }).catch((err)=>{
        this.postForm.departmentList = []
        this.$message.error('服务器内部错误')
      });
    },
    //获取所有项目列表
    getProjectList(){
      this.$axios.get(`/custDeptProgramm/getProgramm?custormId=${this.postForm.customerName}&deptId=${this.postForm.department}`).then((res) => {
       this.postForm.projectNameList = res.data;
      }).catch((err)=>{
        this.postForm.projectNameList = []
        this.$message.error('服务器内部错误')
      });
    },
    //获取需求列表
    getDemandList(){
      console.log(this.postForm.demandName)
      this.$axios.get(`/analysis/programmId?programmId=${this.postForm.projectName}`).then((res) => {
        this.postForm.demandNameList = res.data;
      }).catch((err)=>{
        this.postForm.demandNameList = []
        this.$message.error('服务器内部错误')
      });
    },
    //获取岗位列表
    getJobNameList(){
      this.$axios.get(`/recurit/getAnalysisJob?demandNumber=${this.postForm.demandName}`).then((res) => {
        this.postForm.jobNameList = res.data;
      }).catch((err)=>{
        this.postForm.jobNameList = []
        this.$message.error('服务器内部错误')
      });
    },
    // 重置搜索条件
    resetSearch(){
      this.$refs['postForm'].resetFields();
    },
    //返回
    goBack(){
      this.stepActive = '1'
    },
    //保存 下一步
    goSave(){
      // this.$emit('updateStep', 2)
      //保存接口

      console.log('保存 进入第二步')
    },
  },
};
</script>

<style >
.el-form-item--mini .el-form-item__content,
.el-form-item--mini .el-form-item__label {
  line-height: 30px;
}
.el-form--inline .el-form-item {
  margin-right: 10px;
  vertical-align: top;
}
.save-btn{
  text-align: center;
}
.form-list{
  display: flex;
  flex-wrap: wrap;
}
</style>
