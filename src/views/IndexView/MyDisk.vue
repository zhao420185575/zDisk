<template>
    <div class="main-box">
        <div class="function-box">
            <div class="url-box">
                <el-input
                    v-model="url"
                    style="max-width: 600px"
                    class="input-with-select"
                >
                    <template #prepend>
                        <el-button @click="goBack">
                            <el-icon><Back /></el-icon>
                        </el-button>
                    </template>
                </el-input>
            </div>
            <div class="function-bar">
              <el-button type="primary" @click="openUploadBox">
                <el-icon><UploadFilled /></el-icon>
                  <span>上传文件</span>
              </el-button>

              <el-button type="success" @click="download" :disabled="isDisabled"
                         v-loading="loading" element-loading-text="下载中..." element-loading-background="rgba(255, 255, 255, 0.4)">
                <el-icon><Download /></el-icon>
                <span>下载/批量下载</span>
              </el-button>

              <el-button @click="createFolder">
                <el-icon><FolderAdd /></el-icon>
                <span>新建文件夹</span>
              </el-button>

            </div>
        </div>

        <UploadBox ref="uploadBox" :diskDeskRef="desktop" />

        <DiskDesktop ref="desktop" />

    </div>
</template>

<script setup>
    import { nextTick, provide, ref, watch } from "vue";
    import DiskDesktop from "@/views/IndexView/components/DiskDesktop.vue";
    import UploadBox from "@/views/IndexView/components/UploadBox.vue";


    const url = ref("/")
    const oldUrl = ref("/")
    const desktop = ref(null)
    const getFileList = ref(null)
    const uploadBox = ref(null)
    const isDisabled = ref(false)
    const loading = ref(false)

    const createFolder = () =>{
        desktop.value.addCreate()
    }

    const openUploadBox = () =>{
        uploadBox.value.switchState()
    }

    const changeUrl = (newUrl) =>{
        if(newUrl === '/'){ url.value = newUrl; return }
        oldUrl.value = url.value
        url.value = url.value.length > 1 ? '/' + url.value + newUrl : url.value + newUrl
    }

    const goBack = () =>{
        url.value = oldUrl.value
    }

    const getCurrentUrl = () =>{
        return url.value
    }

    const download = () =>{
        isDisabled.value = true
        loading.value = true
        desktop.value.download()
    }

    watch(() => url.value, (newUrl, oldUrl) =>{
        nextTick(() =>{
            desktop.value.getFileList(newUrl)
        })

    })

    provide('changeUrl', changeUrl)
    provide('getCurrentUrl', getCurrentUrl)
    provide('download', download)
    provide('isDisabled', isDisabled)
    provide('loading', loading)
</script>

<style scoped>
    .main-box{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 14px;
        display: flex;
        flex-direction: column;
    }
    .main-box .url-box{
        user-select: none;
        margin: 0 0 8px 0;
        width: 400px;
    }
    .main-box .function-box{
      display: flex;
      flex-direction: row;
      width: 100%;
      align-items: center;
    }
    .function-box .function-bar{
      margin-left: 30px;
      display: flex;
      align-items: center;
    }
</style>