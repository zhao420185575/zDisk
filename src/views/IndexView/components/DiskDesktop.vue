<template>
    <div class="desktop-box">
        <DiskFile :fileData="item"  v-for="item in fileData" />
        <div class="Tips" v-if="!fileData.length">
            <img src="/noContent.png" />
            <span>暂无文件</span>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from "vue";


    import DiskFile from "@/views/IndexView/components/DiskFile.vue";
    import { getFileArr } from "@/api/IndexView/index.js";

    const fileData = ref([])


    const getFileList = async (url) =>{
        fileData.value = await getFileArr(url)
    }

    defineExpose(({
        getFileList
    }))

    onMounted(  async () =>{
        fileData.value = await getFileArr("/")
    })

</script>

<style scoped>
    .desktop-box{
        width: 100%;
        height: 100%;
        background: #F0F2F5;
        border-radius: 4px;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 120px;
        grid-gap: 6px;
        padding: 10px;
        box-sizing: border-box;
        position: relative;
    }
    .desktop-box .Tips{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .Tips > img{
        width: 120px;
        height: 120px;
    }
    .Tips > span{
        margin-top: 10px;
        font-size: 24px;
        color: #A8ABB2;
    }
</style>