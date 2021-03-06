const path = require('path')
const fs = require('fs')

const srcDir = path.join(process.cwd(), 'src')
const includesPath = path.join(srcDir, 'config/includes.js')
if (fs.existsSync(includesPath)) { require(includesPath) }

const Server = require('./server')
const config = require('./config')(srcDir)
const logger = require('./logging/logger')(config)

const crashReport = (err) => {
  logger.error(err)
  process.exit(1)
}

const startServer = () => {
  const server = new Server(config, logger)
  server.start(err => {
    if (err) {
      crashReport(err)
    }

    logger.info(`Server running on port ${config.port}`)
  })
}

require('./boot')(config, logger).then(startServer).catch(crashReport)


