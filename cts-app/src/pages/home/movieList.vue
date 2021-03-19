<template>
<div>
  <!-- 正在热映 -->
  <van-swipe ref="movieSwipeRef" :loop="false" :show-indicators="false" :height="swipeItemHeight" :width="swipeItemWidth" @change="swipeItemChange">
    <van-swipe-item v-for="(movie, index) in movies.list" :key="index" :class="{'active': index === curMovieIdx}">
      <img class="item-img" :src="movie.picUrl" @click="showMovieDetail" />
    </van-swipe-item>
  </van-swipe>
  <div class="movie-info" v-if="curMovie && Object.keys(curMovie).length">
    <div class="name">{{ curMovie.name + ' ' + curMovie.originName }}</div>
    <div class="actors">{{ curMovie.directors[0] + ' | ' + curMovie.actors.slice(0, 2).join(' ')}}</div>
    <div class="others">
      <div class="info">
        <div>
          <van-icon name="star" color="#ffd21e"></van-icon>
          <span>{{ curMovie.rating }}</span>
        </div>
        <div>
          <van-icon name="video" color="green"></van-icon>
          <span>{{ curMovie.runtime + '分钟' }}</span>
        </div>
        <div>
          <van-icon name="label" color="#fd4f50"></van-icon>
          <span>{{ curMovie.type.join(' ') }}</span>
        </div>
      </div>
      <van-button class="ticket-btn" color="linear-gradient(to right, #ff6034, #ee0a24)" size="mini" text="购票" @click="showMovieDetail" />
    </div>
  </div>

  <!-- 即将上映 -->
  <div class="coming-title">即将上映</div>
  <div class="card">
    <div
      v-for="item in laterMovies.list"
      :key="item._id"
      class="card-item">
      <div class="picture">
        <img class="item-img" :height="listItemHeight" :src="item.picUrl" @click="showMovieDetail" />
        <div class="like">
          <van-icon name="like" color="red"></van-icon>
          <span>{{ item.likes }}</span>
        </div>
      </div>
      <div class="info">
        <div class="name">{{ item.name }}</div>  
        <div class="date">
          <span>{{ renderDate(item.date[0]) }}</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
  import { inject, ref, reactive, computed } from 'vue'

  const api = inject('$api')
  const router = inject('$router')
  const swipeItemWidth = screen.width * 0.8
  const swipeItemHeight = swipeItemWidth * 1.4
  const listItemHeight = screen.width * 0.808 / 2 * 1.45
  const movies = reactive({
    list: []
  })
  const laterMovies = reactive({
    list: []
  })
  const curMovieIdx = ref(0)
  const movieSwipeRef = ref(null)
  const curMovie = computed(() => movies.list[curMovieIdx.value])
  
  function swipeItemChange (i) {
    curMovieIdx.value = i
    if (i === movies.list.length - 1) {
      movieSwipeRef.value.state.offset = -swipeItemWidth * i
    }
  }

  function showMovieDetail () {
    
  }

  function renderDate(date) {
    return date.split('-').slice(1).join('月').split('(').slice(0, 1)[0] + '日'
  }

  async function getMoviesList () {
    const res = await api.getMoviesList()
    movies.list = res.data
  }

  async function getLaterMoviesList () {
    const res = await api.getLaterMoviesList()
    laterMovies.list = res.data
  }

  getMoviesList()
  getLaterMoviesList()
</script>

<style scoped lang="scss">
  .van-swipe {
    .van-swipe-item {
      box-sizing: border-box;
      opacity: 0.6;
      transition: opacity 500ms;
      &.active {
        opacity: 1;
      }
      .item-img {
        margin-left: 8%;
        width: 92%;
        height: 100%;
        border-radius: 20px;
      }
    }
  }
  .movie-info {
    margin: 0 6.4%;
    .name {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: rgb(255, 255, 255);
      font-size: 20px;
      line-height: 36px;
    }
    .actors {
      color: rgb(219, 219, 219);
      font-size: 14px;
      line-height: 24px;
    }
    .others {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .info {
        display: flex;
        color: rgb(184, 184, 184);
        font-size: 12px;
        line-height: 24px;
        div {
          display: flex;
          align-items: center;
          margin-right: 8px;
          span {
            padding-left: 2px;
          }
        }
      }
      .ticket-btn {
        padding: 0 8px;
      }
    }
  }

  .coming-title {
    margin-left: 6.4%;
    margin-top: 20px;
    font-size: 20px;
    line-height: 46px;
    color: white;
  }
  .card {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin: 0 6.4%;
    padding-bottom: 50px;
    .card-item {
      width: 46.6%;
      margin-bottom: 10px;
      .picture {
        position: relative;
        width: 100%;
        .item-img {
          width: 100%;
          border-radius: 10px;
        }
        .like {
          display: flex;
          align-items: center;
          position: absolute;
          right: 0;
          bottom: 0;
          padding: 0 6px;
          border-top-left-radius: 10px;
          background-color: rgba(15, 15, 15, 0.603);
          color: #fff;
          font-size: 12px;
          line-height: 20px;
          span {
            padding-left: 3px;
          }
        }
      }
    }
    .info {
      .name {
        color: #fff;
        font-size: 14px;
        line-height: 24px;
      }
      .date {
        color: rgb(209, 209, 209);
        font-size: 12px;
      }
    }
  }
</style>