const knex = require('knex')
const knexConfig = require('./knex-config')

const nexiMigrate = (config) => {
  return knex(knexConfig(config)).migrate.latest()
}

module.exports = nexiMigrate
