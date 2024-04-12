<template>
    <div class="file-container" @dblclick="openFile(fileData.isFolder, fileData.fileName)">
        <img :src="fileData.fileCover" class="file-icon" :title="fileData.fileName">
        <span>{{ fileData.fileName }}</span>
    </div>
</template>

<script setup>
    import {defineProps, inject, onMounted} from 'vue'

    const changeUrl = inject("changeUrl")
    const props = defineProps({
       fileData: {
           fileCover: {
               type: String,
               required: true
           },
           fileCreateTime: {
               type: String,
               required: true
           },
           fileMd5: {
               type: String,
               required: true
           },
           fileName: {
               type: String,
               required: true
           },
           fileType: {
               type: Number
           },
           foloderType: {
               type: Number,
               required: true
           }
       }
    })

    const openFile = (isFolder, fileName) =>{
        if(isFolder){

        }else {
            changeUrl(fileName)
        }
    }

</script>

<style scoped>
    .file-container{
        display: flex;
        flex-direction: column;
        width: 120px;
        height: 100px;
        border-radius: 4px;
        justify-content: space-around;
        align-items: center;
        cursor: pointer;
        color: #606266;
        user-select: none;
    }
    .file-container:hover{
        background: rgb(255, 255, 255, 0.6);
    }
    .file-container .file-icon{
        width: 60px;
        height: 60px;
    }
    .file-container > span{
        white-space: nowrap;
        display: inline-block;
        max-width: 80%;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>