<template>
  <div class="login-page">
    <el-card class="login-box">
      <el-form :model="user" label-width="80px">
        <el-form-item label="用户名" placeholder="请输入用户名">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" aria-placeholder="请输入密码">
          <el-input v-model="user.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
  import { inject, reactive } from 'vue'

  const router = inject('$router')
  const api = inject('$api')
  const user = reactive({
    username: '',
    password: '',
    needAdminAuthority: true
  })

  async function login () {
    const res = await api.login(user)
    localStorage.setItem('token', res.token)
    router.replace('/movies')
  }
</script>

<style scoped lang="scss">
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    min-height: 600px;
    .login-box {
      width: 500px;
    }
  }
</style>