
const requestLoggerMiddleware = (logger) => {
  const requestLogger = (req, res, next) => {
    res.on('finish', () => {
      const message = {
        method: req.method,
        statusCode: res.statusCode,
        url: req.originalUrl,
        path: req.path,
        responseTime: req.responseTime.toFixed(2),
        requestId: req.requestId
      }
      logger.info(message)
    })
    next()
  }
  return requestLogger
}

module.exports = requestLoggerMiddleware