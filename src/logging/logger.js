const os = require('os')
const logger = require('pino')
const getWriter = require('./log-writer')

module.exports = (config={}) => {
  const writer = getWriter(config)

  const logConfig = {
    messageKey: 'message',
    useLevelLabels: true,
    timestamp: false,
    base: config.stage === 'development' ? { application: config.application } : { hostname: os.hostname(), environment: config.stage },
  }

  if (config.stage === 'development' && config.logger.prettyPrint) {
    logConfig.transport = {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    }
  }

  return logger(Object.assign(logConfig, config.logger.overrides), writer)
}

