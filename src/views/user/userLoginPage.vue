<template>
    <div>
        <h1 style="display: grid; place-items: center; margin-bottom: 40px;"><strong>用户登录</strong></h1>
        <a-form :model="form"
        ref="formRef"
        name="basic"
        :labelCol="{ span:4}"
        :wrapperCol="{span:20}"
        label-align="left"
        style="max-width: 480px;margin: 0 auto;"
        :rules="rules"
        >
            <a-form-item label="用户名" name="userAccount">
                <a-input placeholder="请输入用户名" v-model:value="form.userAccount"></a-input>
            </a-form-item>
            <a-form-item label="密码" name="userPassword">
                <a-input placeholder="请输入密码" v-model:value="form.userPassword"></a-input>
            </a-form-item>
            <a-form-item :wrapper-col="{offset:4,span:20}">
                <a-button type="primary" @click="handleSubmit">登录</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup lang="ts">
import { reactive,ref } from 'vue';
import { message } from 'ant-design-vue';
//引入表单校验类型
import type {Rule } from 'ant-design-vue/es/form'
import { userLogin } from '@/api/user'
import { useRouter } from 'vue-router';
import { userStore } from '@/store/userStore';
const router = useRouter()
const store = userStore()

const formRef = ref()
//定义表单类型
interface formDataType {
    userAccount:string,
    userPassword:string
}
//定义表单
const form:formDataType = reactive({
    userAccount:'',
    userPassword:''
})
//定义校验规则
const rules:Record<string,Rule[]> = {
    userAccount:[
        {
            required:true,message:'请输入用户名！',trigger:'change'
        },
        {
            min:4,max:10,message:'用户名长度4-10位！',trigger:'blur'
        }
    ],
    userPassword:[
        {
            required:true,message:'请输入密码',trigger:'change'
        },
        {
            min:8,max:15,message:'密码长度大于8！',trigger:'blur'
        }

    ]
}

/**
 * 编写提交函数
 * @param form
 */

async function handleSubmit(){
    formRef.value.validate()
    .then(async()=>{
        const result = await userLogin(form)
        console.log(result);
        if(result.data.code=== 0 && result.data.data){
            await store.getUserLoginStatus()
            message.success('登录成功')
            //登录成功后跳转到主页，注意：不要新开窗口，直接替代
            router.push({
                path:'/',
                replace:true,
            })
        }else{
            message.error(result.data.message)
        }
    })
    .catch(()=>{
        message.error('请把表单补充完整')
    })
    console.log('213123',formRef.value);
    

    
    

 }

</script>

<style scoped>

</style>