<template>
  <div class="movie-page">
    <div>
      <el-button type="primary" @click="refreshMoviesList">更新热映电影数据</el-button>
      <el-button type="primary" @click="createMovie">新建影片</el-button>
    </div>
    <el-table
      :data="movies.list"
      stripe
      style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="影片名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="影片原名">
              <span>{{ props.row.originName || props.row.name }}</span>
            </el-form-item>
            <el-form-item label="类型">
              <span>{{ props.row.type.join(' ') }}</span>
            </el-form-item>
            <el-form-item label="发行年份">
              <span>{{ props.row.year }}</span>
            </el-form-item>
            <el-form-item label="导演">
              <span>{{ props.row.directors.join(' ') }}</span>
            </el-form-item>
            <el-form-item label="编剧">
              <span>{{ props.row.scriptWriter.join(' ') }}</span>
            </el-form-item>
            <el-form-item label="主演">
              <span>{{ props.row.actors.slice(0, 5).join(' ') }}</span>
            </el-form-item>
            <el-form-item label="国家">
              <span>{{ props.row.countries.join(' ') }}</span>
            </el-form-item>
            <el-form-item label="上映时间">
              <span>{{ props.row.date.join(' ') }}</span>
            </el-form-item>
            <el-form-item label="语言">
              <span>{{ props.row.language.join(' ') }}</span>
            </el-form-item>
            <el-form-item label="评分">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="时长">
              <span>{{ props.row.runtime }}</span>
            </el-form-item>
            <el-form-item label="背景图片">
              <span>{{ props.row.picUrl }}</span>
            </el-form-item>
            <el-form-item label="简介">
              <span>{{ props.row.introduction }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" />
      <el-table-column label="国家">
        <template #default="scope">
          <span>{{ scope.row.countries.join(' ') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="导演">
        <template #default="scope">
          <span>{{ scope.row.directors.join(' ') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="mini"
            @click="editMovie(scope.row._id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="removeMovie(scope.row._id, scope.row.name)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
  import { inject, reactive } from 'vue'

  const api = inject('$api')
  const notify = inject('$notify')
  const router = inject('$router')

  const movies = reactive({
    list: []
  })

  async function getMoviesList () {
    const res = await api.getMoviesList()
    movies.list = res.data
  }

  getMoviesList()

  function createMovie () {
    router.push({ name: 'movieDetail' })
  }

  async function removeMovie (id, name) {
    const res = await api.removeMovie(id)
    getMoviesList()
    notify.success({
      title: `成功删除电影 ${name}`
    })
  }

  function editMovie (id) {
    router.push({
      name: 'movieDetail',
      query: { id }
    })
  }

  // 同步豆瓣热映电影数据
  async function refreshMoviesList () {
    const res = await api.refreshMoviesList('nowplaying')
    movies.list = res.data
    notify({
      title: '同步热映电影数据成功',
      type: 'success'
    })
  }
</script>

<style scoped lang="scss">
  .table-expand {
    display: flex;
    flex-flow: row wrap;
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    display: flex;
    margin-right: 0;
    margin-bottom: 0;
    min-width: 50%;
    &__content {
      flex: 1;
    }
  }
</style>