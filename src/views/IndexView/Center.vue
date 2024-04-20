<script setup>
import 'element-plus/dist/index.css'
import { ref, reactive } from 'vue'
/* 切换表单 */
const radioGroup = ref('modifyPersonalData')

//以下是个人资料的表单数据
const modifyPersonalData = ref(null)/* 个人资料表单dom */
const modifyPersonalDataForm = reactive({/* 修改个人资料的form */
  userName: '',
  userAccount: '',
  joinDate: ''
})
const rules1 = {/* 个人资料表单校验规则 */
  userName: [{required: true, message: '用户名不能为空', trigger: 'blur'}]
}
const updataPersonalData = async (form) => {/* 提交个人资料表单 */
  if(!form) return
  await modifyPersonalData.value.validate((valid, fields) => {
    if (valid) {
      console.log('校验通过', valid)
    } else {
      console.log('校验失败', fields)
    }
  })
}
const resetForm1 = (form) => {/* 个人资料表单重置 */
  if (!form) return
  modifyPersonalData.value.resetFields()
}


//以下是修改密码的表单数据
const modifyPassword = ref(null)/* 修改密码的dom */
const modifyPasswordForm = reactive({/* 修改密码的form */
  userAccount: '',
  emailCode: '',
  newPassword: ''
})
const rules2 = {/* 修改密码表单校验规则 */
  emailCode: [{required: true, message: '验证码不能为空', trigger: 'blur'}],
  newPassword: [{required: true, message: '新密码不能为空', trigger: 'blur'}],
}
const updatePassword = async (form) => {
  if(!form) return
  await modifyPassword.value.validate((valid, fields) => {
    if (valid) {
      console.log('校验通过', valid)
    } else {
      console.log('校验失败', fields)
    }
  })
}
const resetForm2 = (form) => {/* 个人资料表单重置 */
  if (!form) return
  modifyPassword.value.resetFields()
}
const sendEmailCode = () => {/* 发送邮箱验证码 */

}

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
      <div class="form-box" v-if="radioGroup === 'modifyPersonalData'">
        <el-form style="max-width: 500px" status-icon label-width="auto" size="large"
                 ref="modifyPersonalData" :model="modifyPersonalDataForm" :rules="rules1">
          <!-- 表单信息 -->
          <el-form-item label="用户名" prop="userName" show-message>
            <el-input type="text" required v-model="modifyPersonalDataForm.userName"/>
          </el-form-item>
          <el-form-item label="账号" prop="userAccount">
            <el-input type="text" :disabled="true" v-model="modifyPersonalDataForm.userAccount" value="此处为用户邮箱" />
          </el-form-item>
          <el-form-item label="创建时间" prop="joinDate">
            <el-input type="text" :disabled="true" v-model="modifyPersonalDataForm.joinDate" value="此处为创建时间" />
          </el-form-item>

          <!-- 表单操作 -->
          <el-form-item class="operation">
            <el-button type="primary" @click="updataPersonalData(modifyPersonalDataForm)">保存</el-button>
            <el-button @click="resetForm1(modifyPersonalDataForm)">重置</el-button>
          </el-form-item>

        </el-form>
      </div>
      <div class="form-box" v-else>
        <el-form style="max-width: 500px" status-icon label-width="auto" size="large"
                 ref="modifyPassword" :model="modifyPasswordForm" :rules="rules2">
          <!-- 表单信息 -->
          <el-form-item label="账号" prop="userAccount">
            <el-input type="text" required :disabled="true" value="此处为用户邮箱"/>
          </el-form-item>
          <el-form-item label="验证码" prop="emailCode" show-message>
            <el-input style="max-width: 40%" v-model="modifyPasswordForm.emailCode" />
            <el-button type="primary" class="sendCodeBtn" @click="sendEmailCode">发送验证码</el-button>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword" show-message>
            <el-input type="password" v-model="modifyPasswordForm.newPassword" />
          </el-form-item>

          <!-- 表单操作 -->
          <el-form-item class="operation">
            <el-button
                type="primary"
                @click="updatePassword(modifyPasswordForm)"
            >保存</el-button>
            <el-button @click="resetForm2(modifyPasswordForm)">重置</el-button>
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