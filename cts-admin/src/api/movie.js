import axios from 'axios'
import AXIOS from '@/utils/http'

export function getMoviesList () {
  return AXIOS.get('public/movies/')
}

export function getMovieDetail (id) {
  return AXIOS.get(`public/movies/detail?id=${id}`)
}

export function createMovie (obj) {
  return AXIOS.post('admin/movies/create', obj)
}

export function updateMovie (obj) {
  return AXIOS.post('admin/movies/update', obj)
}

export function removeMovie (id) {
  return AXIOS.post('admin/movies/remove', { id })
}

export function autoCompleteDetail (type, id) {
  return AXIOS.get(`admin/movies/autoComplete?type=${type}&id=${id}`)
}

export function refreshMoviesList (type) {
  return AXIOS.get(`admin/movies/refresh?type=${type}`)
}