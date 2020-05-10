#!/usr/bin/env node
const path = require('path')

const srcDir = path.join(process.cwd(), 'src')
require(`${srcDir}/config/boot.js`)
const Server = require('./server')
const config = require('./config')(srcDir)
const logger = require('./logging/logger')(config)

const server = new Server(config, logger)


server.start(err => {
  if (err) {
    logger.error(err)
    process.exit(1)
  }

  logger.info(`Server running on port ${config.port}`)
})