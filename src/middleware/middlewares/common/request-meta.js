const uuid = require('uuid').v4

const requestMetaMiddleware = () => {
  const requestMeta = (req, res, next) => {
    req.requestId = uuid()
    next()
  }
  return requestMeta
}

module.exports = requestMetaMiddleware