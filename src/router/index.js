import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Wecome from '../components/Wecome.vue'

import Admins from '../components/admin/Admins.vue'
import Users from '../components/users/Users.vue'
import Feedback from '../components/users/Feedback.vue'
import Supervision from '../components/users/Supervision.vue'
import Classroom from '../components/classroom/Classroom.vue'
import Notice from '../components/notice/Notice.vue'
import Subscribe from '../components/subscribe/Subscribe.vue'
import QuerySubscribe from '../components/subscribe/QuerySubscribe.vue'
import Rights from '../components/rights/Rights.vue'

import Advertising from '../components/advertising/Advertising.vue'
import Profile from '../components/profile/index.vue'


Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/login'
  },
  {
    path:'/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        redirect: '/wecome',
      },
      {
        path: '/wecome',
        component: Wecome
      },
      {
        path: '/admins',
        component: Admins
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/feedback',
        component: Feedback
      },
      {
        path: '/supervision',
        component: Supervision
      },
      {
        path: '/classroom',
        component: Classroom
      },
      {
        path: '/notice',
        component: Notice
      },
      {
        path: '/subscribe',
        component: Subscribe
      },
      {
        path: '/querySubscribe',
        component: QuerySubscribe
      },
      {
        path: '/rights',
        component: Rights
      },
     
      {
        path: '/advertising',
        component: Advertising
      },
      {
        path: '/profile',
        component: Profile
      },

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  //base:'/myvue',
  routes
})

//判断是否登陆
router.beforeEach((to, from, next) => {
  if(to.path==='/login')  next()
  const token = window.sessionStorage.getItem("token")
  
  if(!token)
    return next('/login')
  next()
})



export default router
