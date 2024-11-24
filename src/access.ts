/**
 * 权限校验页面
 */

import { message } from "ant-design-vue";
import { userStore } from "./store/userStore";
import router from "./router";


/**
 * 全局权限校验
 */
//路由守卫，路由跳转前做些什么
router.beforeEach(async (to,from,next)=>{
    const store = userStore();
    //当前登录的用户信息
    const loginUser  =  await store.getUserLoginStatus()
    //要去的下一个路由路径
    const toUrl = to.fullPath
    console.log(toUrl);
    if(toUrl.startsWith("/admin")){
        //判断用户信息里面的内容
        if(!loginUser || loginUser.value.userRole !== 'admin'){
            message.error('没有权限')
            next(`/user/login?redirect=${toUrl}`)
        }
    }
    next();
})


