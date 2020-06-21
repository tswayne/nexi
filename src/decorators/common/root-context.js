const errorReporter = require('./error-reporter')
const redis = require('./redis')
const waterline = require('./waterline')

module.exports = async (config, logger) => {
  const context = {}

  context.config = config
  context.logger = logger
  context.reporter = errorReporter(config)
  if (config.redis) {
    context.redis = redis(config)
  }
  if (config.database) {
    context.models = await waterline(config)
  }

  return context
}