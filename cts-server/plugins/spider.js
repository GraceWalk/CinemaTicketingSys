const request = require('superagent')
const cheerio = require('cheerio')
const async = require('async')
const Movie = require('../models/Movie')
const LaterMovie = require('../models/LaterMovie')
const requestHeaders = {
  'Host': 'movie.douban.com',
  'Accept': '*/*',
  'Accept-Language': 'zh-CN,zh;q=0.8',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
  "Referer": "https://movie.douban.com/",
  'Cookie': 'll="118221"; bid=YXj13JrqEWM; __yadk_uid=jntmJm0O33QEB5OAJCKzHPxOL91WrTfX; __gads=ID=b76cea5550e279d0-2273e1a670c6009c:T=1615871846:RT=1615871846:S=ALNI_MYwWlFiY2h_iBLq5VV2RtI33nnsEw; _vwo_uuid_v2=DE289C39F6F0A8F43F11F21C30FF4A994|61d92aeaebf3abfb68a822e102ba7d31; dbcl2="162698541:RgMpABjlTt4"; push_doumail_num=0; push_noty_num=0; __utmv=30149280.16269; __utmz=30149280.1616038477.4.2.utmcsr=douban.com|utmccn=(referral)|utmcmd=referral|utmcct=/; ck=QlSi; __utmc=30149280; __utmc=223695111; __utmz=223695111.1616117714.7.6.utmcsr=douban.com|utmccn=(referral)|utmcmd=referral|utmcct=/; ap_v=0,6.0; _pk_ref.100001.4cf6=%5B%22%22%2C%22%22%2C1616137135%2C%22https%3A%2F%2Fwww.douban.com%2F%22%5D; _pk_ses.100001.4cf6=*; __utma=30149280.765801224.1615871846.1616117713.1616137139.8; __utma=223695111.1168109486.1615871846.1616117714.1616137139.8; __utmb=223695111.0.10.1616137139; __utmb=30149280.4.10.1616137139; _pk_id.100001.4cf6=034bd04c2054d214.1615871846.8.1616139559.1616118641.'
}

const keyMap = {
  directors: '导演',
  scriptWriter: '编剧',
  actors: '主演',
  type: '类型',
  countries: '制片国家/地区',
  language: '语言',
  date: '上映日期',
  runtime: '片长'
}

function getKey (keyName) {
  for (const key in keyMap) {
    if (keyMap[key] === keyName) {
      return key
    }
  }
}

let isNowPlayingMovie = true
let curModel = Movie

// 爬虫主入口
const refreshMovies = async type => {
  // 初始化相关变量
  isNowPlayingMovie = (type === 'nowplaying')
  curModel = isNowPlayingMovie ? Movie : LaterMovie

  // 爬取电影列表页基础数据
  const res = await request(`https://movie.douban.com/cinema/${type}/beijing/`).set(requestHeaders)
  const $ = cheerio.load(res.text)

  const moviesDom = isNowPlayingMovie ? '#nowplaying .list-item' : '#showing-soon .item'
  const moviesShotInfo = []
  $(moviesDom).each((i, item) => {
    moviesShotInfo.push({
      movieId: isNowPlayingMovie ? $(item).attr('data-subject') : $(item).find('a').attr('href').split('/').slice(-2)[0],
      likes: isNowPlayingMovie ? 0 : parseInt($(item).find('.dt.last').text())
    })
  })

  // 爬取电影详情数据
  return async.mapLimit(moviesShotInfo, 1, (movieShotInfo, callback) => {
    loadMovieDetail(movieShotInfo, callback).catch((res) => {
      console.log('请求过于频繁!')
    })
  })
}

// 向数据库载入获得数据
async function loadMovieDetail (movieShotInfo, callback) {
  const hasMovie = await curModel.findOne({ did: movieShotInfo.movieId })
  const delay = parseInt((Math.random() * 50000000) % 1000, 10)
  // 判断是否存在当前影片
  if (!hasMovie) {
    const movieInfo = await getMovieDetail(movieShotInfo, isNowPlayingMovie)
    curModel.create(movieInfo)
    console.log('成功插入一条数据!')
  }
  setTimeout(() => {
    callback(null, movieShotInfo.movieId)
  }, delay)
}

// 获取电影详情数据
async function getMovieDetail (movieShotInfo, isNowPlayingMovie) {
  const movieDetail = await request(`https://movie.douban.com/subject/${movieShotInfo.movieId}`).set(requestHeaders)
  const $ = cheerio.load(movieDetail.text)

  const info = {
    did: movieShotInfo.movieId,
    name: $('#content h1 span[property]').text().split(' ')[0],
    originName: $('#content h1 span[property]').text().split(' ')[1] || '',
    year: $('#content h1 .year').text().slice(1, -1),
    introduction: $('#link-report .all').text().trim() || $('#link-report').text().trim(),
    rating: $('.rating_num').text(),
    picUrl: $('#mainpic img').attr('src'),
    directors: [],
    scriptWriter: [],
    actors: [],
    type: [],
    countries: [],
    language: [],
    date: [],
    runtime: '',
    likes: movieShotInfo.likes || 0
  }

  $('#info').text().split('\n').filter(s => s).forEach(s => {
    const keyVal = s.trim().split(': ')
    const key = getKey(keyVal[0])

    if (key) {
      let val = keyVal[1].split(' / ')
      if (key === 'runtime') {
        val = val[0].split('分钟')[0]
      }
      info[key] = val
    }
  })

  if (isNowPlayingMovie) {
    delete info.likes
  } else {
    delete info.scriptWriter
    delete info.rating
  }

  return info
}


module.exports = {
  refreshMovies,
  getMovieDetail
}
