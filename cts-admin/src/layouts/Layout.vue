<template>
  <div class="layout">
    <div class="aside">
      <el-menu
        default-active="movies"
        @select="handleSelect">
        <el-menu-item index="movies">
          热映电影
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main">
      <el-header>
        电影院售票系统后台
      </el-header>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      handleSelect(key) {
        this.$router.replace(key)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .layout {
    display: flex;
    width: 100%;
    height: 100vh;
    min-height: 600px;
    .aside {
      width: 220px;
      height: 100%;
      .el-menu {
        height: 100%;
      }
    }
    .main {
      width: calc(100% - 220px);
      height: 100%;
      .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
      }
      .content {
        box-sizing: border-box;
        height: calc(100% - 60px);
        padding: 20px;
        overflow: auto;
      }
    }
  }
</style>
