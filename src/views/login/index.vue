<template>
  <div class="login-container">
    <div style="position: absolute;width: 100%;height: 100vh">
      <div v-for="item in snow" :key="item.id" class="snow"></div>
    </div>
    <el-form ref="loginFromRef" class="login-form" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">Vue3后台系统</h3>
      </div>

      <el-form-item prop="username" style="display: flex;flex-direction: row">
        <span class="icon-container">
          <UserFilled style="width: 1em;height: 1em" />
        </span>
        <el-input v-model="loginForm.username" placeholder="请输入用户名" name="username" type="text"
          @keyup.enter.native="handleLogin" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="icon-container">
          <Lock style="width: 1em;height: 1em" />
        </span>
        <el-input v-model="loginForm.password" placeholder="请输入密码" name="password" :type="passwordType"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd">
          <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'" @click="onChangePwdType" />
        </span>
      </el-form-item>

      <el-form-item class="code-box" prop="captcha_code">
        <span class="icon-container">
          <Tickets style="width: 1em;height: 1em" />
        </span>
        <el-input v-model="loginForm.captcha_code" placeholder="图形验证码" name="captcha_code" class="code-input"
          maxlength="4" @keyup.enter.native="handleLogin">
        </el-input>
        <div class="code-img" @click="getCodeImg">{{ codeNet }}</div>
      </el-form-item>

      <el-button type="primary" style=" margin-bottom: 30px;width: 100%;" :loading="loading" size="large"
        @click.native.prevent="handleLogin">
        <span>{{ !loading ? '登 录' : '登 录 中...' }}</span>
      </el-button>
    </el-form>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { UserFilled, Lock, Tickets } from '@element-plus/icons-vue'
import { validatePassword, validateCode } from './rules'
import { useRouter } from 'vue-router';

const loginForm = ref({
  username: "admin",
  password: "123456",
  captcha_code: "",
  code_key: ""
})
// 验证规则
const loginRules = ref({
  username: [
    {
      require: true,
      trigger: "blur",
      message: "请输入用户名"
    }
  ],
  password: [
    {
      required: true,
      trigger: "blur",
      validator: validatePassword()
    }

  ],
  captcha_code: [
    {
      required: true,
      trigger: "blur",
      validator: validateCode()
    }

  ]
})

// 雪花效果
const snow = ref([])
for (let i = 0; i < 100; i++) {
  snow.value.push(i)
}

// 处理密码框文本显示状态
const passwordType = ref("password");
const onChangePwdType = () => {
  if (passwordType.value = "password") {
    passwordType.value = "text"
  } else {
    passwordType.value = "password"
  }
}

const loading=ref(false)
const loginFromRef=ref(null)
const router=useRouter()

const handleLogin=()=>{}
</script>

<style lang="scss" scoped>
$bg: #5268bc;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #000;
$txt_color: #333;

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  //background-image: url("../../assets/login-background.jpeg");
  //background-size: cover;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);

  .login-form {
    overflow: hidden;
    position: relative;
    margin: 0 auto;
    margin-top: 3%;
    padding: 35px;
    width: 420px;
    max-width: 100%;
    background: white;

    ::deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.1);
      color: #454545;
    }

    ::deep(.el-input) {
      display: inline-block;
      width: 85%;
      height: 47px;

      input {
        padding: 12px 5px 12px 15px;
        height: 47px;
        color: $txt_color;
        caret-color: $cursor;
      }

      .el-input__wrapper {
        width: 90%;
        height: 47px;
        background: none;
        box-shadow: none;
      }

    }
  }

  .icon-container {
    display: inline-block;
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    color: $dark_gray;
  }

  .title-container {
    position: relative;

    .title {
      margin: 0 auto 40px;
      text-align: center;
      font-weight: bold;
      font-size: 26px;
      color: $txt_color;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    cursor: pointer;
    user-select: none;
    font-size: 16px;
    color: $dark_gray;
  }

  .code-box {
    position: relative;

    .code-img {
      position: absolute;
      right: 0;
      top: 6px;
      width: 60px;
      background: transparent;
      font-size: 22px;

    }
  }

  .el-login-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-family: Arial;
    font-size: 12px;
    color: #fff;
    letter-spacing: 1px;
  }
}
</style>