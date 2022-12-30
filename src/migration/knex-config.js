
const knexConfig = (config) => {
  return {
    client: config.database.migrationClient && config.database.migrationClient || 'mysql',
    connection: {
      user: config.database.user,
      database: config.database.name,
      password: config.database.password,
      host: config.database.host,
      port: config.database.port || 3306
    }
  }
}
module.exports = knexConfig
