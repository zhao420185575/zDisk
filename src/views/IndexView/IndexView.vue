<template>
    <div class="index-box">
        <Navigation />
        <div class="content-box">
            <div class="title-box">
                <el-text class="title" size="large">{{ titleName }}</el-text>
                <el-tooltip effect="dark" content="退出登录" placement="bottom">
                  <el-button class="logout" type="info" :icon="Promotion" circle @click="logout" />
                </el-tooltip>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
    import Navigation from "@/views/IndexView/components/Navigation.vue";
    import { provide, ref } from "vue";
    import { Promotion } from '@element-plus/icons-vue'
    import router from "@/router/index.js";

    const titleName = ref("")

    const props = defineProps(['frameRef'])


    provide('preview', (fileMD5, fileType) => props.frameRef.getUrl(fileMD5, fileType))


    const changeTitle = (name) =>{
        titleName.value = name
    }

    const logout = () => {
      localStorage.removeItem('token')
      router.push({ name: 'login' })
    }

    provide("changeTitle", changeTitle)


</script>

<style scoped>
    .index-box{
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .index-box .content-box{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .content-box .title-box{
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        user-select: none;
        box-sizing: border-box;
        border-bottom: 1px solid var(--el-border-color);
        position: relative;
    }
    .title-box .title{
        color: #3f3e3e;
        font-size: 20px;
        font-weight: 900;
        font-family: Inter, 'Helvetica Neue', Helvetica, 'PingFang SC',
        'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    }

    .logout{
      position: absolute;
      right: 10%;
    }
</style>