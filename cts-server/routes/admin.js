module.exports = app => {
  const router = require('express').Router()
  const spider = require('../plugins/spider')
  const authMiddleware = require('../middleware/auth')
  const { getModelName } = require('../plugins/utils')

  // 创建电影
  router.post('/create', async (req, res) => {
    const data = await req.Model.findOne({ did: req.body.did })

    if (!data) {
      await req.Model.create(req.body)
      res.send({ errno: 0 })
    } else {
      res.send({errmsg: `影片 ${data.name} 已存在, 无法创建!`, errno: 10004 }) 
    }
  })

  // 更新电影
  router.post('/update', async (req, res) => {
    await req.Model.updateOne(req.body)
    res.send({ errno: 0 })
  })

  // 删除电影
  router.post('/remove', async(req, res) => {
    await req.Model.findByIdAndRemove(req.body.id)
    res.send({ errno: 0 })
  })

  // 自动搜索豆瓣补全电影信息
  router.get('/autoComplete', async (req, res) => {
    const data = await spider.getMovieDetail({
      movieId: req.query.id
    }, req.query.type === 'nowplaying')
    res.send({ data, errno: 0 })
  })

  // 爬取豆瓣热映电影数据
  router.get('/refresh', async (req, res) => {
    await spider.refreshMovies(req.query.type)
    const data = await req.Model.find({})
    res.send({ data, errno: 0 })
  })

  app.use('/api/admin/:resource', authMiddleware({ needAdminAuthority: true }), async(req, res, next) => {
    req.Model = require(`../models/${getModelName(req.params.resource)}`)
    next()
  }, router)
}