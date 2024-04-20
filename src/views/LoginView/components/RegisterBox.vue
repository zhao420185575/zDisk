<template>
  <div class="window-itemD">
    <el-text class="title" size="large">注册</el-text>
    <div class="input-box">
      <el-form
          :model="regFormData"
          label-position="top"
          @submit.prevent=""
          ref="form"
          :rules="formRules"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input
              v-model="regFormData.email"
              size="large"
              placeholder="请输入邮箱"
          >
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
              v-model="regFormData.password"
              size="large"
              type="password"
              show-password
              placeholder="请输入密码"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
              v-model="regFormData.confirmPassword"
              size="large"
              type="password"
              show-password
              placeholder="请输入密码"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱验证码" prop="emailCode">
          <el-col style="display: flex; align-items: center; justify-content: flex-start">
            <el-input
                v-model="regFormData.emailCode"
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
</template>

<script setup>
import { inject, ref } from "vue";
import { getEmailCode, register } from "@/api/LoginView/index.js";
import { ElMessage } from 'element-plus'

const switchFunc = inject("switchFunc")
const form = ref(null)
const regFormData = ref({
  email: '',
  password: '',
  confirmPassword: '',
  emailId: '',
  emailCode: ''
})

const checkEmail = (rule, value, callback) =>{
  let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
  if(value == ''){
    return callback(new Error('邮箱不能为空'))
  }
  if(reg.test(value)){
    return callback()
  }
  return callback(new Error('请输入正确的邮箱格式'))
}

const checkConfirmPassword = (rule, value, callback) => {
  if(value == ''){
    return callback(new Error('确认密码不能为空'))
  } else if(regFormData.value.password != value){
    return callback(new Error('密码和确认密码不一致，请重新输入'))
  }
  return callback()
}

const formRules = {
  email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  confirmPassword: [{ required: true, validator: checkConfirmPassword, trigger: 'blur' }]
}

const isDisposed = ref(false)
const time = ref(60)

const sendCaptcha = async () =>{
  regFormData.value.emailId = await getEmailCode(regFormData.value.email)
  if(regFormData.value.emailId){
    handleTimeChange()
  }
}

const onSubmit = async () =>{
  if(await register(regFormData.value)){
    switchFunc()
  }
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


</script>

<style scoped>
.login-window .reg-join{
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
}

.window-itemD{
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
.Tips-box .signup{
  cursor: pointer;
  color: #3f3e3e;
  border-bottom: 1px solid #3f3e3e;
}
</style>