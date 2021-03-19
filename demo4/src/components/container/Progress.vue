<template>
 <div>
    <div><el-steps :active="active"   align-center>
            <el-step :title="item.operationInfomation" description=""  v-for="item in tableData" :key="item.processId" :to="{ path: 'item.operation' }">
            </el-step>
        </el-steps>
    </div>
    <div style="margin-top:50px" v-if="active==0">
         <InformationForm />
    </div>
    <el-button style="margin-top: 12px; " @click="next" align-center>下一步</el-button>
 </div>
</template>
<style >
.el-step__icon{
    position: relative;
    z-index: 1;
    display: inline-flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    width: 60px  !important;
    height: 60px !important;
    font-size: 30px;
    box-sizing: border-box;
    background: #FFF;
    transition: .15s ease-out;
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
</style>

<script>
import InformationForm from './InformationForm'
export default {
    name : 'Progress',
    components:{InformationForm},
    data:function(){
        return{
            tableData:[],
            active:0
        }
    },
    mounted(){
        this.load();
    },
    methods:{
        load(){
        this.$axios.get('/process/operation')
        .then(successResponse=>{
            this.tableData=successResponse.data;
            console.log(this.tableData)});
        
        },
         next() {
        if (this.active++ > this.tableData.length-1) this.active = 0;
      }
        
    }
     
}
</script>
