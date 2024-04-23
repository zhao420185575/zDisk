<script setup>
import 'element-plus/dist/index.css'
import { ref, onMounted } from 'vue'
import { getEmailVerificationCode, getUserInfo, updateUsername, updateUserPassword} from '@/api/IndexView/index.js'
import { responseMessage } from '@/api/request.js'
import { debounce, throttle } from '@/api/utils.js'
import router from "@/router/index.js";

const time = ref(60)
const isSend = ref(false)
const isDisposed = ref(false)
//切换表单
const radioGroup = ref('modifyPersonalData')
//用户数据
const myData = ref(null)
//获取用户数据
const getData = async (msg) => {
  myData.value = await getUserInfo()
  modifyPersonalDataForm.value = myData.value
  modifyPasswordForm.value.email = myData.value.email
  responseMessage(1, `${msg}用户信息成功`)
}

//以下是个人资料的表单数据
const modifyPersonalData = ref(null)/* 个人资料表单dom */
const modifyPersonalDataForm = ref({/* 修改个人资料的form */
  userName: '',
  email: '',
  joinTime: ''
})
const rules1 = {/* 个人资料表单校验规则 */
  userName: [{ required: true, message: '用户名不能为空', trigger: 'blur' }]
}
const updatePersonalData = async () => {/* 提交个人资料表单 */
  await modifyPersonalData.value.validate(async (valid) => {
    if (valid) {
      if (await updateUsername(modifyPersonalDataForm.value.userName)) {
        getData('更新')
      }
    }
  })
}
const resetForm1 = () => {/* 个人资料表单重置 */
  modifyPersonalDataForm.value.userName = null
}
const debounceUpdatePersonalData = debounce(updatePersonalData)


//以下是修改密码的表单数据
const modifyPassword = ref(null)/* 修改密码的dom */
const modifyPasswordForm = ref({/* 修改密码的form */
  email: '',
  emailCode: '',
  emailId: '',
  newPassword: ''
})
const checkNewPassword = (rule, value, callback) => {
  if(value === ''){
    return callback(new Error('新密码不能为空'))
  } else if(value.length < 6){
    return callback(new Error('新密码长度不能小于6位'))
  } else {
    return callback()
  }
}
const rules2 = {/* 修改密码表单校验规则 */
  emailCode: [{required: true, message: '验证码不能为空', trigger: 'blur'}],
  newPassword: [{required: true, validator: checkNewPassword, trigger: 'blur'}],
}
const updatePassword = async () => {
  if(modifyPasswordForm.value.emailId === ''){
    return responseMessage(2, '请先获取验证码')
  } else {
    await modifyPassword.value.validate(async (valid) => {
      if(valid){
        if(await updateUserPassword(modifyPasswordForm.value)){
          localStorage.removeItem('token')
          router.push({name: 'login'})
        }
      }
    })
  }
}
const resetForm2 = () => {/* 个人资料表单重置 */
  modifyPasswordForm.value.emailCode = null
  modifyPasswordForm.value.newPassword = null
}
const sendCaptcha = async () => {/* 发送邮箱验证码 */
  isDisposed.value = true
  modifyPasswordForm.value.emailId = await getEmailVerificationCode(modifyPasswordForm.value.email)
  if(modifyPasswordForm.value.emailId){
    isSend.value = true
    handleTimeChange()
  }
}
const debounceUpdatePassword = debounce(updatePassword)
const handleTimeChange = () => {
  if (time.value <= 0) {
    isSend.value = false
    isDisposed.value = false
    time.value = 60
  } else {
    setTimeout(() => {
      time.value--
      handleTimeChange()
    }, 1000)
  }
}


onMounted(() => {
  getData('获取')
})

</script>

<template>
  <div class="share-box">
    <div class="main-box">
      <div class="select-box">
        <el-radio-group v-model="radioGroup" size="large">
          <el-radio-button label="修改资料" value="modifyPersonalData" />
          <el-radio-button label="修改密码" value="modifyPassword" />
        </el-radio-group>
      </div>
      <!--   修改资料   -->
      <div class="form-box" v-if="radioGroup === 'modifyPersonalData'">
        <el-form style="max-width: 500px" label-width="auto" size="large"
                 ref="modifyPersonalData" :model="modifyPersonalDataForm" :rules="rules1">
          <!-- 表单信息 -->
          <el-form-item label="用户名" prop="userName" show-message>
            <el-input type="text" required v-model="modifyPersonalDataForm.userName" @keyup.enter="debounceUpdatePersonalData"/>
          </el-form-item>
          <el-form-item label="账号" prop="email">
            <el-input type="text" :disabled="true" v-model="modifyPersonalDataForm.email" />
          </el-form-item>
          <el-form-item label="创建时间" prop="joinTime">
            <el-input type="text" :disabled="true" v-model="modifyPersonalDataForm.joinTime" />
          </el-form-item>

          <!-- 表单操作 -->
          <el-form-item class="operation">
            <el-button type="primary" @click="debounceUpdatePersonalData">保存</el-button>
            <el-button @click="resetForm1">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!--   修改密码   -->
      <div class="form-box" v-else>
        <el-form style="max-width: 500px" label-width="auto" size="large"
                 ref="modifyPassword" :model="modifyPasswordForm" :rules="rules2">
          <!-- 表单信息 -->
          <el-form-item label="账号" prop="email">
            <el-input type="text" required :disabled="true" v-model="modifyPasswordForm.email"/>
          </el-form-item>
          <el-form-item label="验证码" prop="emailCode" show-message>
            <el-input style="max-width: 40%" v-model="modifyPasswordForm.emailCode" @keyup.enter="debounceUpdatePassword" />
            <el-button
                type="primary"
                class="sendCodeBtn"
                :disabled="isDisposed"
                @click="sendCaptcha"
            >{{ isSend ? `${time}s` : (isDisposed? '发送中...':'发送验证码') }}</el-button>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword" show-message>
            <el-input type="password" show-password v-model="modifyPasswordForm.newPassword" @keyup.enter="debounceUpdatePassword" />
          </el-form-item>

          <!-- 表单操作 -->
          <el-form-item class="operation">
            <el-button
                type="primary"
                @click="debounceUpdatePassword"
            >保存</el-button>
            <el-button @click="resetForm2">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.share-box {
  width: 100%;
  height: 100%;
  position: relative;
  background: #F0F2F5;
  padding: 14px;
  box-sizing: border-box;
}

.main-box {
  width: 40%;
  height: 90%;
  background-color: #FFFFFF;
  border-radius: 14px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 40%;
  min-height: 90%;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: var(--el-box-shadow-dark);
  box-sizing: border-box;
}

.form-box {
  width: 65%;
  height: 100%;
  margin: 10%;
  display: flex;
  flex-direction: column;
}

.select-box {
  width: 65%;
  height: 0;
  margin-top: 10%;
}

.sendCodeBtn {
  margin-left: 5%;
}

</style>