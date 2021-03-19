<template>
  <router-view />
</template>

<script setup>
  import { provide, getCurrentInstance } from 'vue'
  
  const { ctx } = getCurrentInstance()
  provide('$api', ctx.$api)
  provide('$notify', ctx.$notify)
  provide('$router', ctx.$router)
</script>

<style>
  html, body {
    padding: 0;
    margin: 0;
  }
</style>
