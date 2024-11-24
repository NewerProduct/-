<template>
    <div id="userRegisterPage">
      <h2 class="title" style="display: flex; justify-content: center"><b>用户注册</b></h2>
      <a-form
        style="max-width: 480px; margin: 0 auto"
        label-align="left"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        :model="form"
        @finish="handleSubmit"
      >
      <a-form-item
          name="userName"
          label="用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input v-model:value="form.userName" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item
          name="userAccount"
          label="账号"
          :rules="[{ required: true, message: '请输入账号' }]"
        >
          <a-input v-model:value="form.userAccount" placeholder="请输入账号" />
        </a-form-item>
        <a-form-item
          name="userPassword"
          label="密码"
          :rules="[
            { required: true, message: '请输入密码' },
            { min: 8, message: '密码不少于 8 位' },
          ]"
        >
          <a-input-password
            v-model:value="form.userPassword"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item
          name="checkPassword"
          label="确认密码"
          :rules="[
            { required: true, message: '请输入确认密码' },
            { min: 8, message: '确认密码不少于 8 位' },
          ]"
        >
          <a-input-password
            v-model:value="form.checkPassword"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item
          name="planetCode"
          label="编号"
          :rules="[{ required: true, message: '请输入编号' }]"
        >
          <a-input v-model:value="form.planetCode" placeholder="请输入编号" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 4, span: 20 }">
          <a-button type="primary" html-type="submit">注册</a-button>
        </a-form-item>
      </a-form>
    </div>
  </template>

<script setup lang="ts">
import { reactive } from 'vue';
import { message } from 'ant-design-vue';
import { userRegister } from '@/api/user';
import { useRouter } from 'vue-router';
const router = useRouter()
const form = reactive({
  userName:"",
  userAccount: "",
  userPassword: "",
  checkPassword: "",
  planetCode: "",
});
const handleSubmit = async () => {
  // 可以增加一些前端校验
  if (form.checkPassword !== form.userPassword) {
    message.error("二次输入的密码不一致");
    return;
  }
  const res = await userRegister(form);
  console.log(form);
  
  // 注册成功，跳转到登录页面
  if (res.data.code === 0 && res.data.data) {
    message.success("注册成功");
    router.push({
      path: "/api/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败，" + res.data.message);
  }
};

</script>