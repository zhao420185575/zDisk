<template>
    <div class="file-container"
         @dblclick="openFile(fileData.isFolder, fileData.fileMd5 ?? fileData.fileName, fileData.fileType)"
         :class="{'file-container-select': checkboxState}"
         @click.left="checkboxState = !checkboxState"
         @click.right="getFileInfo(fileData)"
    >
        <img :src="fileData.fileCover" class="file-icon" :title="fileData.fileName">
        <span v-if="!fileData.isEdit">{{ fileData.fileName }}</span>
        <el-input
            v-else
            v-model="fileData.fileName"
            placeholder="请输入文件名"
            style="height: 24px;margin: 2px"
            ref="fileEdit"
            @blur="handleBlur"
            @keydown="exitEdit"
        />
        <el-checkbox v-model="checkboxState" v-if="!fileData.isFolder && !reNameState" class="check" @click="checkboxState = !checkboxState" />
    </div>
</template>

<script setup>
    import { defineProps, inject, nextTick, onMounted, ref, watch, defineEmits} from 'vue'
    import {createFolder, reFileName} from "@/api/IndexView/index.js";
    import {responseMessage} from "@/api/request.js";

    const checkboxState = ref(false)

    const addFile = inject('addFile')
    const removeFile = inject('removeFile')
    const getCurrentUrl = inject('getCurrentUrl')
    const cleanSelect = inject('cleanSelect')
    const preview = inject('preview')
    const sendMd5 = inject('sendMd5')
    const getCurrentIndex = inject('getCurrentIndex')
    const getFileList = inject('getFileList')
    const fileEdit = ref(null)
    const emits = defineEmits(['close'])

    const reNameState = ref(false)

    const oldName = ref(null)

    const isEscPressed = ref(false)

    const handleBlur = () => {
      if (!isEscPressed.value) {
        saveFile();
      }
      isEscPressed.value = false; // 重置标志
    };

    const getFileInfo = (fileData) =>{
        if(!fileData) return
        const fileInfo = {
            fileMd5: fileData.isFolder ? fileData.fileName : fileData.fileMd5,
            isFolder: fileData.isFolder,
            path: getCurrentUrl(),
            fileName: fileData.fileName,
            fileImg: fileData.fileCover
        }
        sendMd5(fileInfo)
        getCurrentIndex(props.index)
    }

    const rename = () =>{
        oldName.value = props.fileData.fileName
        props.fileData.isEdit = true
        reNameState.value = true

        getFocus()
    }

    watch(() => checkboxState.value, () =>{
        if(checkboxState.value){
          addFile(props.fileData.fileMd5)
        }else {
          removeFile(props.fileData.fileMd5)
        }
    })

    const exitEdit = async (e) =>{
        if(e.keyCode === 27){
          isEscPressed.value = true;
          if(reNameState.value){
              closeEdit()
            }else {
              emits('close')
            }
        }
    }

    const closeEdit = () =>{
      props.fileData.fileName = oldName.value
      reNameState.value = false
      props.fileData.isEdit = false
    }

    const saveFile = async () =>{
        if (reNameState.value){

            if(props.fileData.fileName === oldName.value || props.fileData.fileName === ''){
                getFocus()
                responseMessage(2, `${props.fileData.isFolder ? '文件夹' : '文件'}名称为空或未修改,取消重命名请按ESC键`)
                return
            }
            if(await reFileName({ newFileName: props.fileData.fileName, fileMd5: props.fileData.isFolder ? oldName.value : props.fileData.fileMd5, path: getCurrentUrl(), isFolder: props.fileData.isFolder })){
              getFileList()
              responseMessage(1, '重命名成功')
              props.fileData.isEdit = false
              reNameState.value = false
            }
        }else {
          if(props.fileData.fileName === '') {
            getFocus()
            responseMessage(2, '文件夹名称不能为空,取消创建请按ESC键')
            return
          }
          if(await createFolder({ ParentPath: getCurrentUrl(), CreateNewFolderName: props.fileData.fileName }))
            props.fileData.isEdit = false
        }

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
       },
        index: Number
    })

    defineExpose(({
        getFocus,
        rename
    }))

    const openFile = (isFolder, fileMD5, fileType) =>{
        if(isFolder){
          changeUrl(fileMD5)
          cleanSelect()

        }else {
          preview(fileMD5, fileType)
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