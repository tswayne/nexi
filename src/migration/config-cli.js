const path = require('path');
const knexConfig = require('./knex-config')

let currentDir = process.env.INIT_CWD
if (!currentDir) {
  currentDir = process.cwd().split('/node_modules/nexi/src/migration')[0]
}

const srcDir = path.join(currentDir, 'src')
const config = require('../config')(srcDir)

module.exports = Object.assign( {}, knexConfig(config), {
  migrations: {
    directory: path.resolve(currentDir, './migrations'),
  }
})
