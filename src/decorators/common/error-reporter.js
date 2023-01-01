const fs = require('fs')
const path = require('path')

const defaultReporter = (logger) => ({
  info: (message) => { logger.info(message) },
  error: (error) => { logger.error(error) }
})

const errorReporter = (config, logger) => {
  const filePath = path.join(config.srcDir, `config/error-reporter.js`)
  if (fs.existsSync(filePath)) {
    const reporter = require(filePath)(config)
    if (reporter) {
      return reporter
    }
  }
  return defaultReporter(logger)
}

module.exports = errorReporter
