const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = options => {
  return async (req, res, next) => {
    const authorization = req.headers.authorization || ''
    const token = authorization.split(' ').pop()
    const { id } = jwt.verify(token, req.app.get('tokenSecret'))
    const user = await User.findById(id)

    if (!authorization || !user) {
      res.send({ errmsg: '用户当前未登录, 请重新登录!', errno: 10003 })
    } else if (options.needAdminAuthority && !user.adminAuthority) {
      res.send({ errmsg: '您没有权限访问!', errno: 10004 })
    }
    
    next()
  }
}