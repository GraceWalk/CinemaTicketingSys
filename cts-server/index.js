const express = require('express')
const cors = require('cors')
const app = express()

// 设置加密秘钥
app.set('tokenSecret', '8dknd6f89shnvjs')

// 添加插件
app.use(cors())
app.use(express.json())

// 链接数据库
require('./plugins/db')(app)
// 加载接口API
require('./routes/public')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000, () => {
  console.log('端口已开启, http://localhost:3000')
})