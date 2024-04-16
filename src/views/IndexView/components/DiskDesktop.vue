<template>
    <div class="desktop-box" @click.right.native="showContextMenu($event)">

          <DiskFile :fileData="item"  v-for="(item, index) in fileData" ref="fileRef" :key="index" />

        <div class="Tips" v-if="!fileData.length">
            <img src="/noContent.png" />
            <span>暂无文件</span>
        </div>
        <Menu ref="menu" />
    </div>
</template>

<script setup>
  import {inject, nextTick, onMounted, provide, ref} from "vue";
    import DiskFile from "@/views/IndexView/components/DiskFile.vue";
    import {downloadFile, getFileArr} from "@/api/IndexView/index.js";
    import Menu from "@/views/IndexView/components/ContextMenu/Menu.vue";

    const fileData = ref([])
    const fileList = ref([])

    const fileRef = ref([])

    const menu = ref(null)

    const clientX = ref()
    const clientY = ref()

    const addCreate =  () =>{
        fileData.value.push({
            fileCover: "http://10.205.103.88:8881/api/icon/folder.png",
            fileCreateTime: "",
            fileMd5: '',
            fileName: "",
            isFolder: 0,
            isEdit: true
        })

        nextTick(() =>{
          fileRef.value[fileData.value.length - 1].getFocus()
        })
    }

    const showContextMenu = (e) =>{
        e.preventDefault()
        clientX.value = e.clientX
        clientY.value = e.clientY
        if(e.target.className === 'file-icon' || e.target.className === 'file-container'){
            let currentDom = e.target
        }

        menu.value.showMenu(clientX.value, clientY.value, e.target)
    }

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
        download,
        addCreate
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
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: flex-start;
        align-content: flex-start;
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