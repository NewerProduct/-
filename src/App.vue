<template>
    <div id="app">
        <BasicLayout />
    </div>
   
</template>

<script setup lang="ts">
import BasicLayout from '@/layouts/BasicLayout.vue'
//当用户进入页面时，尝试获取登录状态
import {userStore} from '@/store/userStore' 
//定义store
const store = userStore()
console.log(store);

store.getUserLoginStatus()
</script>
<style>

</style>
