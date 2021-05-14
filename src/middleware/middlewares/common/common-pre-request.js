const helmet = require('helmet')
const requestLogger = require('./request-logger')
const bodyParser = require('body-parser')
const responseTime = require('./response-time')
const requestMeta = require('./request-meta')
const compression = require('compression')

module.exports = (app, { logger, config }) => {
  app.use(responseTime())
  app.use(compression())
  app.use(requestMeta())
  app.use(helmet({ contentSecurityPolicy: false }))
  app.use(requestLogger(logger))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
}
