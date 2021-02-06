const { fileExists } = require('./utils')

const boot = async (config, logger) => {
  const bootPath = `${config.srcDir}/config/boot.js`
  if (await fileExists(bootPath)) {
    const bootFunc = require(bootPath)
    return bootFunc(config, logger)
  }
}

module.exports = boot
