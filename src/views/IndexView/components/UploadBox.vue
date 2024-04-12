<script setup>
    import {inject, ref} from "vue";
    import { uploadFile, verifySharding } from '@/api/IndexView/index.js'
    import SparkMD5 from 'spark-md5'
    const uploadBox = ref(true)
    const fileList = ref([])
    const getCurrentUrl = inject('getCurrentUrl')

    const onUpload = async (File) => {
      const chunkSize = 30 * 1024 * 1024; // 分片大小
      const file = File.raw // 文件
      const fileSize = File.size // 文件大小
      let chunkCount = Math.ceil(fileSize / chunkSize) // 分片数量
      if(chunkSize > fileSize){ // 文件过小就一片
        chunkCount = 1
      }
      // 文件md5，给文件一个唯一标识
      const fileMd5 = await getFileMd5(file, chunkCount, chunkSize);
      // 上传分片
      for( let i=0;i<chunkCount;i++) {
        const start = i * chunkSize //分片开始
        const end = Math.min(fileSize, start + chunkSize) // 分片结束
        const _chunkFile = File.raw.slice(start, end) // 分片文件
        // 定义分片上传接口参数，跟后端商定
        const formdata = new FormData()

        formdata.append('chunk', i.toString())  // 当前块索引
        formdata.append('chunks', chunkCount.toString())  //文件块数
        formdata.append('name', File.name)  //文件名称
        formdata.append('size', _chunkFile)   // 切片后的文件
        formdata.append('path', getCurrentUrl())
        formdata.append('chunkMD5', fileMd5)  //文件Md5值
        formdata.append('schunkSize', _chunkFile.size)  //当前块大小



        // 检查分片文件是否上传-没有上传则上传
        const params = { chunkNumber: i, fileMd5: fileMd5 }
        const data = await verifySharding(params) // 检验接口-自己定义

        if(!data.flag){
          console.log("开始上传第" + i + "个分片")
          await uploadChunkFile(formdata) // 上传接口-自己定义
        }
      }

      // 合并
      const mergeData = { // 合并参数
        fileName: File.name,
        fileSign: fileMd5
      }
      mergeFile(mergeData)// 合并接口-自己定义
    }

    const checkChunkFile = (formdata) => {

    }

    const uploadChunkFile = (formdata) => {

      uploadFile(formdata)
    }

    const mergeFile = (mergeData) => {

    }

    const getFileMd5 = (file, chunkCount, chunkSize) => {
      return new Promise((resolve, reject) => {
        const blobSlice = File.prototype.slice
        const chunks = chunkCount
        let currentChunk = 0
        const spark = new SparkMD5.ArrayBuffer()
        const fileReader = new FileReader()
        fileReader.onload = e => {
          spark.append(e.target?.result)
          currentChunk ++
          if(currentChunk < chunks){
            loadNext()
          } else {
            const md5 = spark.end()
            resolve(md5)
          }
        }
        fileReader.onerror = e => {
          reject(e)
        }
        function loadNext () {
          const start = currentChunk * chunkSize
          let end = start + chunkSize
          if(end > file.size){
            end = file.size
          }
          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
        }
        loadNext()
      })
    }


    const switchState = () =>{
        uploadBox.value = !uploadBox.value
    }

    defineExpose(({
      switchState
    }))
</script>

<template>
    <el-dialog
        v-model="uploadBox"
        title="上传文件"
        width="800"
        draggable
    >

      <el-upload
          drag
          v-model:file-list="fileList"
          :on-change="onUpload"
          :auto-upload="false"
          ref="uploadfile"
          :limit="1"
          :show-file-list="false"
      >
        <div class="upload-demo">
          <el-icon size="60" color="#C0C4CC"><FolderOpened /></el-icon>
          <span>点击上传或把文件拖拽到此处上传</span>
        </div>
      </el-upload>


      <template #footer>
        <div class="dialog-footer">
          <el-button @click="switchState">关闭/隐藏</el-button>
        </div>
      </template>
    </el-dialog>
</template>

<style scoped>
    .function-box .function-bar{

    }
    .upload-demo{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .upload-demo > span{
      font-size: 18px;
      color: #C0C4CC;
      font-weight: 900;
    }
</style>