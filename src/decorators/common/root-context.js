const errorReporter = require('./error-reporter')
const redis = require('./redis')

module.exports = async (expressApp, config, logger) => {
  const context = {}

  context.expressApp = expressApp
  context.config = config
  context.logger = logger
  context.reporter = errorReporter(config, logger)
  if (config.redis) {
    context.redis = await redis(config)
  }

  return context
}
