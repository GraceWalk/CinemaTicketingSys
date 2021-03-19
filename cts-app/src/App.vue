<template>
  <router-view />

  <van-tabbar
    v-model="active"
    active-color="#d6ad0a"
    inactive-color="#fff"
    :border="false"
    fixed>
    <van-tabbar-item name="home" icon="fire"></van-tabbar-item>
    <van-tabbar-item name="profile" icon="coupon"></van-tabbar-item>
    <van-tabbar-item name="profile" icon="wap-home"></van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
  import { provide, getCurrentInstance, watch, ref } from 'vue'

  const { ctx } = getCurrentInstance()
  provide('$api', ctx.$api)
  provide('$router', ctx.$router)

  const active = ref('home')
  watch(active, n => {
    ctx.$router.replace({
      name: n
    })
  })
</script>

<style lang="scss">
  html, body {
    margin: 0;
    padding: 0;
  }
  #app {
    height: 100vh;
    overflow: auto;
    background-image: radial-gradient(farthest-corner at 20% 20%, rgb(16, 28, 48), rgb(4, 10, 17));
    .van-tabbar {
      background-color: rgba(45, 54, 77, 0.5);
      border-radius: 18px 18px 0 0;
      backdrop-filter: blur(10px);
      .van-tabbar-item {
        &--active {
          background-color: transparent;
        }
      }
    }
  }
</style>