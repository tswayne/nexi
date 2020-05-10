const path = require('path')

const waterline = (config) => {
  const waterlineCore  = require('waterline-standalone-core')
  return waterlineCore({
    database: config.database,
    adapter: require('sails-mysql'),
    adapterType: 'mysql',
    modelPath: path.join(config.rootDir, 'app/models'),
    modelDefaults: {
      datastore: 'default',
      fetchRecordsOnCreate: true,
      fetchRecordsOnUpdate: true,
      primaryKey: 'id',
      attributes: {
        createdAt: { type: 'string', autoCreatedAt: true, },
        updatedAt: { type: 'string', autoUpdatedAt: true, },
        id: { type: 'number', autoMigrations: { autoIncrement: true } },
      },
    }
  })
}

module.exports = waterline