<template>
  <div>
    <el-page-header class="back-page" @back="goBack" :content="$route.query.detailDate==null?'新增':'分配'"></el-page-header>

    <div>
      <el-steps :active="active" align-center>
        <el-step
          :title="item.operationInfomation"
          description=""
          v-for="item in tableData"
          :key="item.processId"
          :to="{ path: 'item.operation' }"
        >
        </el-step>
      </el-steps>
    </div>
    <div style="margin-top: 50px" v-if="active == 1">
      <!-- <information-form @updateStep="updateStep" :candidateData="candidateData"/> -->
      <information-form :candidateData="candidateData"/>
    </div>

    <div style="text-align: right;">
      <el-button v-if="active!=1" style="margin-top: 12px" @click="lastStep" align-center>上一步</el-button>
      <el-button style="margin-top: 12px" type="primary" @click="next" align-center>下一步</el-button>
    </div>
  </div>
</template>

<script>
import InformationForm from "./InformationForm";
export default {
  name: "Progress",
  components: { InformationForm },
  data: function () {
    return {
      tableData: [],
      active: 1,
      candidateData: {},
    };
  },
  created(){
    this.candidateData = this.$route.query.detailDate
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.$axios.get("/process/operation?id=1").then((successResponse) => {
        this.tableData = successResponse.data;
      });
    },
    // updateStep(step) {
    //   this.active = step;
    // },
    next(){
      if (this.active++ > this.tableData.length-1) this.active = 1;
    },
    lastStep(){
      if (this.active-- == 1) this.active = 1;
    },
    goBack(){
      this.$router.back()
    },
  },
};
</script>

<style >
.el-step__icon {
  position: relative;
  z-index: 1;
  display: inline-flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  width: 60px !important;
  height: 60px !important;
  font-size: 30px;
  box-sizing: border-box;
  background: #fff;
  transition: 0.15s ease-out;
}
.el-step__title {
  font-size: 25px;
  line-height: 38px;
}
.el-step.is-horizontal .el-step__line {
  height: 4px;
  top: 30px;
  left: 40px;
  right: 10;
}
.back-page{
  margin: 0 0 20px;
}
</style>
