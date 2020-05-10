const notFound = require('./not-found')

module.exports = (app) => {
  app.use(notFound())
}