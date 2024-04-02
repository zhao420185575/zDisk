<template>
    <div class="login-box">
        <div class="left-box">
            <div class="login-window">
                <div class="window-itemA"></div>
                <div class="window-itemB"></div>
                <LoginBox ref="itemC" />
                <RegisterBox ref="itemD" />

            </div>
        </div>
        <div class="right-box">

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, provide } from "vue";
    import {login, getCaptchaImg, getEmailCode} from "@/api/LoginView/index.js";
    import LoginBox from "./components/LoginBox.vue"
    import RegisterBox from "./components/RegisterBox.vue"


    const formRules = ref({
        username: [
            {

            }
        ]
    })

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













    // onMounted(() =>{
    //     getCaptcha()
    // })

</script>

<style scoped>
    .login-box{
        width: 100vw;
        height: 100vh;
        display: flex;
        background: antiquewhite;
    }
    .login-box .left-box{
        width: 40%;
        height: 100%;
        background: antiquewhite;
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
        width: 60%;
        height: 100%;
        background: blueviolet;
        /*border-top-left-radius: 60%;*/
        border-bottom-left-radius: 60%;
    }

</style>