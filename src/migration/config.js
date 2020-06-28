const path = require('path');
let currentDir = process.env.INIT_CWD
if (!currentDir) {
  currentDir = process.cwd().split('/node_modules/nexi/src/migration')[0]
}

const srcDir = path.join(currentDir, 'src')
const config = require('../config')(srcDir)

module.exports = {
  client: 'mysql',
  migrations: {
    directory: path.resolve(currentDir, './migrations'),
  },
  connection: {
    user: config.database.user,
    database: config.database.name,
    password: config.database.password,
    host: config.database.host
  }
}