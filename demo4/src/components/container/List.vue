  <template>
	<div>
		<el-dropdown @command="handleCommand">
			<span class="el-dropdown-link">
				切换视图<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="table">表单</el-dropdown-item>
				<el-dropdown-item command="card">卡片</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
		<el-table v-if="viewFlag == 'table'" :data="tableData" style="width: 100%">
			<el-table-column prop="talentId" label="id" width="180">
			</el-table-column>
			<el-table-column prop="talentName" label="姓名" width="180">
			</el-table-column>
			<el-table-column prop="graduationTime" label="毕业时间" width="180">
			</el-table-column>
			<el-table-column prop="graduationSchool" label="毕业学校" width="180">
			</el-table-column>
			<el-table-column prop="educationBackground" label="学历" width="180">
			</el-table-column>
			<el-table-column prop="telephone" label="电话" width="180">
			</el-table-column>
			<el-table-column prop="wechat" label="微信" width="180">
			</el-table-column>
			<el-table-column prop="address" label="目前居住地" width="180">
			</el-table-column>
			<el-table-column
				prop="gender"
				label="性别"
				width="180"
				:formatter="genderConvert"
			>
			</el-table-column>
			<el-table-column prop="identified" label="身份证号" width="180">
			</el-table-column>
			<el-table-column prop="minSalary" label="最低期望薪资" width="180">
			</el-table-column>
			<el-table-column prop="maxSalary" label="最高期望薪资" width="180">
			</el-table-column>
			<el-table-column prop="workTime" label="何时上岗" width="180">
			</el-table-column>
			<el-table-column prop="origin" label="来源渠道" width="180">
			</el-table-column>
			<el-table-column prop="skills" label="技能名称" width="180">
			</el-table-column>
			<el-table-column
				prop="informationEntity.entryTime"
				label="录入时间"
				width="180"
			>
			</el-table-column>
			<el-table-column
				prop="informationEntity.entryPeople"
				label="录入者"
				width="180"
			>
			</el-table-column>
			<el-table-column
				prop="informationEntity.recuritPeople"
				label="招聘者"
				width="180"
			>
			</el-table-column>
			<el-table-column
				prop="informationEntity.informationId"
				label="informationId"
				width="180"
			>
			</el-table-column>
			<el-table-column
				prop="informationEntity.flag"
				label="是否公司员工"
				width="180"
				:formatter="flagConvert"
			>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="120">
				<template slot-scope="scope">
					<el-button
						@click.native.prevent="deleteRow(scope.$index, tableData)"
						type="text"
						size="small"
					>
						修改
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="flex">
			<template v-for="(item, index) in tableData">
				<el-card class="box-card" v-if="viewFlag == 'card'" :key="index">
					<div slot="header" class="clearfix">
						<span class="span_block">姓名：{{ item.talentName }}</span>
						<el-button
							style="float: right; padding: 3px 0"
							type="text"
							@click.native.prevent="deleteRow(index, tableData)"
							><i class="el-icon-edit" title="详情"></i
						></el-button>
					</div>
					<div class="text item">
						<p class="p_block">学历: {{ item.educationBackground }}</p>
						<p class="p_block">电话: {{ item.telephone }}</p>
						<p class="p_block">微信: {{ item.wechat }}</p>
					</div>
				</el-card>
			</template>
		</div>
		<!-- Form    <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

    <el-dialog title="修改信息" :visible.sync="dialogFormVisible" width="800px">
			<el-form
				:rules="rules"
				ref="ruleForm"
				class="demo-ruleForm"
				:model="ruleForm"
				label-width="80px"
				size="mini"
			>
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="talentName">
						<el-input v-model="ruleForm.talentName"></el-input>
					</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="gender">
						<el-radio-group v-model="ruleForm.gender" size="medium">
							<el-radio label="0" :value="0">男</el-radio>
							<el-radio label="1" :value="1">女</el-radio>
						</el-radio-group>
					</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
						label="毕业学校"
						prop="graduationSchool"
					>
						<el-input v-model="ruleForm.graduationSchool"></el-input>
					</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学历" prop="educationBackground">
						<el-input v-model="ruleForm.educationBackground"></el-input>
					</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话" prop="telephone">
							<el-input
								v-model="ruleForm.telephone"
								@blur="checkPhone"
							></el-input>
						</el-form-item>
						<font color="red" size="1px">{{ msgphone.msg }}</font>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信">
							<el-input v-model="ruleForm.wechat"></el-input>
						</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
						label="身份证号"
						prop="identified"
						inline-message="true"
					>
						<el-input
							v-model="ruleForm.identified"
							@blur="checkIdentified"
						></el-input>
					</el-form-item>
					<font color="red" size="1px">{{ msg }}</font>
        </el-col>
        <el-col :span="12">
          <el-form-item label="目前居住">
						<el-input v-model="ruleForm.address"></el-input>
					</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="招聘者" prop="recuritPeople">
						<el-input
							v-model="ruleForm.informationEntity.recuritPeople"
						></el-input>
					</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
						label="录入者"
						prop="informationEntity.entryPeople"
					>
						<el-input
							v-model="ruleForm.informationEntity.entryPeople"
						></el-input>
					</el-form-item>
        </el-col>
        <el-col :span="12">
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
        <el-col :span="12">
          <el-form-item label="来源渠道">
						<el-select v-model="ruleForm.origin" placeholder="渠道来源">
							<el-option
								v-for="item in origins"
								:label="item.className"
								:key="item.classId"
								:value="item.className"
							></el-option>
						</el-select>
					</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="何时到岗">
						<el-select v-model="ruleForm.workTime" placeholder="何时到岗">
							<el-option
								v-for="item in works"
								:label="item.className"
								:key="item.classId"
								:value="item.className"
							></el-option>
						</el-select>
					</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="拥有技能" prop="skills1">
					<el-checkbox-group v-model="ruleForm.skills1">
						<el-checkbox-button
							:label="skill.className"
							v-for="skill in ruleForm.skills1"
							:key="skill.classId"
							:value="skill.className"
						></el-checkbox-button>
					</el-checkbox-group>
				</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="期望薪资">
						<el-select v-model="ruleForm.minSalary" placeholder="最低期望薪资">
							<el-option
								v-for="item in minSalary"
								:label="item.className"
								:key="item.classId"
								:value="item.className"
							></el-option>
						</el-select>
              {{'-'}}
						<el-select v-model="ruleForm.maxSalary" placeholder="最高期望薪资">
							<el-option
								:label="item.className"
								:value="item.className"
								v-for="item in maxSalary"
								:key="item.classId"
							></el-option>
						</el-select>
					</el-form-item>
        </el-col>
      </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="onSubmit('ruleForm')"
					>确 定</el-button
				>
			</div>
    </el-dialog>

		<div class="block">
			<span class="demonstration"></span>
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page.sync="currentPage"
				:page-size="100"
				layout="prev, pager, next, jumper"
				:total="1000"
			>
			</el-pagination>
		</div>
	</div>
</template>


<script>
export default {
	data() {
		return {
			viewFlag: 'table',
			minSalary: [],
			maxSalary: [],
			works: [],
			origins: [],
			msgphone: { data: '', code: '', msg: '' },
			msg: '',
			tableData: [],
			currentPage: 5,
			dialogFormVisible: false,
			ruleForm: {
				talentName: '',
				educationBackground: '',
				gender: '',
				telephone: '',
				graduationSchool: '',
				address: '',
				identified: '',
				informationEntity: {
					entryPeople: '',
					entryTime: '',
					recuritIdentified: '',
					recuritPeople: '',
				},
				//entryPeople: '',
				//recuritPeople: '',
				graduationTime: '',
				// skills:{
				//   identified:'',
				//   skillName:''
				// },
				skills1: [],

				minSalary: '',
				maxSalary: '',
				origin: '',
				work: '',
				wechat: '',
			},
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
						trigger: 'blur',
					},
				],
				telephone: [
					{ required: true, message: '请输入电话', trigger: 'blur' },
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					{
						pattern: /^1[3|5|7|8|9]\d{9}$/,
						message: '请输入正确的号码格式',
						trigger: 'blur',
					},
				],
				graduationSchool: [
					{ required: true, message: '请输入毕业学校', trigger: 'blur' },
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				entryPeople: [
					{ required: true, message: '请输入录入人', trigger: 'blur' },
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],

				skills1: [
					{
						type: 'array',
						required: true,
						message: '请至少选择一个技能',
						trigger: 'change',
					},
				],
				gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
			},
		}
	},
	mounted() {
		this.load()
		this.salary()
		this.work()
		this.origin()
	},
	methods: {
		handleCommand(command) {
			this.viewFlag = command
		},
		getSkill() {
			this.$axios
				.get('/directionary/dir?directionId=5')
				.then((successResponse) => {
					this.ruleForm.skills1 = successResponse.data
					// this.skills1 = successResponse.data;
					//console.log(this.ruleForm.skills1);
				})
		},
		onSubmit(forName) {
			//校验表单
			this.$refs[forName].validate((valid) => {
				if (valid) {
					// alert('submit!');
					//this.sendform();
				} else {
					alert('提交错误，请查看是否不满足校验规则')
					return false
				}
			})
		},
		salary() {
			this.$axios
				.get('/directionary/dir?directionId=1')
				.then((successResponse) => {
					this.minSalary = successResponse.data
					this.maxSalary = successResponse.data
				})
		},
		work() {
			this.$axios
				.get('/directionary/dir?directionId=3')
				.then((successResponse) => {
					this.works = successResponse.data
				})
		},
		origin() {
			this.$axios
				.get('/directionary/dir?directionId=2')
				.then((successResponse) => {
					this.origins = successResponse.data
				})
		},
		checkPhone() {
			const { telephone } = this.ruleForm
			this.$axios
				.get('/talentPool/checkPhone?telephone=' + telephone)
				.then((successResponse) => {
					this.msgphone = successResponse.data
				})
		},
		checkIdentified() {
			const { identified } = this.ruleForm
			this.$axios
				.get('/talentPool/checkIdentified?identified=' + identified)
				.then((successResponse) => {
					this.msg = successResponse.data.msg
				})
		},
		load() {
			this.$axios.get('/talentPool/look').then((successResponse) => {
				this.tableData = successResponse.data
				this.skills = this.tableData
			})
		},
		genderConvert(row, index) {
			if (row.gender == 1) {
				return '女'
			} else {
				return '男'
			}
		},
		flagConvert(row, index) {
			if (row.informationEntity != null) {
				if (row.informationEntity.flag == 0) {
					return '否'
				} else {
					return '是'
				}
			}
		},
		deleteRow(index, tableData) {
			this.ruleForm = tableData[index]
			this.dialogFormVisible = true
			this.getSkill()
		},
		update() {
			this.$axios.put('/update', this.ruleForm).then((successResponse) => {
				if (successResponse.data.code == 200) {
					alert('更新成功')
					this.dialogFormVisible = false
				} else {
					alert('更新失败')
					this.dialogFormVisible = false
				}
			})
		},
		handleSizeChange() {},
		handleCurrentChange() {},
	},
}
</script>
  <style lang="scss" scoped>
.el-dropdown {
	float: right !important;
	margin-bottom: 30px !important;
}
.el-dropdown-link {
	cursor: pointer;
}
.el-dropdown-link:hover {
	color: #409eff;
}
.el-icon-arrow-down {
	font-size: 12px;
}

.box-card {
	width: 200px;
	margin: 5px;
	.el-card__body {
		padding: 10px;
	}
}
.flex {
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
}
.p_block {
	text-align: left;
	font-size: 14px;
}
.span_block {
	// display: block;
	width: 100px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
