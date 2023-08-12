const path = require('path')
const fs = require('fs')
if (parseInt(process.versions.node.split('.')[0]) >= 18) {
    const dns = require('dns');
    dns.setDefaultResultOrder('ipv4first');
}

const srcDir = path.join(process.cwd(), 'src')
const includesPath = path.join(srcDir, 'config/includes.js')
if (fs.existsSync(includesPath)) { require(includesPath) }

const config = require('./config')(srcDir)
const logger = require('./logging/logger')(config)

const decorate = require('./decorators/decorator')
const initialize = require('./initializers/initializer')

const bootstrap = async () => {
    const context = await decorate({}, config, logger)
    await initialize(context)
    return context
}

module.exports = bootstrap
