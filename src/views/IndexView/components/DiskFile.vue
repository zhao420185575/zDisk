<template>
    <div class="file-container"
         @dblclick="openFile(fileData.isFolder, fileData.fileName)"
         :class="{'file-container-select': checkboxState}"
         @click="checkboxState = !checkboxState"
    >
        <img :src="fileData.fileCover" class="file-icon" :title="fileData.fileName">
        <span v-if="!fileData.isEdit">{{ fileData.fileName }}</span>
        <el-input
            v-else
            v-model="fileData.fileName"
            placeholder="请输入文件名"
            style="height: 24px;margin: 2px"
            ref="fileEdit"
            @blur="saveFile"
            @keydown="exitEdit"
        />
        <el-checkbox v-model="checkboxState" v-if="fileData.isFolder" class="check" />
    </div>
</template>

<script setup>
    import { defineProps, inject, nextTick, onMounted, ref, watch, defineEmits} from 'vue'
    import { createFolder } from "@/api/IndexView/index.js";
    import {responseMessage} from "@/api/request.js";

    const checkboxState = ref(false)

    const addFile = inject('addFile')
    const removeFile = inject('removeFile')
    const getCurrentUrl = inject('getCurrentUrl')
    const fileEdit = ref(null)
    const emits = defineEmits(['close'])

    watch(() => checkboxState.value, () =>{
        if(checkboxState.value){
          addFile(props.fileData.fileMd5)
        }else {
          removeFile(props.fileData.fileMd5)
        }
    })

    const exitEdit = (e) =>{
        if(e.keyCode === 27){
            emits('close')
        }
    }

    const saveFile = async () =>{
        if(props.fileData.fileName === '') {
            getFocus()
            responseMessage(2, '文件夹名称不能为空,取消创建请按ESC键')
            return
        }
        if(await createFolder({ ParentPath: getCurrentUrl(), CreateNewFolderName: props.fileData.fileName }))
        props.fileData.isEdit = false

    }

    const getFocus = () =>{
         nextTick(() =>{
            fileEdit.value.focus()
         })
    }

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

    defineExpose(({
        getFocus
    }))

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
        position: relative;
        margin: 6px;
    }
    .file-container-select{
        background: rgb(255, 255, 255, 0.6);
    }
    .file-container .check{
        position: absolute;
        top: 0;
        left: 0;
        width: 14px;
        height: 14px;
        margin: 4px;
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
    .edit-box{
        width: 100%;

    }
</style>