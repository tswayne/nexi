const knex = require('knex')
const knexConfig = require('../../migration/knex-config')

const migrateWrapper = (config) => {
  const migrate = () => {
    return knex(knexConfig(config)).migrate.latest()
  }
  return migrate
}

module.exports = migrateWrapper
