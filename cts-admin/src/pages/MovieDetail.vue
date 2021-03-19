<template>
  <div>
    <el-page-header @back="goBack" title = "返回" :content="headerContent" />
    <el-form :model="movieDetail" label-width="80px" class="movie-detail-form">
      <el-form-item label="豆瓣id">
        <el-input v-model="movieDetail.did"></el-input>
      </el-form-item>
      <el-form-item label="影片名称">
        <el-input v-model="movieDetail.name"></el-input>
      </el-form-item>
      <el-form-item label="影片原名">
        <el-input v-model="movieDetail.originName"></el-input>
      </el-form-item>
      <el-form-item label="上映年份">
        <el-input v-model="movieDetail.year"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select
          v-model="movieDetail.type"
          remote
          multiple
          filterable
          allow-create
          default-first-option
          popper-class="select-dropdown"
          :popper-append-to-body="false"
          placeholder="输入后按回车添加">
        </el-select>
      </el-form-item>
      <el-form-item label="导演">
        <el-select
          v-model="movieDetail.directors"
          remote
          multiple
          filterable
          allow-create
          default-first-option
          popper-class="select-dropdown"
          :popper-append-to-body="false"
          placeholder="输入后按回车添加">
        </el-select>
      </el-form-item>
      <el-form-item label="编剧">
        <el-select
          v-model="movieDetail.scriptWriter"
          remote
          multiple
          filterable
          allow-create
          default-first-option
          popper-class="select-dropdown"
          :popper-append-to-body="false"
          placeholder="输入后按回车添加">
        </el-select>
      </el-form-item>
      <el-form-item label="主演">
        <el-select
          v-model="movieDetail.actors"
          remote
          multiple
          filterable
          allow-create
          default-first-option
          popper-class="select-dropdown"
          :popper-append-to-body="false"
          placeholder="输入后按回车添加">
        </el-select>
      </el-form-item>
      <el-form-item label="国家">
        <el-select
          v-model="movieDetail.countries"
          remote
          multiple
          filterable
          allow-create
          default-first-option
          popper-class="select-dropdown"
          :popper-append-to-body="false"
          placeholder="输入后按回车添加">
        </el-select>
      </el-form-item>
      <el-form-item label="语言">
        <el-select
          v-model="movieDetail.language"
          remote
          multiple
          filterable
          allow-create
          default-first-option
          popper-class="select-dropdown"
          :popper-append-to-body="false"
          placeholder="输入后按回车添加">
        </el-select>
      </el-form-item>
      <el-form-item label="上映时间">
        <el-select
          v-model="movieDetail.date"
          remote
          multiple
          filterable
          allow-create
          default-first-option
          popper-class="select-dropdown"
          :popper-append-to-body="false"
          placeholder="输入后按回车添加">
        </el-select>
      </el-form-item>
      <el-form-item label="时长">
        <el-input v-model="movieDetail.runtime"></el-input>
      </el-form-item>
      <el-form-item label="评分">
        <el-input v-model="movieDetail.rating"></el-input>
      </el-form-item>
      <el-form-item label="背景图片">
        <el-input v-model="movieDetail.picUrl"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" :autosize="{ minRows: 3 }" v-model="movieDetail.introduction"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitDetail">{{ submitContent }}</el-button>
        <el-button @click="autoCompleteDetail">自动补全</el-button>
        <el-button @click="resetDetail(true)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
  import { inject, ref, reactive, toRaw } from 'vue'

  const api = inject('$api')
  const router = inject('$router')
  const notify = inject('$notify')
  let movieModel = {
    did: '',
    name: '',
    originName: '',
    type: [],
    directors: [],
    scriptWriter: [],
    actors: [],
    runtime: '',
    year: '',
    date: [],
    countries: [],
    language: [],
    rating: 0,
    picUrl: '',
    introduction: ''
  }
  const movieDetail = reactive(Object.create(movieModel))
  const headerContent = ref('创建影片')
  const submitContent = ref('创建')
  const movieId = router.currentRoute.value.query.id

  if (movieId) {
    submitContent.value = '更新'
    getMovieDetail()
  }

  async function getMovieDetail () {
    const res = await api.getMovieDetail(movieId)
    movieModel = res.data
    resetDetail()
    headerContent.value = `${res.data.name} ${res.data.originName} 影片详情`
  }

  async function submitDetail () {
    await api[movieId ? 'updateMovie' : 'createMovie'](toRaw(movieDetail))
    notify({
      title: `${submitContent.value}影片成功`,
      type: 'success'
    })
    resetDetail()
  }
  
  async function autoCompleteDetail () {
    const res = await api.autoCompleteDetail('nowplaying', movieDetail.did)
    movieModel = res.data
    resetDetail()
  }

  function resetDetail (isReset) {
    for (const key in movieModel) {
      movieDetail[key] = movieModel[key]
    }
    if (isReset) {
      notify({
        title: '重置成功',
        type: 'success'
      })
    }
  }


  function goBack () {
    router.back()
  }
</script>

<style lang="scss">
  .select-dropdown {
    display: none;
  }
</style>
<style scoped lang="scss">
 .movie-detail-form {
   width: 600px;
   .el-select {
     width: 100%;
   }
 }
</style>