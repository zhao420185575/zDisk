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
import {inject, onMounted, provide, ref} from "vue";
    import DiskFile from "@/views/IndexView/components/DiskFile.vue";
    import {downloadFile, getFileArr} from "@/api/IndexView/index.js";

    const fileData = ref([])
    const fileList = ref([])



    const addFile = (fileMd5) =>{
        fileList.value.push(fileMd5)
        console.log(fileList.value)
    }

    const removeFile = (fileMd5) =>{
        let index = fileList.value.indexOf(fileMd5)
        if(index !== -1){
            fileList.value.splice(index)
        }
    }

    provide('addFile', addFile)
    provide('removeFile', removeFile)

    const getFileList = async (url) =>{
        fileData.value = await getFileArr(url)
    }

    const download = async () =>{
      if(await downloadFile(fileList.value)){
            console.log(1)
      }
    }

    defineExpose(({
        getFileList,
        download
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
        grid-template-columns: repeat(auto-fill, 120px);
        grid-gap: 6px;
        padding: 10px;
        box-sizing: border-box;
        position: relative;
        overflow-y: scroll;
    }
    .desktop-box::-webkit-scrollbar{
        display: none;
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