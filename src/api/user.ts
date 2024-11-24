import MyAxios from "@/utils/request";

/**
 * 用户注册
 * @param params
 */

export function userRegister(params: any) {
  return MyAxios.request({
    url: "/api/user/register",
    method: "post",
    data: params,
  });
}

/**
 * 用户登录
 * @param params
 */
export function userLogin(params: any) {
  return MyAxios.request({
    url: "/api/user/login",
    method: "post",
    data: params,
  });
}

/**
 * 用户退出
 * @param params
 */
export function userLogout(params: any) {
  return MyAxios.request({
    url: "/api/user/logout",
    method: "post",
    data: params,
  });
}

/**
 * 获取当前用户
 *
 */
export function getCurrentUser() {
  return MyAxios.request({
    url: "/api/user/get/login",
    method: "get",
  });
}

/**
 * 根据id获取用户
 * @param id
 */
export function searchUsers(id: any) {
  return MyAxios.request({
    url: "/api/user/get",
    method: "get",
    params: {
      id: id,
    },
  });
}

/**
 * 获取用户列表
 *
 */
export function getUserLists(queryParams: any) {
  return MyAxios.request({
    url: "/api/user/list/page",
    method: "POST",
    data: queryParams,
  });
}
/**
 * 删除用户
 * @param id
 */
export function deleteUser(queryParams: any) {
  return MyAxios.request({
    url: "/api/user/delete",
    method: "post",
    data: queryParams,
    //关键点：要传递JSON格式的数据
    headers: {
      "Content-Type": "application/json",
    },
  });
}

/**
 * 修改用户
 * @param params
 */
export function updateUser(params: any) {
  return MyAxios.request({
    url: "/api/user/update",
    method: "POST",
    data: params,
  });
}

/**
 * 新增用户
 * @param params
 */
export function addNewUser(params: any) {
  return MyAxios.request({
    url: "/api/user/add",
    method: "POST",
    data: params,
  });
}
