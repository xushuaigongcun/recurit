import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Progress from '@/components/Container/Progress'
import List from '@/components/container/List'
import Infomation from '@/components/container/InformationForm'
import FaceOne from '@/components/container/FaceOne'
import Index from '@/components/Index'
import AnalysisIndex from '@/components/analysis/AnalysisIndex'
import AddAnalysis from '@/components/analysis/AddAnalysis'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component:Index
    },
    {
      path:'/progress',
      name:'Progress',
      component:Progress
    },
    {
      path:'/home',
      name:'Home',
      component:Home
    },
    {
      path:'/list',
      name: 'List',
      component:List
    },
    {
    path:'/information',
    name: 'Infomation',
    component:Infomation
  },  {
    path:'/faceOne',
    name: 'FaceOne',
    component:FaceOne
  }, {
    path:'/analysisIndex',
    name: 'AnalysisIndex',
    component:AnalysisIndex
  },
  {
    path:'/addAnalysis',
    name: 'AddAnalysis',
    component:AddAnalysis
  }



  ]
})
