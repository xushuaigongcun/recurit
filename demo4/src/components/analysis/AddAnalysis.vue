<template>
  <div>
    <el-page-header class="back" v-if="this.$route.query.type == 'new'" @back="goBack" content="添加新需求">
    </el-page-header>
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
              v-model="ruleForm.programmId"
              placeholder="请选择项目"
              @change="getCustorm"
            >
              <el-option
                :label="programm.programmName"
                :value="programm.programmId"
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
          <!-- <el-form-item > -->
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
          <!-- </el-form-item> -->
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

      <el-form-item>
        <!-- 弹出框Form -->
        <el-button type="primary" @click="dialogFormVisible = true"
          >添加职位需求</el-button
        >
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
      </el-form-item>
    </el-form>

    <el-dialog title="需求信息" :visible.sync="dialogFormVisible">
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
              <el-select v-model="form.jobName" placeholder="工作岗位">
                <el-option
                  v-for="item in jobs"
                  :label="item.jobName"
                  :key="item.jobId"
                  :value="item.jobName"
                ></el-option>
              </el-select>
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
                v-model.number="form.requireNumber"
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
            prop="contact"
          >
            <el-input v-model="form.contact" autocomplete="off"></el-input>
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
              placeholder="请选择招聘人"
              multiple
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
        <el-button type="primary" @click="add">添加</el-button>
      </div>
    </el-dialog>

    <!--表单数据展示到页面上-->
    <template v-if="tableDataValue.length > 0">
      <el-table :data="tableDataValue" border style="width: 100%">
        <el-table-column fixed prop="jobName" label="工作名称" width="150">
        </el-table-column>
        <el-table-column prop="requireNumber" label="招聘人数" width="120">
        </el-table-column>
        <el-table-column prop="jobDesc" label="工作描述" width="120">
        </el-table-column>
        <el-table-column prop="contact" label="负责人" width="120">
        </el-table-column>
        <el-table-column prop="address" label="工作地点" width="300">
        </el-table-column>
        <el-table-column prop="recuritIds" label="招聘人" width="120">
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="120">
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间"
          width="120"
          value-format="timestamp"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >移除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableDataValue: [],
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
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      programms: "",
      jobs: "",
      form: {
        contact: "",
        jobName: "",
        address: "",
        jobDesc: "",
        startTime: "",
        endTime: "",
        skill: [],
        requireNumber: "",
        recuritIds: [],
      },
      formLabelWidth: "120px",

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
        contact: [
          { required: true, message: "请选择联系人", trigger: "change" },
        ],
        startTime: [
          { required: true, message: "请选择时间", trigger: "change" },
        ],
        endTime: [{ required: true, message: "请选择时间", trigger: "change" }],
        requireNumber: [
          { required: true, message: "请选择人数", trigger: "change" },
          { type: "number", message: "人数必须为数字值", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.load();
    this.job();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sendForm();
        } else {
          return false;
        }
      });
    },
    addForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
        } else {
          return false;
        }
      });
    },
    sendForm() {
      const {
        programmId,
        custormId,
        custormName,
        deptId,
        deptName,
        startTime,
        endTime,
        requireNumber,
        demandDesc,
      } = this.ruleForm;
      var tableDataValue = [];
      for (var i of this.tableDataValue) {
        var tableVo = {
          jobName: "",
          address: "",
          jobId: "",
          jobDesc: "",
          startTime: "",
          endTime: "",
          // skill: '',
          requireNumber: "",
          recuritIds: [],
          contact: "",
          demandDesc,
        };
        tableVo.jobName = i.jobName;
        tableVo.address = i.address;
        tableVo.jobDesc = i.jobDesc;
        tableVo.startTime = i.startTime;
        tableVo.endTime = i.endTime;
        // tableVo.skill=i.skill;
        tableVo.requireNumber = i.requireNumber;
        tableVo.recuritIds = i.recuritIds;
        tableVo.contact = i.contact;
        tableDataValue.push(tableVo);
      }
      this.$axios
        .post("/recurit", {
          programmId,
          custormId,
          custormName,
          deptId,
          deptName,
          startTime,
          endTime,
          requireNumber,
          demandDesc,
          tableDataValue,
        })
        .then((successResponse) => {
          if (successResponse.data.code == 200) {
            alert(successResponse.data.msg);
            this.$router.push({ path: "/analysisIndex" });
          } else {
            alert("保存失败");
          }
        });
    },
    add() {
      this.addForm("form");
      const {
        jobName,
        address,
        jobDesc,
        startTime,
        endTime,
        skill,
        requireNumber,
        recuritIds,
        contact,
      } = this.form;
      var table = {
        jobName: "",
        address: "",
        jobId: "",
        jobDesc: "",
        startTime: "",
        endTime: "",
        skill: "",
        requireNumber: "",
        recuritIds: [],
        contact: "",
      };
      table.jobName = jobName;
      table.address = address;
      table.jobDesc = jobDesc;
      table.startTime = startTime;
      table.endTime = endTime;
      table.skill = skill;
      table.requireNumber = requireNumber;
      table.recuritIds = recuritIds;
      table.contact = contact;
      this.tableDataValue.push(table);
      // this.resetForm('form');
      this.form = {};
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    job() {
      this.$axios.get("/job/").then((successResponse) => {
        this.jobs = successResponse.data;
      });
    },

    load() {
      this.$axios.get("/programm/programm").then((successResponse) => {
        if (successResponse.data.code == 200) {
          this.programms = successResponse.data.data;
        } else {
        }
      });
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
    handleClick(row) {
      this.tableDataValue.pop(row);
    },
    goBack(){
      this.$router.back()
    },
  },
};
</script>
<style lang="scss" scoped>
.back{
  padding: 10px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #DCDFE6;
}
</style>
