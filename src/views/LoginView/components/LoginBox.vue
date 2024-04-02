<template>
    <div class="window-itemC" ref="itemC">
        <el-text class="title" size="large">登录</el-text>
        <div class="input-box">
            <el-form
                    :model="formData"
                    label-position="top"
                    @submit.prevent=""
                    status-icon
                    :rules="formRules"
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

</template>

<script setup>
    import { onMounted, ref, inject } from "vue";
    import { login, getCaptchaImg } from "@/api/LoginView/index.js";

    const switchFunc = inject("switchFunc")

    const formData = ref({
        username: '',
        password: '',
        graphicsCode: '',
        graphicsCodeId: ''
    })
    const captchaImg = ref()
    const onSubmit = async () =>{
        if(await login(formData.value)){
            console.log('登录成功')
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
    .window-itemC{
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
    .login-window .login-out{
        left: 100%;
        transform: translateY(-50%);
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
</style>