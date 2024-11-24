<template>
    <a-row :flex="5">
        <a-col flex="200px">
            <div class="title-bar">
                <img src="../assets/logo.png" alt="logo" class="logo"/>
                <div class="title">小李用户中心</div>
            </div>
        </a-col>
        <a-col flex="auto">
            <div id="globalHeader">
                <a-menu v-model:selectedKeys="current_top" mode="horizontal" :items="items" 
                @click="doMenuClick"
                />
            </div>
        </a-col>
        <a-col flex="80px">
            <div class="user-login-status">
                <div v-if="loginUser.id">
        <a-dropdown class="avatar-drop">
            <a class="ant-dropdown-link" @click.prevent>
                <a-avatar :size="48"class="avatar" >
                <template #icon><UserOutlined /></template>
            </a-avatar>
            </a>
        <template #overlay>
            <a-menu>
                <a-menu-item>
                <router-link :to="{name:'personalPage'}">个人中心</router-link>
                </a-menu-item>
                <a-menu-item>
                <a href="javascript:;">退出登录</a>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
                </div>
                <div v-else>
                    <a-button type="primary" href="/api/user/login">登录</a-button>
                </div>
            </div>
        </a-col>
    </a-row>



</template>
<script lang="ts" setup>
//拿到userStore
import {userStore} from "@/store/userStore"
import { h, ref } from 'vue';
import { HomeOutlined, CrownOutlined } from '@ant-design/icons-vue';
import {useRouter} from 'vue-router'
import { MenuProps } from 'ant-design-vue';
import {storeToRefs} from 'pinia'

//定义store
const userLoginStore = userStore()
//使用store
const { loginUser } = storeToRefs(userLoginStore)
console.log('21312312',loginUser);

//创建用户信息
//current表示当前选中的菜单
const current_top = ref<string[]>([]);
const items = ref<MenuProps['items']>([
    {
        key: '/',
        icon: () => h(HomeOutlined),
        label: '主页',
        title: '主页',
    },
    {
        key: '/api/user/login',
        label: '用户登录',
        title: '用户登录',
    },
    {
        key: '/api/user/register',
        label: '用户注册',
        title: '用户注册',
    },
    {
        key: '/admin/api/userManage',
        icon: () => h(CrownOutlined),
        label: '用户管理',
        title: '用户管理',
    },
    {
        key: 'others',
        label: h("a", { href: "https://newerproduct.github.io/", target: '_blank' },
            "小李の博客"
        ),
        title: '小李博客',
    },
]);
//头像处菜单路由


//新建路由器实例
const router = useRouter()
//绑定跳转事件 - 写明了key是string类型 -这样写是menu菜单的回调
const doMenuClick = ({key}:{key:string})=>{
    console.log("路由路径？",key);
    router.push({
        path:key
    })
}

//监听路由变化，使用路由钩子afterEach:在路由跳转之后执行的内容
router.afterEach((to,from,failure)=>{
    current_top.value = [to.path]
})
</script>

<style scoped>
.title-bar {
    display: flex;
    align-items: center;
}

.title {
    color: black;
    font-size: 18px;
    margin-left: 16px
}

.logo {
    height: 63px;
}
.avatar-drop{
    position: relative;
    display: inline-block;
    width: 48px;
    height: 48px;
    top: 0px;
    left: 0px;
}
.avatar-drop .avatar {
    position: absolute;
    left: 0px;
    top: 5px;
}
</style>