<template>
    <div class="login-box">
        <div class="left-box">
            <div class="font-box">
              <el-text class="title" type="primary">ZDisk(Z网盘)</el-text>
              <el-text class="introduction" type="info">安全、高效、便捷的云端存储工具</el-text>
            </div>
            <div class="login-window">
                <div class="window-itemA"></div>
                <div class="window-itemB"></div>
                <LoginBox ref="itemC" />
                <RegisterBox ref="itemD" />
            </div>
        </div>
        <div class="right-box">
            <div class="font-box">
              <el-text class="title" type="primary">ZDisk(Z网盘)</el-text>
              <el-text class="introduction" type="info">安全、高效、便捷的云端存储工具</el-text>
            </div>
            <div class="logo-box">
                <img src="/bg.png" class="bg">
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted, provide, nextTick} from "vue";
    import LoginBox from "./components/LoginBox.vue"
    import RegisterBox from "./components/RegisterBox.vue"

    const itemC = ref()
    const itemD = ref()
    const isLogin = ref(true)
    const switchFunc = () =>{
        if(isLogin.value){
            isLogin.value = !isLogin.value
            itemC.value.$el.classList.add('login-out')
            itemD.value.$el.classList.add('reg-join')
        }else {
            isLogin.value = !isLogin.value
            itemC.value.$el.classList.remove('login-out')
            itemD.value.$el.classList.remove('reg-join')
        }
    }

    provide('switchFunc', switchFunc)



</script>

<style scoped>
    .login-box{
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: row-reverse;
    }
    .login-box .left-box{
        width: 50%;
        height: 100%;
        background-color: rgb(220, 230, 240);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .left-box .login-window{
        width: 600px;
        height: 800px;
        position: relative;
        overflow: hidden;

    }
    .left-box > .font-box {
      display: none;
    }
    .login-window .window-itemA{
      position: absolute;
      right: 0;
      width: 500px;
      height: 100%;
      background: rgb(126, 131, 232);
      border-radius: 25px;
    }
    .login-window .window-itemB{
      position: absolute;
      left: 0;
      bottom: 50px;
      width: 200px;
      height: 200px;
      background: rgb(245, 154, 211, 0.7);
      border-radius: 15px;
    }

    .login-box .right-box{
        position: relative;
        width: 50%;
        height: 100%;
        background-color: rgb(220, 230, 240);
        user-select: none;

    }
    .right-box .logo-box{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
    }
    .logo-box .bg {
      width: inherit;
      height: 100%;
    }
    .right-box .font-box{
      position: absolute;
      top: 20px;
      left: 100px;
      display: flex;
      flex-direction: column;
    }
    .font-box .title{
        font-size: 60px;
        font-weight: 900;
    }
    .font-box .introduction{
      font-size: 18px;
      font-weight: 900;
    }

    @media screen and (max-width: 1350px) {
      .right-box{
        display: none;
      }
      .login-box .left-box {
        width: 100%;
        flex-direction: column;
        box-sizing: border-box;
      }
      .left-box > .font-box {
        display: flex;
        flex-direction: column;
        margin: 5% 0;
      }
      .font-box .title{
        font-size: calc(100vw / 20);
      }
      .font-box .introduction{
        font-size: calc(100vw / 45);
      }
    }
    @media screen and (max-width: 750px){
      .left-box .login-window{
        width: 90%;
        height: 70%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .login-window .window-itemA{
        width: 100%;
        height: 100%;
      }
      .login-window .window-itemB {
        display: none;
      }
      .login-window .window-itemC {
        width: 100%;
        height: 75%;
      }
      .left-box > .font-box {
        display: flex;
        flex-direction: column;
        margin: 5% 0;
        position: absolute;
        top: 0%;
      }
      .font-box .title{
        font-size: 40px;
      }
      .font-box .introduction{
        font-size: 20px;
      }
    }
</style>