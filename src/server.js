const express = require('express')
const decorate = require('./decorators/decorator')
const Middleware = require('./middleware/middleware')
const router = require('./router')
const setupViews = require('./views/setup-views')

class Server {
  constructor(config, logger) {
    this.app = express()
    this.config = config
    this.logger = logger
  }

  async start(done) {
    const { app, config } = this
    app.set('trust proxy', this.config.expressSettings.trustProxy)
    try {
      if (!config.apiMode) {
        setupViews(app, config)
      }
      const context = await decorate(this.config, this.logger)
      const middleware = new Middleware(context)
      await middleware.setup()

      middleware.preRequest.mount(app)
      router(app, context, middleware.registry)
      middleware.postRequest.mount(app)

      await app.listen(config.port, '0.0.0.0', done)
    } catch (err) {
      done(err)
    }
  }
}

module.exports = Server