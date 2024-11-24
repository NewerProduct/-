import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//引入全局权限校验
import "@/access"
//引入pinia
import  {createPinia} from "pinia"
//全局注册axios
import "axios"
//新建pinia实例
const pinia = createPinia()

//引入antdesign
import Antd from "ant-design-vue";
import 'ant-design-vue/dist/reset.css'


createApp(App).use(router).use(pinia).use(Antd).mount('#app')

