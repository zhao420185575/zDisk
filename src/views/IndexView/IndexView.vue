<template>
    <div class="index-box">
        <Navigation />
        <div class="content-box">
            <div class="title-box">
                <el-text class="title" size="large">{{ titleName }}</el-text>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
    import Navigation from "@/views/IndexView/components/Navigation.vue";
    import {provide, ref} from "vue";

    const titleName = ref("")

    const changeTitle = (name) =>{
        titleName.value = name
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
    }
    .title-box .title{
        color: #3f3e3e;
        font-size: 20px;
        font-weight: 900;
        font-family: Inter, 'Helvetica Neue', Helvetica, 'PingFang SC',
        'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    }

</style>