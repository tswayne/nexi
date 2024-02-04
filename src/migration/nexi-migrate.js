const knex = require('knex')
const knexConfig = require('./knex-config')

const nexiMigrate = async (config, passConfigThrough=false) => {
  const parsedConfig = passConfigThrough ? config : knexConfig(config)
  const conn = knex(parsedConfig)
  await conn.migrate.latest()
  return conn.destroy()
}

module.exports = nexiMigrate
