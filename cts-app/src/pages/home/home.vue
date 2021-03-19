<template>
  <div class="home">
    <div class="header">
      <div class="location" @click="isShowSelectArea = true">
        <van-icon name="location" color="#fff"></van-icon>
        <span>{{ curCity.name }}</span>
      </div>
      <div class="user">
        <van-icon name="user-circle-o" color="#fff" :size="24"></van-icon>
      </div>
    </div>
    <van-popup
      v-model:show="isShowSelectArea"
      round
      position="bottom"
      :style="{ height: '60%' }">
      <van-area title="标题" :area-list="areaList" @confirm="chooseArea" />
    </van-popup>
    <movie-list />
  </div>
</template>

<script setup>
  import { computed, inject, reactive, ref } from 'vue'
  import BScroll from '@better-scroll/core'
  import { areaList } from '@/assets/js/areaList'
  import MovieList from './movieList.vue'

  // const scroll = new BScroll('.home', {})
  const curCity = reactive({
    code: '',
    name: '请选择城市'
  })

  const isShowSelectArea = ref(false)

  function chooseArea (arr) {
    curCity.code = arr[2].code
    curCity.name = arr[2].name
    isShowSelectArea.value = false
  }

</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 6.4%;
      .location {
        display: flex;
        align-items: center;
        color: rgb(219, 219, 219);
        span {
          font-size: 12px;
          padding-left: 4px;
        }
      }
    }
  }
</style>