const path = require('path')
const repl = require('repl')
const fs = require('fs')

const srcDir = path.join(process.cwd(), 'src')
const includesPath = path.join(srcDir, 'config/includes.js')
if (fs.existsSync(includesPath)) { require(includesPath) }

const config = require('./config')(srcDir)
const logger = require('./logging/logger')(config)

const decorate = require('./decorators/decorator')
const initialize = require('./initializers/initializer')

decorate(config, logger)
    .then(async c => {
        await initialize(c)
        return c
    })
    .then(c => repl.start('> ').context.context = c).catch(console.error)
