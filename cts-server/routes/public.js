module.exports = app => {
  const router = require('express').Router()
  const bcrypt = require('bcrypt')
  const jwt = require('jsonwebtoken')
  const User = require('../models/User')
  const Movie = require('../models/Movie')
  const LaterMovie = require('../models/LaterMovie')

  // 登录
  router.post('/login', async (req, res) => {
    const { username, password, needAdminAuthority = true } = req.body
    const user = await User.findOne({ username })
    const isValid = user ? bcrypt.compareSync(password, user.password) : false

    if (!user || !isValid) {
      res.send({ errmsg: '用户名或密码错误!', errno: 10001 })
    } else if (needAdminAuthority && !user.adminAuthority) {
      res.send({ errmsg: '您没有权限, 请联系管理员添加!', errno: 10002 })
    } else {
      res.send({ token: jwt.sign({ id: user._id }, app.get('tokenSecret')), errno: 0 })
    }
  })

  // 获取热映电影列表
  router.get('/movies', async (req, res) => {
    const data = await Movie.find({})
    res.send({ data, errno: 0 })
  })

  // 获取热映电影详情
  router.get('/movies/detail', async (req, res) => {
    const detail = await Movie.findById(req.query.id).exec()
    res.send({ data: detail, errno: 0 })
  })

  // 获取即将上映电影列表
  router.get('/laterMovies', async(req, res) => {
    const data = await LaterMovie.find({})
    res.send({ data, errno: 0 })
  })


  app.use('/api/public', router)
}