<template>
    <div class="desktop-box" @click.right.native="showContextMenu($event)">

          <DiskFile :fileData="item" :index="index" v-for="(item, index) in fileData" ref="fileRef" :key="index" @close="closeCreate" />

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
  import {responseMessage} from "@/api/request.js";


    const fileData = ref([])
    const fileList = ref([])

    const fileRef = ref([])

    const menu = ref(null)

    const clientX = ref()
    const clientY = ref()

    const selectIndex = ref(null)

    const getCurrentUrl = inject('getCurrentUrl')

    const cleanSelect = () =>{
      getFileList(getCurrentUrl())
      fileList.value = []
    }

    const sendMd5 = (fileData) =>{
        menu.value.getMd5(fileData)
    }

    const addCreate =  () =>{
        fileData.value.push({
            fileCover: "http://10.205.103.88:8881/icon/folder.png",
            fileCreateTime: "",
            fileMd5: '',
            fileName: "",
            isFolder: 1,
            isEdit: true
        })

        nextTick(() =>{
          fileRef.value[fileData.value.length - 1].getFocus()
        })
    }



    const closeCreate = () =>{
        fileData.value.pop()
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

    }

    const removeFile = (fileMd5) =>{
        let index = fileList.value.indexOf(fileMd5)
        if(index !== -1){
            fileList.value.splice(index)
        }
    }

    const getFileList = async (url) =>{
        fileData.value = await getFileArr(url)
    }

  const changeEdit = () =>{
      fileRef.value[selectIndex.value].rename()
  }

  const getCurrentIndex = (index) =>{
    selectIndex.value = index
  }
    provide('addFile', addFile)
    provide('removeFile', removeFile)
    provide('addCreate', addCreate)
    provide('getFileList', getFileList)
    provide('cleanSelect', cleanSelect)
    provide('sendMd5', sendMd5)
    provide('changeEdit', changeEdit)
    provide('getCurrentIndex', getCurrentIndex)



    const download = async () =>{
      if(fileList.value.length === 0) {
        responseMessage(2, '请勾选需要下载的文件')
        return
      }
      if(await downloadFile(fileList.value)){
          cleanSelect()
          responseMessage(1, '下载成功')
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