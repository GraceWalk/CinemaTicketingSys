import axios from 'axios'
import { ElNotification } from 'element-plus'

const AXIOS = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/'
})

AXIOS.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

AXIOS.interceptors.response.use(response => {
  let res = { ...response.data }
  if (res.errno === 0) {
    return res
  } else {
    ElNotification({
      title: res.errmsg,
      type: 'error'
    })
    return Promise.reject(res.errmsg)
  }
})

export default AXIOS