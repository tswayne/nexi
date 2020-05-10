const path = require('path')
const deepmerge = require('deepmerge')

const baseConfig = {
  application: 'Framework application',
  env: process.env.NODE_ENV,
  stage: process.env.STAGE || 'development',
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    name: 'framework-application'
  },
  sessionSecret: 'cat',
  port: 3000,
  expressSettings: {

  },
  logger: {
    prettyPrint: true,
    overrides: {}
  },
  rootDirectory: './',
  assetsPath: '../assets'
}

const getConfig = (srcDir) => {
  const appConfig = require(path.join(srcDir, '/config/config.js'))
  const config = deepmerge(baseConfig, appConfig)
  config.srcDir = srcDir
  config.rootDir = path.join(srcDir, config.rootDirectory)
  return config
}



module.exports = getConfig