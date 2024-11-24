import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
//配置路由
const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name:'home',
    component: ()=> import("@/views/HomeView.vue")
  },
  {
    path:'/api/user/login',
    name:'userLogin',
    component: ()=> import("@/views/user/userLoginPage.vue")
  },
  {
    path:'/api/user/register',
    name:'userRegister',
    component: ()=> import("@/views/user/userRegisterPage.vue")
  },
  {
    path:'/admin/api/userManage',
    name:'adminUserManage',
    component: ()=> import("@/views/admin/userManagePage.vue")
  },
  {
    path:'/api/user/personalPage',
    name:'personalPage',
    component:()=> import("@/views/user/userPersonalPage.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
