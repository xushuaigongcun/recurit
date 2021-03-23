<template>
  <div ref="myChart" :style="{width: '300px', height: '300px'}"></div>
</template>

<script>
export default {
    name : 'Echarts',
    mounted(){
        this.drawLine();
    },
    data:function(){
        return {

        }
    },
    props:['type'],
    methods:{
         drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(this.$refs.myChart);
        // 绘制图表
        myChart.setOption({
            title: { text: '需求信息' },
            tooltip: {},
            xAxis: {
                data: ["待面试人数","已满足人数","在途人数","入职人数","offer数","待满足人数"]
            },
            yAxis: {},
            series: [{
                name: '人数',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
    }
}
</script>
