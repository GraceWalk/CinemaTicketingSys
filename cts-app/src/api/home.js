import AXIOS from '@/utils/http'

export function getMoviesList () {
  return AXIOS.get('public/movies')
}

export function getLaterMoviesList () {
  return AXIOS.get('public/laterMovies')
}