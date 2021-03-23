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
    }
  ]
})

export default router

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (localStorage.getItem("token") == 'true') { // 判断本地是否存在token
      next()
    } else {
      // 未登录,跳转到登陆页面
      next({
        path: '/login'
      })
    }
  } else {
    if(localStorage.getItem("token") == 'true'){
      next('/index');
    }else{
      next();
    }
  }
})
