const path = require('path')
const deepmerge = require('deepmerge')
const { fileExists } = require('../../utils')

const waterline = async (config) => {
  const waterlineCore  = require('waterline-standalone-core')
  const overrideDir = path.join(config.rootDir, 'config/waterline.js')
  let modelOverrides = {}

  if (await fileExists(overrideDir)) {
    modelOverrides = require(overrideDir)
  }

  return waterlineCore({
    database: config.database,
    adapter: require('sails-mysql'),
    adapterType: 'mysql',
    modelPath: path.join(config.rootDir, 'app/models'),
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
