const resourceToModelMap = {
  movies: 'Movie',
  laterMovies: 'LaterMovie'
}

function getModelName (resource) {
  return resourceToModelMap(resource)
}

module.exports = {
  getModelName
}