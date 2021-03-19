const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
  did: String,
  name: String,
  originName: String,
  type: Array,
  directors: Array,
  actors: Array,
  runtime: String,
  year: String,
  date: Array,
  countries: Array,
  language: Array,
  picUrl: String,
  introduction: String,
  likes: Number
})

movieSchema.index({ did: 1 }, { unique: true, background: true, dropDups: true })

module.exports = mongoose.model('LaterMovie', movieSchema)