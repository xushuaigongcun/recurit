<template>
<div>
    <el-form  :inline="true" :rules="rules" ref="ruleForm" class='demo-ruleForm' :model="ruleForm" label-width="80px" size="mini">
  <el-row>
  <el-form-item label="姓名" prop="talentName">
    <el-input v-model="ruleForm.talentName"></el-input>
  </el-form-item>
  <el-form-item label="学历" prop="educationBackground">
    <el-input v-model="ruleForm.educationBackground"></el-input>
  </el-form-item>
    <el-form-item label="性别" prop="gender">
    <el-radio-group v-model="ruleForm.gender" size="medium" >
      <el-radio border label="0" :value="0">男</el-radio>
      <el-radio border label="1" :value="1">女</el-radio>
    </el-radio-group>
  </el-form-item>
  </el-row>
  <el-row>
   <el-form-item label="电话" prop="telephone">
    <el-input v-model="ruleForm.telephone" @blur="checkPhone"></el-input>
  </el-form-item>
  <font color = "red" size="1px">{{msgphone.msg}}</font>
   <el-form-item label="微信">
    <el-input v-model="ruleForm.wechat"></el-input>
  </el-form-item>
   <el-form-item label="毕业学校"  prop="graduationSchool">
    <el-input v-model="ruleForm.graduationSchool"></el-input>
  </el-form-item>
  </el-row>
  <el-row>
  <el-form-item label="目前居住">
    <el-input v-model="ruleForm.address"></el-input>
  </el-form-item>
   <el-form-item label="身份证号" prop="identified" inline-message="true">
    <el-input v-model="ruleForm.identified" @blur="checkIdentified"></el-input>
  </el-form-item>
  <font color = "red" size = '1px' >{{msg}}</font>
  <el-form-item label="录入者" prop="entryPeople">
    <el-input v-model="ruleForm.entryPeople"  ></el-input>
  </el-form-item>
   </el-row>
   <el-row>
  <el-form-item label="招聘者" prop="recuritPeople">
    <el-input v-model="ruleForm.recuritPeople"></el-input>
  </el-form-item>
 <el-form-item label="毕业时间" prop="graduationTime">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.graduationTime" style="width: 200%;"></el-date-picker>
    </el-col>
  </el-form-item>
    <el-form-item label="来源渠道">
    <el-select v-model="ruleForm.origin" placeholder="渠道来源"  >
      <el-option v-for="item in origins" :label="item.className" :key="item.classId " :value="item.className"></el-option>
    </el-select>
  </el-form-item>
  </el-row>
  <el-row>
     <el-form-item label="何时到岗">
    <el-select v-model="ruleForm.workTime" placeholder="何时到岗"  >
      <el-option v-for="item in works" :label="item.className" :key="item.classId " :value="item.className"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="期望薪资">
    <el-select v-model="ruleForm.minSalary" placeholder="最低期望薪资">
      <el-option v-for="item in minSalary" :label="item.className" :key="item.classId " :value="item.className"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item>
    <el-select v-model="ruleForm.maxSalary" placeholder="最高期望薪资">
      <el-option :label="item.className" :value="item.className" v-for="item in maxSalary" :key='item.classId'></el-option>
     </el-select>
  </el-form-item>
</el-row>
  <el-form-item label="拥有技能" prop="skills1">
    <el-checkbox-group v-model="ruleForm.skills1" >
      <el-checkbox-button :label="skill.className" v-for="skill in skills1" :key="skill.classId" :value="skill.className"></el-checkbox-button>
    </el-checkbox-group>
  </el-form-item>
 <el-row>
<el-form-item size="large" align-center :inline= "false">
    <el-button type="primary" @click="onSubmit('ruleForm')" >保存</el-button>
    <el-button align-center>取消</el-button>
  </el-form-item>
 </el-row>

</el-form>
</div>
</template>
<style >
.el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__label {
    line-height: 30px;
}
.el-form--inline .el-form-item {
    margin-right: 10px;
    vertical-align: top;
}

</style>

<script>
  export default {
    name: 'InformationForm',
    mounted(){
        this.salary();
        this.load();
        this.work();
        this.origin();
    },
    data() {
      return {
        ruleForm: {
          talentName: '',
          educationBackground: '',
          gender: '',
          telephone: '',
          graduationSchool: '',
          address: '',
          identified: '',
          entryPeople: '',
          recuritPeople: '',
          graduationTime: '',
          // skills:{
          //   identified:'',
          //   skillName:''
          // },
          skills1:[],

          minSalary:'',
          maxSalary:'',
          origin:'',
          work:'',
          wechat:''

        },
        skills1:[],
        minSalary:[],
        maxSalary:[],
        works:[],
        origins:[],
        msgphone:{data:'',code:'',msg:''},
        msg:"",
         rules: {
          talentName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
           // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          educationBackground: [
            { required: true, message: '请输入学历', trigger: 'blur' },
           // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          identified: [
            { required: true, message: '请输入身份证', trigger: 'blur' },
           // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
           {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '证件号码格式有误！',
            trigger: 'blur'
          }
          ],
          telephone: [
            { required: true, message: '请输入电话', trigger: 'blur' },
           // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
           {pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'blur'}
          ],
           graduationSchool: [
            { required: true, message: '请输入毕业学校', trigger: 'blur' },
           // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          entryPeople: [
            { required: true, message: '请输入录入人', trigger: 'blur' },
           // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          graduationTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          skills1: [
            { type: 'array', required: true, message: '请至少选择一个技能', trigger: 'change' }
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ]
        },
      };
    },

    methods: {
      onSubmit(forName) {
        //校验表单
        this.$refs[forName].validate((valid) => {
          if (valid) {
           // alert('submit!');
           this.sendform();
          } else {
            alert('提交错误，请查看是否不满足校验规则');
            return false;
          }
        });
      },
        //提交表单给后台
      sendform() {
        const {
          talentName,identified,educationBackground,wechat,
          gender,telephone,graduationSchool,address,entryPeople,
          recuritPeople,graduationTime,skills1,minSalary,maxSalary, origin,workTime
        } = this.ruleForm;
        var skills = new Array();
        for(var i of skills1){
          var skillsp = {identified:'',skillId:'',skillName:''}
            skillsp.skillName = i;
          // this.sizeForm.skills.push(skillsp);
          skills.push(skillsp);
        }
         this.$axios.post('/talentPool/save',{
          talentName,identified,educationBackground,wechat,
          gender,telephone,graduationSchool,address,entryPeople,recuritPeople,
          graduationTime,skills,minSalary,maxSalary,origin,workTime
          })
        .then(successResponse=>{
          if(successResponse.data.code==200){

            this.$router.push({ path:'/list'});}
            else{
              alert(successResponse.data.msg)
            }
          });

      },
     load(){
        this.$axios.get('/directionary/dir?directionId=5')
        .then(successResponse=>{
            this.skills1=successResponse.data;
            });

        },
    salary(){
      this.$axios.get('/directionary/dir?directionId=1')
        .then(successResponse=>{
            this.minSalary=successResponse.data;
            this.maxSalary=successResponse.data;
            });

      },
       work(){
      this.$axios.get('/directionary/dir?directionId=3')
        .then(successResponse=>{
            this.works=successResponse.data;
            });

      },
       origin(){
      this.$axios.get('/directionary/dir?directionId=2')
        .then(successResponse=>{
            this.origins=successResponse.data;
            });

      },
      checkPhone(){
        const{telephone} = this.ruleForm
      this.$axios.get('/talentPool/checkPhone?telephone='+telephone)
        .then(successResponse=>{
            this.msgphone=successResponse.data;
            });
      } ,
       checkIdentified(){
        const{identified} = this.ruleForm
      this.$axios.get('/talentPool/checkIdentified?identified='+identified)
        .then(successResponse=>{
            this.msg=successResponse.data.msg;
            });
      },

    },

  };
</script>

