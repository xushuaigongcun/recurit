import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Progress from '@/components/container/Progress'
import List from '@/components/container/List'
import Information from '@/components/container/InformationForm'
import FaceOne from '@/components/container/FaceOne'
import Index from '@/components/Index'
import AnalysisIndex from '@/components/analysis/AnalysisIndex'
import AddAnalysis from '@/components/analysis/AddAnalysis'
import Login from '@/components/login/login'
import Jurisdiction from '@/components/jurisdiction/jurisdiction'
import MyDesk from '@/components/container/my-desk/index'
import ResourcePool from '@/components/resource-pool/index'
import CandidateManagement from '@/components/container/my-desk/candidate-management/index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
      meta: {
        requireAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/login',
      component: Login,
      name: 'login',
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/index',
      component: Index,
      name: 'index',
      meta: {
        requireAuth: true,
        keepAlive: true
      }
    },
    {
      path:'/progress',
      name:'Progress',
      component:Progress,
      meta: {
        requireAuth: true,
        keepAlive: true
      }
    },
    {
      path:'/home',
      name:'Home',
      component:Home,
      meta: {
        requireAuth: true,
        keepAlive: true
      }
    },
    {
      path:'/list',
      name: 'List',
      component:List,
      meta: {
        requireAuth: true,
        keepAlive: true
      }
    },
    {
      path:'/information',
      name: 'InformationForm',
      component:Information,
      meta: {
        requireAuth: true,
        keepAlive: true
      }
    },  {
      path:'/faceOne',
      name: 'FaceOne',
      component:FaceOne,
      meta: {
        requireAuth: true,
        keepAlive: true
      }
    }, {
      path:'/analysisIndex',
      name: 'AnalysisIndex',
      component:AnalysisIndex,
      meta: {
        requireAuth: true,
        keepAlive: true
      }
    },
    {
      path:'/addAnalysis',
      name: 'AddAnalysis',
      component:AddAnalysis,
      meta: {
        requireAuth: true,
        keepAlive: true
      }
    },
    {
      path:'/jurisdiction',
      name: 'jurisdiction',
      component:Jurisdiction,
      meta: {
        requireAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/mydesk/index',
      name: 'MyDesk',
      component: MyDesk,
      meta: {
        requireAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/resource-pool/index',
      name: 'resource-pool',
      component: ResourcePool,
      meta: {
        requireAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/candidate-management/index',
      name: 'candidate-management',
      component: CandidateManagement,
      meta: {
        requireAuth: true,
        keepAlive: true
      }
    },

  ]
})

export default router

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // ???????????????????????????????????????
    if (localStorage.getItem("token") !== 'undefined' && localStorage.getItem("token")) { // ????????????????????????token
      next()
    } else {
      // ?????????,?????????????????????
      next({
        path: '/login'
      })
    }
  } else {
    if(localStorage.getItem("token") !== 'undefined' && localStorage.getItem("token")){
      next('/index');
    }else{
      next();
    }
  }
})
