const rootContext = require('./common/root-context')
const path = require('path')
const fs = require('fs')


const getAdditionalDecorators = (rootDir) => {
  const filePath = path.join(rootDir, `decorators/index.js`)
  if (!fs.existsSync(filePath)) {
    return false
  }

  return require(filePath)
}

module.exports = async (config, logger) => {
  const context = await rootContext(config, logger)

  const decorate = getAdditionalDecorators(config.rootDir)
  if (decorate) {
    await decorate(context)
  }

  return context
}
