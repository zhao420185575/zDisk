<script setup>
    import { ref, onMounted, watch, onBeforeMount } from "vue";
    import { useRouter } from 'vue-router'
    import {getShareFile} from "@/api/IndexView/index.js";
    import {responseMessage} from "@/api/request.js";

    const router = useRouter()

    const  secret = ref()
    const  pwd  = ref()

    const shareState = ref(false)

    const fileData = ref()

    const isPwd = ref(false)

    const getFile = async () =>{
      if(secret.value !== ''){
        const res = await getShareFile({
          secret: secret.value,
          pwd: pwd.value
        })
        if(res){
          fileData.value = res
        }else {
          shareState.value = true
          isPwd.value = true
          responseMessage(0, '缺少提取码或提取码错误')
        }
      }else {
        responseMessage(0, '缺少提取码或提取码错误')

      }
    }


    onMounted(async () =>{
      secret.value = router.currentRoute.value.params.secret
      pwd.value = router.currentRoute.value.query.pwd

      if(secret.value !== ''){
        const res = await getShareFile({
          secret: secret.value,
          pwd: pwd.value
        })

        if(res){
          fileData.value = res
        }else {
          shareState.value = true
          isPwd.value = true
          responseMessage(0, '缺少提取码或提取码错误')
        }
      }else {
        shareState.value = true

      }



    })

</script>

<template>
  <el-dialog v-model="shareState" title="请输入密钥" width="400" draggable>
    <el-form-item label="请输入口令">
      <el-input v-model="secret" style="width: 100%" placeholder="请输入密钥" />
    </el-form-item>

    <el-form-item label="请输入提取码" v-if="isPwd">
      <el-input v-model="pwd"  style="width: 240px" placeholder="请输入提取码" />
    </el-form-item>

    <el-button type="primary" @click="getFile">获取</el-button>
  </el-dialog>
    <div class="share-box">
        <div class="main-box">
            <div class="header-box">
                <div class="left">
                    <div class="file-box">
                      <el-icon><Setting /></el-icon>
                      <span>假装我是一个文件.txt</span>
                    </div>
                    <div class="time-box">
                        <div class="upload-time">
                          <el-icon><Timer /></el-icon>
                          <span>2024-04-03 15:44</span>
                        </div>
                        <div class="overdue-time">
                          <el-icon><Delete /></el-icon>
                          <span>过期时间: </span>
                          <span>永久有效</span>
                        </div>
                    </div>
                  <div class="user-box">
                    <el-icon><User /></el-icon>
                    <span>上传人: </span>
                    <span>张三</span>
                  </div>
                </div>
            </div>
          <div class="content-box">
              <div class="icon-box">
                  <img src="">
                <el-button type="primary" round>下载文件</el-button>
              </div>
          </div>
        </div>
    </div>
</template>

<style scoped>
    .share-box{
      width: 100%;
      height: 100%;
      position: relative;
      background: #F0F2F5;
      padding: 10px;
      box-sizing: border-box;
    }
    .share-box .main-box{
      width: 40%;
      height: 90%;
      background-color: #FFFFFF;
      position: absolute;
      border-radius: 14px;
      left: 50%;
      top: 50%;
      min-width: 800px;
      min-height: 1100px;
      transform: translate(-50%, -50%);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: var(--el-box-shadow-dark);
    }
    .main-box .header-box{
      width: 100%;
      height: 150px;
      border-bottom: 1px solid #E4E7ED;
    }
    .header-box .left{
      height: 100%;
      width: 350px;
      padding: 16px 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .left .file-box{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .file-box > span{
      font-size: 20px;
      margin: 0 4px;
      max-width: 80%;
      display: inline-block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .left .time-box{
      display: flex;
      justify-content: space-between;
    }
    .time-box > div{
      display: flex;
      align-items: center;
    }
    .left .user-box{
      display: flex;
      align-items: center;
    }
    .main-box .content-box{
      width: 100%;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
      background-color: #E4E7ED;
      position: relative;
    }
    .content-box .icon-box{
      position: absolute;
      left: 50%;
      top: 30%;
      transform: translateX(-50%);
    }
</style>