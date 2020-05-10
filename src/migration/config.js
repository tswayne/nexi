const path = require('path');
const srcDir = path.join(process.env.INIT_CWD, 'src')
const config = require('../config')(srcDir)

module.exports = {
  client: 'mysql',
  migrations: {
    directory: path.resolve(process.env.INIT_CWD, './migrations'),
  },
  connection: {
    user: config.database.user,
    database: config.database.name,
    password: config.database.password,
    host: config.database.host
  }
}