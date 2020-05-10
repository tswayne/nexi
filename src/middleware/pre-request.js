const getMiddleware = require('./get-middleware')
const preRequest = require('./middlewares/common/common-pre-request')
const session = require('./middlewares/mvc/session')


class PreRequest {
  constructor(context) {
    this.context = context
    this.preRequestMiddleware = null
  }

  async setup() {
    const rootDir = this.context.config.rootDir
    this.preRequestMiddleware = await getMiddleware('pre-request', rootDir)
  }

  mount(app) {
    const context = this.context
    preRequest(app, context)

    if (!context.config.apiMode) {
      app.use(session(context))
    }

    if (this.preRequestMiddleware) {
      this.preRequestMiddleware(app, context)
    }
  }
}

module.exports = PreRequest