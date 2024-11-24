/**基于axios二次封装的request请求 */
import axios from "axios";

//创建axios的实例
const MyAxios = axios.create({
  //区分开发环境和线上环境
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8101"
      : "http://134.175.194.204:8101",
  timeout: 10000,
  //必须写，如果不写在发送请求时无法携带Cookie，无法进行登录
  withCredentials: true,
});

//发送请求前的拦截器
MyAxios.interceptors.request.use(
  function (config) {
    //在发送请求前做些什么
    return config;
  },
  function (error) {
    //对请求错误做些什么
    console.log(error);

    return Promise.reject(error);
  }
);
//拿到结果前的拦截器
MyAxios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    //对响应数据做点什么
    console.log(response);

    const { data } = response;
    console.log("这是请求回来的数据:", data);
    //未登录
    if (data.code === 40100) {
      //不是获取用户信息接口，或者不是登录页面，则跳转到登录页面
      if (
        !response.request.responseURL.includes("user/get/login") &&
        !window.location.pathname.includes("/api/user/login")
      ) {
        //跳转到登录页面 - 当登录成功会就会重新定向到当前所在页面
        window.location.href = `/api/user/login?redirect=${window.location.href}`;
      }
    }

    return response;
  },
  function (error) {
    //超出 2xx范围的状态码都会触发该函数
    return Promise.reject(error);
  }
);

export default MyAxios;
