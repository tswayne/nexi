const errorReporter = require('./error-reporter')
const redis = require('./redis')
const waterline = require('./waterline')
const nexiMigrate = require('./nexi-migrate')

module.exports = async (config, logger) => {
  const context = {}

  context.config = config
  context.logger = logger
  context.reporter = errorReporter(config)
  if (config.redis) {
    context.redis = await redis(config)
  }
  if (config.database && !config.database.nexiDbAdapter) {
    context.models = await waterline(config)
  }
  if (config.database) {
    context.migrate = nexiMigrate(config)
  }

  return context
}
