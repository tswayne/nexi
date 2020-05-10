const responseTime = require('response-time')

const responseTimeMiddleware = () => {
  return responseTime((req, res, time) => {
    req.responseTime = time
  })
}

module.exports = responseTimeMiddleware