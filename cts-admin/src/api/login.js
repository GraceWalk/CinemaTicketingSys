import AXIOS from '@/utils/http'

export function login (obj) {
  return AXIOS.post('public/login', obj)
}