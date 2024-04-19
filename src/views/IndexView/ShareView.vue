<script setup>
    import { ref, onMounted, watch, onBeforeMount } from "vue";
    import { useRouter } from 'vue-router'
    import {getShareFile} from "@/api/IndexView/index.js";

    const router = useRouter()

    const { secret } = router.currentRoute.value.params
    const { pwd } = router.currentRoute.value.query

    const fileData = ref()

    onMounted(async () =>{
      if(secret !== ''){
        const res = await getShareFile({
          secret: secret,
          pwd: pwd
        })

        if(res){
          fileData.value = res
        }else {

        }
      }



    })

</script>

<template>
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