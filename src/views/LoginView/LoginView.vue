<template>
    <div class="login-box">
        <div class="left-box">
            <div class="login-window">
                <div class="window-itemA"></div>
                <div class="window-itemB"></div>
                <div class="window-itemC" ref="itemC">
                    <el-text class="title" size="large">登录</el-text>
                    <div class="input-box">
                        <el-form
                            :model="formData"
                            label-position="top"
                            @submit.prevent=""
                        >
                            <el-form-item label="账号">
                                <el-input
                                    v-model="formData.username"
                                    size="large"
                                    placeholder="请输入账号"
                                >
                                    <template #prefix>
                                        <el-icon><User /></el-icon>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input
                                    v-model="formData.password"
                                    size="large"
                                    type="password"
                                    placeholder="请输入密码"
                                >
                                    <template #prefix>
                                        <el-icon><Lock /></el-icon>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="验证码">
                                <el-col style="display: flex">
                                    <el-input
                                        v-model="formData.graphicsCode"
                                        size="large"
                                        placeholder="请输入验证码"
                                    >
                                        <template #prefix>
                                            <el-icon><PictureFilled /></el-icon>
                                        </template>
                                    </el-input>
                                    <img :src="captchaImg" class="captchaImg" @click="getCaptcha" alt="点我刷新验证码">
                                </el-col>

                            </el-form-item>
                            <div class="button-box">
                                <button @click="onSubmit">登录</button>
                                <button>找回密码</button>
                            </div>
                        </el-form>
                    </div>
                    <div class="Tips-box">
                        <el-text class="mx-1" size="small">还没有账号吗? 点我立即前往</el-text>
                        <a class="signup" @click="switchFunc">注册</a>
                    </div>

                </div>

                <div class="window-itemD" ref="itemD">
                    <el-text class="title" size="large">注册</el-text>
                    <div class="input-box">
                        <el-form
                            :model="formData"
                            label-position="top"
                            @submit.prevent=""
                        >
                            <el-form-item label="账号">
                                <el-input
                                    v-model="formData.username"
                                    size="large"
                                    placeholder="请输入账号"
                                >
                                    <template #prefix>
                                        <el-icon><User /></el-icon>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input
                                    v-model="formData.password"
                                    size="large"
                                    type="password"
                                    placeholder="请输入密码"
                                >
                                    <template #prefix>
                                        <el-icon><Lock /></el-icon>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="确认密码">
                                <el-input
                                    v-model="formData.confirmPassword"
                                    size="large"
                                    type="password"
                                    placeholder="请输入密码"
                                >
                                    <template #prefix>
                                        <el-icon><Lock /></el-icon>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="邮箱验证码">
                                <el-col style="display: flex; align-items: center; justify-content: flex-start">
                                    <el-input
                                        v-model="formData.emailCode"
                                        size="large"
                                        placeholder="请输入验证码"
                                    >
                                        <template #prefix>
                                            <el-icon><PictureFilled /></el-icon>
                                        </template>
                                    </el-input>
                                    <el-button
                                        type="primary"
                                        style="margin: 0 10px; width: 150px;"
                                        size="large"
                                        color="#626aef"
                                        :disabled="isDisposed"
                                        @click="sendCaptcha"
                                    >{{ isDisposed ? `${time}s` : '获取验证码' }}</el-button>
                                </el-col>

                            </el-form-item>
                            <div class="button-box">
                                <button @click="onSubmit">注册</button>
                                <button>重置</button>
                            </div>
                        </el-form>
                    </div>
                    <div class="Tips-box">
                        <el-text class="mx-1" size="small">已经有账号了, 点击前往</el-text>
                        <a class="signup" @click="switchFunc">登录</a>
                    </div>

                </div>

            </div>
        </div>
        <div class="right-box">

        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import { login, getCaptchaImg } from "@/api/LoginView/index.js";


    const formData = ref({
        username: '',
        password: '',
        graphicsCode: '',
        graphicsCodeId: ''
    })
    const regFormData = ref({
        email: '',
        userName: '',
        password: '',
        confirmPassword: '',
        id: '',
        emailCode: ''
    })
    const captchaImg = ref()
    const isLogin = ref(true)
    const itemC = ref()
    const itemD = ref()

    const isDisposed = ref(false)
    const time = ref(60)
    const onSubmit = async () =>{
        if(await login(formData.value)){
            console.log('登录成功')
        }
    }

    const sendCaptcha = () =>{
        handleTimeChange()
    }

    const handleTimeChange = () => {
        if (time.value <= 0) {
            isDisposed.value = false
            time.value = 60
        } else {
            isDisposed.value = true
            setTimeout(() => {
                time.value--
                console.log(time.value)
                handleTimeChange()
            }, 1000)
        }
    }

    const switchFunc = () =>{
        if(isLogin.value){
            isLogin.value = !isLogin.value
            itemC.value.classList.add('login-out')
            itemD.value.classList.add('reg-join')
        }else {
            isLogin.value = !isLogin.value
            itemC.value.classList.remove('login-out')
            itemD.value.classList.remove('reg-join')
        }
    }

    const getCaptcha = async () =>{
        let captchaData
        captchaData = await getCaptchaImg()
        formData.value.graphicsCodeId = captchaData.codeId
        captchaImg.value = captchaData.captchaBase64
    }


    onMounted(() =>{
        getCaptcha()
    })

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
    .login-window .window-itemC{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 500px;
        height: 600px;
        background: white;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        transition: .4s all;
    }
    .login-window .reg-join{
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
    }
    .login-window .login-out{
        left: 100%;
        transform: translateY(-50%);
    }
    .login-window .window-itemD{
        position: absolute;
        top: 50%;
        left: -100%;
        transform: translateY(-50%);
        width: 500px;
        height: 600px;
        background: white;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        transition: .4s all;
    }
    .window-itemD .title{
        font-size: 24px;
        font-weight: 900;
    }
    .window-itemC .title{
        font-size: 24px;
        font-weight: 900;

    }
    .window-itemC .input-box{
        width: 80%;
        height: 50%;
    }
    .input-box .captchaImg{
        cursor: pointer;
    }
    .input-box .button-box{
        display: flex;
        justify-content: space-around;
    }
    .button-box button{
        border: 0;
        padding: 14px 40px;
        border-radius: 25px;
        color: white;
        font-size: 16px;
        font-weight: 700;
        background: none;
        cursor: pointer;
        letter-spacing: 5px;
    }
    .button-box button:nth-child(1){
        border: 1px solid rgb(52, 59, 215);
        background: rgb(57, 64, 222);
    }
    .button-box button:nth-child(1):hover{
        background: rgb(37, 42, 169);
    }
    .button-box button:nth-child(2){
        background: rgb(238, 242, 251);
        color: #656363;
    }
    .button-box button:nth-child(2):hover{
        background: rgb(218, 222, 229);
    }
    .window-itemC .Tips-box{

    }
    .Tips-box .signup{
        cursor: pointer;
        color: #3f3e3e;
        border-bottom: 1px solid #3f3e3e;
    }
    .login-box .right-box{
        width: 60%;
        height: 100%;
        background: blueviolet;
        /*border-top-left-radius: 60%;*/
        border-bottom-left-radius: 60%;
    }

</style>