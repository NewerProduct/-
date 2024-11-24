<template>
    <div id="card_info">
        <a-card class="card_left" style="width: 40%;margin-right: 10px;">
        <div class="avatar">
            <div v-if="src">
                <a-avatar  :size="400" :src="src">
             <template #icon><UserOutlined /></template>
             </a-avatar>
            </div>
            <div v-else>
                <avatarUpload/>
            </div>
        </div>
        
            <p>身份</p>
            <p>最后登录日期：</p>
        </a-card>
        <a-card class="card_right" style="width: 60%">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </a-card>
    </div>
</template>

<script setup lang="ts">
import avatarUpload from "@/utils/components/avatarUpload.vue"
import { ref } from "vue";
//定义图片的url
const src = ref("")
</script>

<style scoped>
#card_info{
    display: flex;
    width: 100%;
    height: 700px;
}
.card_left{
    
}
.avatar{
    display: flex;
    width: 400px;
    height: 400px;
    justify-content: center;
    align-items: center;
}

</style>