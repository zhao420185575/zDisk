<script setup>
import {computed, onMounted, ref, nextTick, defineExpose, inject} from "vue";
import {deleteFile} from "@/api/IndexView/index.js";
import {responseMessage} from "@/api/request.js";

    const state = ref(false)
    const contextMenu = ref(null);
    const addCreate = inject('addCreate')
    const changeUrl = inject('changeUrl')
    const getCurrentUrl = inject('getCurrentUrl')
    const download = inject('download')
    const changeEdit = inject('changeEdit')
    const getFileList = inject('getFileList')
  const openShare = inject('openShare')

    const shareData = ref()

  const removeData = ref(null)
      const reNameData = ref(null)

      const createFolder = () =>{
          addCreate()
          onClose()
      }



    const onClose = () =>{
        state.value = false
      removeData.value = reNameData.value = shareData.value =  null
    }

    const showMenu = (x ,y, currentDom) =>{
        contextMenu.value.style.left = `${x}px`
        contextMenu.value.style.top = `${y}px`
        state.value = true

    }

    const handleClickOutside = (event) =>{
      if(!state.value) return
      const isClickedOutside = !event.target.closest('.menu-box')
      if(isClickedOutside){
          onClose()
      }

    }

    const getMd5 = (fileData) =>{
        removeData.value = reNameData.value = shareData.value =  fileData
    }

    onMounted(() =>{
          window.addEventListener('click', handleClickOutside)
    })

    const refresh = () =>{
        changeUrl(getCurrentUrl())
        onClose()
    }

    const downloadFile = () =>{
        download()
        onClose()
    }

    const removeFile = async () =>{
        if (!removeData.value) return
        if(await deleteFile({
          path: removeData.value.path,
          fileMd5: removeData.value.fileMd5,
          isFolder: removeData.value.isFolder
        })){
          getFileList()
          responseMessage(1, '删除成功')
          onClose()

        }

    }

    const shareFile = () =>{
        openShare(shareData.value)
        onClose()
    }

    const reFileName = () =>{
        changeEdit()
        onClose()
    }

    defineExpose(({
        showMenu,
        getMd5
    }))

</script>

<template>
    <div
        class="menu-box"
        ref="contextMenu"
        @blur="onClose"
        v-show="state"
    >
        <ul>
          <li @click="createFolder">
            <el-icon><FolderAdd /></el-icon>
            <span>新建文件夹</span>
          </li>
          <li @click="refresh">
            <el-icon><RefreshLeft /></el-icon>
            <span>刷新</span>
          </li>
          <li @click="downloadFile">
            <el-icon><Download /></el-icon>
            <span>下载</span>
          </li>
          <li v-show="removeData" @click="removeFile">
            <el-icon><Delete /></el-icon>
            <span>删除</span>
          </li>
          <li v-show="reNameData" @click="reFileName">
            <el-icon><Edit /></el-icon>
            <span>重命名</span>
          </li>
          <li v-show="shareData" @click="shareFile">
            <el-icon><Share /></el-icon>
            <span>分享</span>
          </li>
        </ul>
    </div>
</template>

<style scoped>
    li{
      list-style: none;
    }
    .menu-box{
        position: fixed;
        width: 180px;
        background: white;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 14px;
        user-select: none;
        z-index: 999;
    }
    .menu-box > ul{
        width: 100%;
        height: 100%;
    }
    .menu-box > ul > li{
        display: flex;
        width: 100%;
        height: 40px;
        align-items: center;
        padding: 4px 10px;
        box-sizing: border-box;
        cursor: pointer;
        transition: .3s background-color;
        color: #606266;
        border-radius: 4px;
    }
    .menu-box > ul > li:hover{
        background: #a0cfff;
    }
    .menu-box > ul > li > span{
        color: #303133;
        margin: 0 8px;
        font-weight: 700;
    }
</style>