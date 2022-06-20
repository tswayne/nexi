const path = require('path')
const deepmerge = require('deepmerge')
const { fileExists } = require('../../utils')

const waterline = async ({ rootDir, database }) => {
  const waterlineCore  = require('waterline-standalone-core')
  const overrideDir = path.join(rootDir, 'config/waterline.js')
  let modelOverrides = {}

  if (await fileExists(overrideDir)) {
    modelOverrides = require(overrideDir)
  }
  const driverConfig = database.driverConfig || {}
  const dbConfig = { host: database.host, user: database.user, password: database.password, name: database.name, port: database.port, ...driverConfig }
  return waterlineCore({
    database: dbConfig,
    adapter: require('sails-mysql'),
    adapterType: 'mysql',
    modelPath: path.join(rootDir, 'app/models'),
    modelDefaults: deepmerge({
      datastore: 'default',
      fetchRecordsOnCreate: true,
      fetchRecordsOnUpdate: true,
      primaryKey: 'id',
      attributes: {
        createdAt: { type: 'string', autoCreatedAt: true, },
        updatedAt: { type: 'string', autoUpdatedAt: true, },
        id: { type: 'number', autoMigrations: { autoIncrement: true } },
      },
    }, modelOverrides)
  })
}

module.exports = waterline
