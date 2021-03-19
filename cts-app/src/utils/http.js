import axios from 'axios'

const AXIOS = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/'
})

AXIOS.interceptors.response.use(response => {
  let res = { ...response.data }
  if (true) {
    return res
  } else {
    return Promise.reject(res.errmsg)
  }
})

export default AXIOS