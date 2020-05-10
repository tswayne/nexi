const createError = require('http-errors')

const notFoundMiddleware = () => {
  const notFound = (req, res, next) => {
    return next(createError(404))
  }
  return notFound
}

module.exports = notFoundMiddleware