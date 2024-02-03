const knex = require('knex')
const knexConfig = require('./knex-config')

const nexiMigrate = (config, passConfigThrough=false) => {
  const parsedConfig = passConfigThrough ? config : knexConfig(config)
  return knex(parsedConfig).migrate.latest()
}

module.exports = nexiMigrate
