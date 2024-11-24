<template>
  <div id="usersInfoTable">
    <a-input-search
      style="max-width: 320px; margin: 0 10px 20px 10px"
      placeholder="请输入用户id搜索"
      v-model:value="queryParams.id"
      enter-button="搜索"
      size="large"
      @search="onSearch"
      :allowClear="true"
    >
    </a-input-search>
    <a-button type="primary" @click="addUser" size="large"
      ><UsergroupAddOutlined /> 新增用户</a-button
    >
    <a-table :data-source="tableData" :columns="columns" bordered>
      <!--column是当前列的信息，record是当前行的信息 -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'userAvatar'">
          <a-image :src="record.userAvatar" :width="120"></a-image>
        </template>
        <template v-if="column.dataIndex === 'userRole'">
          <div v-if="record.userRole === 'admin'">
            <a-tag color="green">管理员</a-tag>
          </div>
          <div v-else>
            <a-tag color="blue">普通用户</a-tag>
          </div>
        </template>
        <template v-if="column.dataIndex === 'createTime'">
          {{ dayjs(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
        <template v-if="column.key === 'action'">
          <a-button
            style="margin: 0 10px 0 10px"
            type="primary"
            @click="updateUserInfo(record.id)"
            >修改</a-button
          >
          <a-button danger @click="deleteUserInfo(record.id)">删除</a-button>
        </template>
        <template v-if="column.dataIndex === 'userName'">
          {{ record.userAccount }}
        </template>
      </template>
    </a-table>
  </div>
  <!--    修改对话框-->
  <div id="model_area">
    <a-modal
      class="modal_add"
      v-model:open="addUserModel"
      title="新增用户"
      @ok="handleOK_add"
    >
      <a-form v-model:value="addUserModel" style="max-width: 320px">
        <a-form-item label="用户账号">
          <a-input v-model:value="addUserForm.userAccount" />
        </a-form-item>
        <a-form-item label="用户头像">
          <a-image :src="addUserForm.userAvatar"></a-image>
        </a-form-item>
        <a-form-item label="用户名称">
          <a-input v-model:value="addUserForm.userName"></a-input>
        </a-form-item>
        <a-form-item label="用户角色">
          <a-select>
            <a-select-option value="admin">管理员</a-select-option>
            <a-select-option value="user">普通用户</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      class="modal_update"
      v-model:open="open"
      title="修改用户信息"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
    >
      <a-form
        ref="userDataRef"
        v-model="userData"
        style="max-width: 320px; margin-bottom: 20px"
      >
        <a-form-item label="新用户名">
          <a-input v-model:value="userData.userName" />
        </a-form-item>
        <a-form-item label="新密码">
          <a-input-password v-model:value="userData.userPassword" />
        </a-form-item>
        <a-form-item label="用户头像">
          <a-image :src="userData.userAvatar"></a-image>
        </a-form-item>
        <a-form-item label="用户简介">
          <a-textarea v-model:value="userData.userProfile" />
        </a-form-item>
        <a-form-item label="用户权限">
          <a-input v-model:value="userData.userRole" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { reactive } from "vue";
import dayjs from "dayjs";
import {
  searchUsers,
  deleteUser,
  getUserLists,
  updateUser,
  addNewUser,
} from "@/api/user";
import { UsergroupAddOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

const tableData = ref([]);
onMounted(() => {
  getTableData();
});

//定义用户信息
let userData = reactive({
  id: "",
  userName: "",
  userAvatar: "",
  userPassword: "",
  userProfile: "",
  userRole: "",
});
//定义表单ref
const userDataRef = ref();
//先获取用户信息
//定义对话框相关内容
const open = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);
//定义对话框相关事件
const handleOk = async () => {
  confirmLoading.value = true;
  //在这里请求修改接口
  const res = await updateUser(userData);
  if (res.data.code === 0 && res.data.data === true) {
    confirmLoading.value = false;
    userData.userPassword = "";
    message.success("修改成功");
  } else {
    confirmLoading.value = false;
    message.error(res.data.message);
  }
  open.value = false;
};
//定义表格的列
const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "用户昵称",
    dataIndex: "userName",
  },
  {
    title: "账号",
    dataIndex: "userAccount",
  },
  {
    title: "头像",
    dataIndex: "userAvatar",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "用户角色",
    dataIndex: "userRole",
  },
  {
    title: "操作",
    key: "action",
  },
];
//定义查询参数
const queryParams = reactive({
  id: "",
  unionId: "",
  mpOpenId: "",
  userName: "",
  userProfile: "",
  userRole: "",
});

const queryParams_delete = reactive({
  id: "",
});
//获取用户信息，并且渲染在页面上
async function getTableData() {
  const res = await getUserLists(queryParams);
  if (res.data.code === 0 && res.data.data) {
    tableData.value = Array.isArray(res.data.data.records)
      ? res.data.data.records
      : [];
  } else {
    tableData.value = [];
  }
}
//根据id搜索到指定id的用户
async function onSearch(id: any) {
  if (id) {
    const res = await searchUsers(id);
    if (res.data.code === 0 && res.data.data) {
      tableData.value = Array.isArray(res.data.data)
        ? res.data.data
        : [res.data.data];
    } else {
      tableData.value = [];
    }
  } else {
    getTableData();
  }
}

/**
 * 删除功能
 * @param id
 */
async function deleteUserInfo(id: any) {
  queryParams_delete.id = id;
  const res = await deleteUser(queryParams_delete);
  if (res.data.code === 0 && res.data.data === true) {
    message.success("删除成功");
    getTableData();
  }
}

/**修改用户信息
 * @param id
 */
async function updateUserInfo(id: any) {
  const res = await searchUsers(id);
  if (res.data.code === 0 && res.data.data) {
    userData.id = res.data.data.id;
    userData.userRole = res.data.data.userRole;
    userData.userName = res.data.data.userName;
    userData.userAvatar = res.data.data.userAvatar
      ? res.data.data.userAvatar
      : null;
    userData.userProfile = res.data.data.userProfile
      ? res.data.data.userProfile
      : "暂无个人简介";
  }
  open.value = true;
  console.log("sadas", res);
  // const res = await updateUser(id)
}

/**
 * 新增用户
 */
//定义用户模态框开启状态
let addUserModel = ref(false);
//定义新增用户表单
const addUserForm = reactive({
  userAccount: "",
  userAvatar: "",
  userName: "",
  userRole: "",
});
async function handleOK_add() {
  addUserModel.value = false;
  //在这里进行一些新增信息操作
  const res = await addNewUser(addUserForm);
  if (res.data.code === 0 && res.data.data) {
    message.success("新增用户成功");
    getTableData();
  } else {
    message.error("新增用户失败");
  }
}
//控制模态框的开关
function addUser() {
  addUserModel.value = true;
}
</script>

<style scoped></style>
