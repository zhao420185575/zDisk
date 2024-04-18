<script setup>
    import {onBeforeMount, onMounted, ref} from "vue";
    import { responseMessage } from '@/api/request.js'
    import { baseURL } from  "@/api/request.js"
    import { ElLoading } from 'element-plus'

    const videoPlayer = ref(false)
    const audioPlayer = ref(false)
    const ImagePlayer = ref(false)
    const pdfPlayer = ref(false)
    const src = ref(null)

    const loadingInstance = ref(null)

    const state = ref(false)

    const exit = () =>{
        console.log(1)
        src.value = null
        state.value = false
        videoPlayer.value = false
        audioPlayer.value = false
        ImagePlayer.value = false
        pdfPlayer.value = false
    }

    const openLoading = () =>{
        loadingInstance.value = ElLoading.service({
            lock: true,
            text: '加载中,请稍后...',
            background: 'rgba(0, 0, 0, 0)'
        })
    }

    const closeLoading = () =>{
      if (loadingInstance.value) {
        loadingInstance.value.close()
      }
    }

    const getUrl = (fileMD5, fileType) =>{

        switch (fileType){
            case 1:
                state.value = true
                videoPlayer.value = true
                src.value = `${baseURL}/api/file/FilePreview?fileMD5=${fileMD5}`
                openLoading()

                break
            case 2:
                state.value = true
                audioPlayer.value = true
                src.value = `${baseURL}/api/file/FilePreview?fileMD5=${fileMD5}`
                openLoading()
                break
            case 3:
                state.value = true
                ImagePlayer.value = true
                src.value = `${baseURL}/api/file/FilePreview?fileMD5=${fileMD5}`
                openLoading()
                break
            case 4:
            case 5:
            case 6:
            case 7:
              state.value = true
              pdfPlayer.value = true
              src.value = `${baseURL}/api/file/FilePreview?fileMD5=${fileMD5}`
              openLoading()
              break
          default:
            responseMessage(2, '此类文件暂不支持预览')

        }

    }

    window.addEventListener('keydown', (e) =>{
        if(e.keyCode === 27){
            exit()
        }
    })

    defineExpose(({
      getUrl
    }))
</script>

<template>

    <div class="frame-box" v-if="state">
        <div class="masking" @click="exit"></div>
        <div class="frame-container">
            <span class="exit-icon" @click="exit">
               <el-icon><CloseBold /></el-icon>
            </span>
            <video v-if="videoPlayer" controls autoplay @loadeddata="closeLoading">
              <source :src="src" />
            </video>
            <figure>
              <audio v-if="audioPlayer" controls autoplay :src="src" @loadeddata="closeLoading"></audio>
            </figure>
            <img v-if="ImagePlayer" :src="src" alt="" @load="closeLoading" >
            <object v-if="pdfPlayer" type="application/pdf" :data="src" @load="closeLoading" ></object>
        </div>
    </div>
</template>

<style scoped>
    .frame-box{
      height: 100vh;
      width: 100vw;
      position: fixed;
      z-index: 999;
    }
    .frame-box .masking{
        width: 100%;
        height: 100%;
        background-color: rgb(0, 0, 0, .6);

    }
    .frame-box .frame-container{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 60%;
      height: 60%;
      max-height: 60%;
      max-width: 60%;
      background-color: #000;
    }
    .frame-container > iframe{
      width: 100%;
      height: 100%;
      border: 0;
    }
    .frame-container video{
      display: block;
      width: 100%;
      height: 100%;
    }
    .frame-container audio{
      position: absolute;
      width: 60%;
      left: 50%;
      top: 90%;
      transform: translate(-50%, -50%);

    }
    .frame-container img{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .frame-container object{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .exit-icon{
        position: absolute;
        margin: 10px;
        top: 0;
        right: 0;
        color: #CDD0D6;
        font-size: 30px;
        z-index: 999;
        cursor: pointer;
    }
    .exit-icon:hover{
        color: #FFFFFF;
    }
</style>