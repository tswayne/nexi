const logger = require('pino')
const fs = require('fs')
const path = require('path')

const getWriter = (config) => {
  const filePath = path.join(config.srcDir, `config/logger.js`)
  if (fs.existsSync(filePath)) {
    const writer = require(filePath)(logger, config)
    if (writer) {
      return writer
    }
  }
  return logger.destination()
}

module.exports = getWriter
