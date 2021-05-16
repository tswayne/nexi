const fs = require('fs')
const path = require('path')

const defaultReporter = {
  info: (message) => { console.log(message) },
  error: (error) => {
    if (error instanceof Error) {
      console.trace(error)
    } else {
      console.log(error)
    }
  }
}

const errorReporter = (config, overrides={}) => {
  const filePath = path.join(config.srcDir, `config/error-reporter.js`)
  if (fs.existsSync(filePath)) {
    const reporter = require(filePath)(config)
    if (reporter) {
      return reporter
    }
  }
  return defaultReporter
}

module.exports = errorReporter
