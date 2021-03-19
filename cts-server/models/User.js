const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const user = new mongoose.Schema({
  username: String,
  password: {
    type: String,
    set (val) {
      return bcrypt.hashSync(val, 10)
    }
  },
  adminAuthority: Boolean
})

module.exports = mongoose.model('User', user)