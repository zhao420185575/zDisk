<template>
    <div class="desktop-box" @click.right.native="showContextMenu($event)">

          <DiskFile :fileData="item" :index="index" v-for="(item, index) in fileData" ref="fileRef" :key="index" @close="closeCreate" />

        <div class="Tips" v-if="!fileData.length">
            <img src="/noContent.png" />
            <span>暂无文件</span>
        </div>

        <Menu ref="menu" />

      <el-dialog v-model="shareState" title="文件分享" width="400" draggable>
          <div class="dialog-box" v-if="!shareInfo">
              <span style="font-size: 18px">{{ shareData.fileName }}</span>
              <img :src="shareData.fileImg" />
              <div class="radio-box">
                    <span>是否使用密码</span>
                    <el-radio-group v-model="lockState" class="ml-4">
                      <el-radio :value="true" size="large">加密</el-radio>
                      <el-radio :value="false" size="large">不加密</el-radio>
                    </el-radio-group>
                   <el-input v-model="lockKey" placeholder="请输入加密密钥" v-show="lockState" />
              </div>
            <el-button type="primary" @click="submitShare">确认分享</el-button>
          </div>
          <div class="share-info" v-else>
              <span>分享链接：<a :href="shareInfo.key">{{ baseURL + shareInfo.key }}</a></span>
              <span v-if="shareInfo.pwd">提取码：{{ shareInfo.pwd }}</span>
            <el-button type="primary" @click="copyUrl(shareInfo.key, shareInfo.pwd)">复制到剪切板</el-button>
          </div>
      </el-dialog>

    </div>
</template>

<script setup>
import {inject, nextTick, onMounted, provide, ref, watch} from "vue";
    import DiskFile from "@/views/IndexView/components/DiskFile.vue";
  import {downloadFile, getFileArr, getShareKey} from "@/api/IndexView/index.js";
    import Menu from "@/views/IndexView/components/ContextMenu/Menu.vue";
  import {baseURL, responseMessage} from "@/api/request.js";


    const fileData = ref([])
    const fileList = ref([])

    const fileRef = ref([])

    const menu = ref(null)

    const clientX = ref()
    const clientY = ref()

    const shareState = ref(false)

    const selectIndex = ref(null)

    const getCurrentUrl = inject('getCurrentUrl')

    const shareData = ref(null)

    const lockState = ref(false)
    const lockKey = ref('')

    const shareInfo = ref(null)

    watch(() => shareState.value, (value) =>{
          if(!value){
            lockState.value = false
            lockKey.value = ''
            shareInfo.value = null
          }
    })


    const submitShare = async () =>{

        if(lockKey.value === '' && lockState.value === true){ responseMessage(2, '请填写密钥'); return }
        shareInfo.value = await getShareKey({
          fileMD5: shareData.value.fileMd5,
          isExtractTheCode: lockState.value ? 1 : 0,
          CustomPasswords: lockKey.value
        })
        if(shareInfo.value){
            responseMessage(1, '分享成功')
            console.log(shareInfo.value)
        }

    }

    const copyUrl = async (url, pwd) =>{

      try {
        let link = `分享链接：${baseURL + url}${pwd ? `提取码：${pwd}` : ''}`
        await navigator.clipboard.writeText(link);
        responseMessage(1, '已复制到剪切板')
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }

    const openShare = (data) =>{
      shareState.value = true
      shareData.value = data
    }

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

    const getFileList = async (url = getCurrentUrl()) =>{
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
    provide('openShare', openShare)



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
    .dialog-box{
      width: 100%;
      height: 400px;
      display: flex;
      align-items: center;
      flex-direction: column;
      user-select: none;
      justify-content: space-around;
    }
    .dialog-box > img{
      width: 100px;
      height: 100px;
    }
    .dialog-box .radio-box{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .share-info{
      display: flex;
      flex-direction: column;
    }
</style>