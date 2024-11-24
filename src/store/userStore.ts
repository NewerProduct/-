import { defineStore } from "pinia";
import { ref } from "vue";
import { getCurrentUser } from "@/api/user";

//定义store
export const userStore = defineStore("loginUser", () => {
  //定义用户登录一开始的状态(相当于vue2的data)
  const loginUser = ref<any>({
    username: "未登录",
  });
  //通过请求获得用户的登录状态(function相当于vuex的actions)
  async function getUserLoginStatus() {
    const res = await getCurrentUser();
    if (res.data.code === 0 && res.data.data) {
      loginUser.value = res.data.data;
      console.log("全局状态管理", loginUser.value);
    }
    return loginUser;
  }
  //设置用户的登录状态 - 通过set
  function setLoginUser(newLoginUser: any) {
    loginUser.value = newLoginUser;
  }
  return { loginUser, getUserLoginStatus, setLoginUser };
  //Getter这一点是和vuex相似的，相当于计算属性
});
