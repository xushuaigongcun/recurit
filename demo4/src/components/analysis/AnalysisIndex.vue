<template>
  <div>
    <!-- 头部 form表单查询 -->
    <el-row class="search-form">
      <el-form size="mini" :inline="true" ref="searchForm" :model="searchForm" label-width="80px">
        <el-row>
          <!-- <el-col :span="8"> -->
            <el-form-item prop="demandNumber">
              <el-input v-model="searchForm.demandNumber" placeholder="请输入">
                <span slot="prefix" class="el-icon-edit">需求编号</span>
              </el-input>
            </el-form-item>
          <!-- </el-col>
          <el-col :span="8"> -->
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
          <!-- </el-col>
          <el-col :span="8"> -->
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
          </el-row>
          <el-row>
          <!-- </el-col>

          <el-col :span="12"> -->
            <el-form-item prop="startDate">
              <el-date-picker
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="开始日期"
              v-model="searchForm.startDate"
              style="width: 100%;"></el-date-picker>
            </el-form-item>
            <span class="line">-</span>
            <el-form-item prop="endDate">
              <el-date-picker
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="结束日期"
              v-model="searchForm.endDate"
              style="width: 100%;"></el-date-picker>
            </el-form-item>
          <!-- </el-col> -->
        </el-row>

        <el-row style="text-align: center;">
          <el-form-item>
            <el-button type="info" @click="resetSearch">重置</el-button>
            <el-button type="primary" @click="goSearch">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-row>

    <!-- 新建 -->
    <el-row style="text-align:left;padding-left: 20px;">
      <el-button @click="newDemand" size="mini">新建需求</el-button>
    </el-row>

    <!-- tabs -->
    <el-tabs type="card" class="tabs-nav" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="1"></el-tab-pane>
      <el-tab-pane label="部门维度" name="2"></el-tab-pane>
      <el-tab-pane label="客户维度" name="3"></el-tab-pane>
      <el-tab-pane label="项目维度" name="4"></el-tab-pane>
    </el-tabs>

    <!-- 需求信息列表 -->
    <el-row v-if="analysis!==undefined && analysis.length>0">
      <el-col :span="6" v-for="(tableData, index) in analysis" :key="index">
        <el-card class="box-card">
          <div slot="header" class="clearfix" :class="addStatus(tableData)">
            <span>{{getTitle()}}</span>
            <i class="el-icon-close del-demand" title="删除" @click="deleteDemand(tableData)"></i>
          </div>

          <div class="demand-list">
            <el-row>
              <!-- <span v-show="false">客户id：</span
              ><span v-show="false">{{ tableData.custormId }}</span> -->
              <span>客户名称：</span>
              <span>{{ tableData.custormName }}</span>
            </el-row>

            <el-row>
              <!-- <span v-show="false">项目id：</span
              ><span v-show="false">{{ tableData.programmId }}</span> -->
              <span>项目名称：</span>
              <span>{{ tableData.programmName }}</span>
            </el-row>

            <el-row>
              <span>开始时间：</span>
              <span>{{ tableData.startTime }}</span>
            </el-row>

            <el-row>
              <span>结束时间：</span>
              <span>{{ tableData.endTime }}</span>
            </el-row>

            <el-row>
              <span>需求编号：</span>
              <span>{{ tableData.demandNumber }}</span>
            </el-row>

            <el-row>
              <span>需求描述：</span>
              <span>
                {{ tableData.demandDesc }}
              </span>
            </el-row>

            <!-- <el-row>
              <span>岗位信息 : </span>
            </el-row> -->
            <el-row style="margin-top: 10px;">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="findData(tableData)"> 修改</el-button>
              <el-button size="mini" type="text" icon="el-icon-circle-plus-outline" @click="add(tableData)"> 添加</el-button>
              <el-button size="mini" type="text" icon="el-icon-tickets" @click="detailInfo(tableData.list)"> 详情 </el-button>
              <el-button size="mini" type="text" icon="el-icon-circle-close" @click="closeOrActivation(tableData)"> {{tableData.flag==2?"激活":"关闭"}} </el-button>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row v-if="analysis===undefined || analysis.length==0">
      <div class="no-data">
        <el-image :src="require('../../assets/images/common/no-data.png')"></el-image>
        <span>暂无数据</span>
      </div>
    </el-row>

    <!-- 岗位详情 弹框 -->
    <el-dialog
      title="岗位详情"
      :visible.sync="dialogDetailVisible"
      width="800"
      height="100px"
    >
      <el-table :data="detailData" height="auto">
        <el-table-column
          prop="demandNumber"
          label="需求编号"
          width="120px"
          fixed
        >
        </el-table-column>

        <el-table-column prop="analysisId" label="需求id" width="120px">
        </el-table-column>

        <el-table-column prop="jobName" label="工作岗位" width="120px">
        </el-table-column>
        <el-table-column prop="originator" label="负责人" width="120px">
        </el-table-column>
        <el-table-column
          prop="requireNumber"
          label="需要人数"
          width="120px"
        >
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="120px">
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="120px">
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(detailData[scope.$index])"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(detailData[scope.$index])"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 修改需求信息 弹框 -->
    <el-dialog
      title="需求信息"
      :visible.sync="dialogTableVisible"
      width="800px"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="需求人数" prop="requireNumber">
              <el-input v-model="ruleForm.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="请选择项目" prop="programmName">
              <el-select
                v-model="ruleForm.programmName"
                placeholder="请选择项目"
                @change="getCustorm"
              >
                <el-option
                  :label="programm.programmName"
                  :value="programm.programmName"
                  v-for="programm in programms"
                  :key="programm.programmId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item v-show="false" label="客户id" prop="custormId">
              <el-input v-model="ruleForm.custormId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户名称" prop="custormName">
              <el-input
                v-model="ruleForm.custormName"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item v-show="false" label="部门id" prop="deptId">
              <el-input v-model="ruleForm.deptId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="部门名称" prop="deptName">
              <el-input v-model="ruleForm.deptName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="起始时间"
              :label-width="formLabelWidth"
              prop="startTime"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.startTime"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="endTime" :label-width="formLabelWidth">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.endTime"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="需求描述" prop="demandDesc">
          <el-input v-model="ruleForm.demandDesc"></el-input>
        </el-form-item>

        <el-form-item label="需求编号" prop="demandNumber" v-show="false">
          <el-input v-model="ruleForm.demandNumber"></el-input>
        </el-form-item>

        <el-form-item>
          <!-- 弹出框Form -->
          <el-button type="primary" @click="dialogTableVisible = false"
            >取消</el-button
          >
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即修改</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑 弹框-->
    <el-dialog
      title="需求信息"
      :visible.sync="dialogFormVisible"
      :destroy-on-close="true"
    >
      <el-form
        :model="form"
        ref="form"
        :rules="dialogRule"
        label-width="formLabelWidth"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="工作岗位"
              :label-width="formLabelWidth"
              required
              prop="jobName"
            >
              <el-select
                v-model="form.jobName"
                placeholder="工作岗位"
                @blur="job"
              >
                <el-option
                  v-for="item in jobs"
                  :label="item.jobName"
                  :key="item.jobId"
                  :value="item.jobName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="id"
              :label-width="formLabelWidth"
              prop="analysisId"
              v-show="false"
            >
              <el-input v-model="form.analysisId" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="招聘人数"
              :label-width="formLabelWidth"
              required
              prop="requireNumber"
            >
              <el-input
                v-model="form.requireNumber"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item
            label="工作描述"
            :label-width="formLabelWidth"
            prop="jobDesc"
          >
            <el-input v-model="form.jobDesc" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="负责人"
            :label-width="formLabelWidth"
            required
            prop="originator"
          >
            <el-input v-model="form.originator" autocomplete="off"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="工作地点" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="指定招聘人"
            :label-width="formLabelWidth"
            prop="recuritIds"
          >
            <el-select
              v-model="form.recuritIds"
              placeholder="请选择项目"
              multiple
              @blur="getRecurit"
            >
              <el-option
                :label="programm.programmName"
                :value="programm.programmId"
                v-for="programm in programms"
                :key="programm.programmId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="起始时间"
              required
              :label-width="formLabelWidth"
            >
              <el-form-item prop="startTime">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.startTime"
                  style="width: 100%"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="endTime" :label-width="formLabelWidth">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.endTime"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">更新</el-button>
      </div>
    </el-dialog>

    <!-- 添加需求 弹框-->
    <el-dialog
      title="需求信息"
      :visible.sync="dialogAddFormVisible"
      :destroy-on-close="true"
    >
      <el-form
        :model="addForm"
        ref="addForm"
        :rules="dialogRule"
        label-width="formLabelWidth"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="工作岗位"
              :label-width="formLabelWidth"
              required
              prop="jobName"
            >
              <el-select
                v-model="addForm.jobName"
                placeholder="工作岗位"
                @blur="job"
              >
                <el-option
                  v-for="item in jobs"
                  :label="item.jobName"
                  :key="item.jobId"
                  :value="item.jobName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="id"
              :label-width="formLabelWidth"
              prop="analysisId"
              v-show="false"
            >
              <el-input
                v-model="addForm.analysisId"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="招聘人数"
              :label-width="formLabelWidth"
              required
              prop="requireNumber"
            >
              <el-input
                v-model="addForm.requireNumber"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item
            label="工作描述"
            :label-width="formLabelWidth"
            prop="jobDesc"
          >
            <el-input v-model="addForm.jobDesc" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="负责人"
            :label-width="formLabelWidth"
            required
            prop="originator"
          >
            <el-input
              v-model="addForm.originator"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="工作地点" :label-width="formLabelWidth">
            <el-input v-model="addForm.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="指定招聘人"
            :label-width="formLabelWidth"
            prop="recuritIds"
          >
            <el-select
              v-model="addForm.recuritIds"
              placeholder="请选择项目"
              multiple
              @blur="getRecurit"
            >
              <el-option
                :label="programm.programmName"
                :value="programm.programmId"
                v-for="programm in programms"
                :key="programm.programmId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="起始时间"
              required
              :label-width="formLabelWidth"
            >
              <el-form-item prop="startTime">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="addForm.startTime"
                  style="width: 100%"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="endTime" :label-width="formLabelWidth">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="addForm.endTime"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
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
<script>
export default {
  data() {
    return {
      programms: "",
      ruleForm: {
        programmId: "",
        custormId: "",
        custormName: "",
        deptId: "",
        deptName: "",
        startTime: "",
        endTime: "",
        requireNumber: "",
        demandDesc: "",
        demandNumber: "",
      },
      jobs: "",
      form: {
        analysisId: "",
        originator: "",
        jobName: "",
        address: "",
        jobDesc: "",
        startTime: "",
        endTime: "",
        skill: [],
        requireNumber: "",
        recuritIds: [],
      },
      addForm: {
        analysisId: "",
        originator: "",
        jobName: "",
        address: "",
        jobDesc: "",
        startTime: "",
        endTime: "",
        skill: [],
        requireNumber: "",
        recuritIds: [],
      },
      analysis: [],
      //大需求表单
      dialogTableVisible: false,
      //小需求表单
      dialogFormVisible: false,
      dialogAddFormVisible: false,
      rules: {
        programmId: [
          { required: true, message: "请选择项目名称", trigger: "change" },
        ],

        custormName: [
          { required: true, message: "客户名称不能为空", trigger: "change" },
        ],
        deptName: [
          { required: true, message: "部门不能为空", trigger: "blur" },
        ],
      },
      dialogRule: {
        recuritIds: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个招聘者",
            trigger: "change",
          },
        ],
        jobName: [
          { required: true, message: "工作不能为空", trigger: "change" },
        ],
        originator: [
          { required: true, message: "请选择联系人", trigger: "change" },
        ],
        startTime: [
          { required: true, message: "请选择时间", trigger: "change" },
        ],
        endTime: [{ required: true, message: "请选择时间", trigger: "change" }],
        requireNumber: [
          { required: true, message: "请选择人数", trigger: "change" },
        ],
      },
      formLabelWidth: "120px",
      dialogDetailVisible: false, //需求详情
      detailData: [],//详情表格列表
      searchForm: {//头部搜索
        demandNumber: '',
        projectName: '',
        projectNameList: [],
        customerName: '',
        customerNameList: [],
        startDate: '',
        endDate: '',
      },
      activeName: '1',//默认选中

    };
  },
  mounted() {
    this.load();
    this.getCustormList();//客户列表
    this.getProjectList();//项目列表
  },
  methods: {
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
    // 点击新建需求
    newDemand(){
      this.$router.push({path:'/addAnalysis',query:{type:'new'}})
    },
    // 点击详情
    detailInfo(list) {
      this.detailData = list
      this.dialogDetailVisible = true;
    },
    //关闭、激活
    closeOrActivation(data){
      this.$confirm('确定'+(data.flag==2?"激活":'关闭')+'该需求?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let flag = data.flag==2?'0':'2'//flag： 2关闭，0激活
        this.$axios.put("/analysis/updateAnalysis?demandNumber="+data.demandNumber+"&flag="+flag).then((successResponse) => {
          this.$message({
            type: 'success',
            message: data.flag==2?"激活成功":'关闭成功'
          })
          //更新列表
          this.load();//请求tabs列表接口
        }).catch((err)=>{
          this.analysis = []
          this.$message.error('服务器内部错误')
        });
      }).catch((err)=>{
      });
    },
    load() {
      this.$axios.get("/analysis").then((successResponse) => {
        this.analysis = successResponse.data;
      }).catch((err)=>{
        this.analysis = []
        this.$message.error('服务器内部错误')
      });
    },
    findData(tableData) {
      this.dialogTableVisible = true;
      this.ruleForm = tableData;
    },
    async getCustorm() {
      const { programmId } = this.ruleForm;
      await this.$axios
        .get("/custDeptProgramm?programmId=" + programmId)
        .then((successResponse) => {
          this.ruleForm.custormId = successResponse.data.custormId;
          this.ruleForm.custormName = successResponse.data.custormName;
          this.ruleForm.deptId = successResponse.data.deptId;
          this.ruleForm.deptName = successResponse.data.deptName;
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.save();
          this.dialogTableVisible = false;
        } else {
          alert("error submit!!");
          return false;
        }
      });
    },
    job() {
      this.$axios.get("/job/").then((successResponse) => {
        this.jobs = successResponse.data;
      });
    },
    save() {
      this.$axios.put("/analysis", this.ruleForm).then((successResponse) => {
        if (successResponse.data.code == 200) {
          alert("更新成功");
        } else {
          alert("更新失败");
        }
      });
    },
    handleEdit(analysisIndex) {
      this.form = analysisIndex;
      this.dialogFormVisible = true;
    },
    handleDelete(analysisIndex) {
      alert("确定要删除吗，删除后不可恢复");
      this.$axios
        .delete("/recurit/" + analysisIndex.analysisId)
        .then((successResponse) => {
          if (successResponse.data.code == 200) {
            alert("删除成功");
          } else {
            alert("删除失败");
          }
        });
    },
    getRecurit() {
      this.$axios.get("/programm/programm").then((successResponse) => {
        if (successResponse.data.code == 200) {
          this.programms = successResponse.data.data;
        } else {
        }
      });
    },
    update() {
      this.$axios.put("/recurit", this.form).then((successResponse) => {
        if (successResponse.data.code == 200) {
          this.dialogFormVisible = false;
          alert("保存成功");
        } else {
          this.dialogFormVisible = false;
          alert("保存失败");
        }
      });
    },
    add(tableData) {
      this.addForm.demandNumber = tableData.demandNumber;
      this.dialogAddFormVisible = true;
    },
    addAnalysis() {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          //this.dialogFormVisible = true;
          this.$axios
            .post("/recurit/add", this.addForm)
            .then((successResponse) => {
              if (successResponse.data.code == 200) {
                this.dialogAddFormVisible = false;
                alert("保存成功");
              } else {
                this.dialogAddFormVisible = false;
                alert("保存失败");
              }
            });
        } else {
          this.dialogAddFormVisible = false;
          return false;
        }
      });
    },
    addStatus(flag) {
      switch (flag.flag) {
        case 0:
          return "stausBackgroundA";
        case 1:
          return "stausBackgroundB";
        case 2:
          return "stausBackgroundC";
        case 3:
          return "stausBackgroundD";
      }
    },
    // 搜索
    goSearch(){
        this.$axios
        .post("/analysis/getAnalysis", {
          custormName: this.searchForm.customerName,
          demandNumber: Number(this.searchForm.demandNumber),
          endTime: this.searchForm.endDate,
          programmName: this.searchForm.projectName,
          startTime: this.searchForm.startDate
        })
        .then((successResponse) => {
          if (successResponse.data.code == 200) {
            this.analysis = successResponse.data.data
          } else {
            this.analysis = []
            this.$message.error(successResponse.data.msg)
          }
        })
        .catch( (err)=> {
          this.analysis = []
          this.$message.error('服务器错误')
        });
    },
    // 重置搜索条件
    resetSearch(){
      this.$refs['searchForm'].resetFields();
    },
    handleClick(){
      this.load();//请求tabs列表接口
      this.getTitle()//更新标题
    },
    getTitle(){
      switch (this.activeName) {
        case "1":
          return "全部需求";
        case "2":
          return "部门需求";
        case "3":
          return "客户需求";
        case "4":
          return "项目需求";
      }
    },
    //删除需求
    deleteDemand(data){
      this.$confirm('确定删除该需求?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
        .delete(`/analysis/deleteAnalysis`,{
          params: {
            demandNumber: data.demandNumber
          }
        })
        .then((successResponse) => {
          if (successResponse.data.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            //更新列表
            this.load();//请求tabs列表接口
          } else {
            // this.analysis = []
            this.$message.error(successResponse.data.msg)
          }
        })
        .catch( (err)=> {
          // this.analysis = []
          this.$message.error('服务器错误')
        });
      }).catch(() => {
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.stausBackgroundA {
  background: #409EFF;
}
.stausBackgroundB {
  background: #67C23A;
}
.stausBackgroundC {
  background: #F56C6C;
}
.stausBackgroundD {
  background: gray;
}
.box-card >>> .el-card__header{
  padding: 0;
  .clearfix{
    padding: 10px 0;
    position: relative;
  }
}
.el-card {
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #fff;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  margin-top: 30px;
  margin: 20px;
}
.el-card,
.el-message {
  border-radius: 4px;
  overflow: hidden;
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
  clear: both;
}

.demand-list{
  text-align: left;
  .el-row{
    span{
      color: #303133;
    }
    span:first-child{
      color: #606266;
    }
  }
}
.search-form{
  text-align: left;
  padding-left: 20px;
  .line{
    text-align: center;
    margin-right: 10px;
  }
}
.search-form >>> .el-input--prefix .el-input__inner{
  padding-left: 80px;
  text-align: right;
}
.tabs-nav{
  padding-left: 20px;
  margin-top: 30px;
}
.del-demand{
  position: absolute;
  right: 8px;
  top: 11px;
  font-size: 20px;
  cursor: pointer;
}
</style>
