const os = require('os')
const logger = require('pino')
const getWriter = require('./log-writer')

module.exports = (config={}) => {
  const writer = getWriter(config)
  return logger(Object.assign({
    prettyPrint: config.stage === 'development' && config.logger.prettyPrint,
    messageKey: 'message',
    useLevelLabels: true,
    timestamp: false,
    base: config.stage === 'development' ? { application: config.application } : { hostname: os.hostname(), environment: config.stage },
  }, config.logger.overrides), writer)
}

