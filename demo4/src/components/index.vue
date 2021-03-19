<template>
    <div>
        <Echarts />
        <Echarts />
        <Echarts />
        <ChinaMap />
         
    </div>
</template>
<script>
import Echarts from './Charts'
import ChinaMap from './ChinaMap'
export default {
    name: 'Index',
    components:{
        Echarts,
        ChinaMap
        }
}
</script>
