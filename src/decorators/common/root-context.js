const errorReporter = require('./error-reporter')
const redis = require('./redis')
const waterline = require('./waterline')

module.exports = async (config, logger) => {
  const context = {}

  context.config = config
  context.logger = logger
  context.reporter = errorReporter(config, logger)
  if (config.redis) {
    context.redis = await redis(config)
  }
  if (config.database && !config.database.nexiDbAdapter) {
    context.models = await waterline(config)
  }

  return context
}
