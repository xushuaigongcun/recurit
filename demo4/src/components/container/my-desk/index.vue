<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card class="candidate-card-list" shadow="hover" @click.native="candidateManagement">
          <el-image
          style="width: 100px; height: 100px"
          :src="require('../../../assets/images/my-desk/people.png')"></el-image>
          <p>候选者管理</p>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="candidate-card-list" shadow="hover" @click.native="addCandidate">
          <el-image
          style="width: 100px; height: 100px"
          :src="require('../../../assets/images/my-desk/add-people1.png')"></el-image>
          <p>新增</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "MyDesk",
  data(){
    return {
    }
  },
  methods: {
    candidateManagement(){
      this.$router.push({ path: "/candidate-management/index" });
    },
    addCandidate(){
      this.$router.push({ path: "/progress",query: {
        detailDate: null
      }});
    },

  },
};
</script>
<style lang='scss' scoped>
.candidate-card-list{
  cursor: pointer;
  text-align: center;
}
</style>
