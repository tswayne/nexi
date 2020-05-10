const getMiddleware = require('./get-middleware')

const postRequest = require('./middlewares/common/common-post-request')
const apiErrorHandler = require('./middlewares/api/error-handler')
const mvcErrorHandler = require('./middlewares/mvc/error-handler')

class PostRequest {
  constructor(context) {
    this.context = context
    this.preRequestMiddleware = null
  }

  async setup() {
    const rootDir = this.context.config.rootDir
    this.postRequestMiddleware = await getMiddleware('post-request', rootDir)
  }

  mount(app) {
    const context = this.context

    if (this.postRequestMiddleware) {
      this.postRequestMiddleware(app, context)
    }

    postRequest(app)

    if (context.config.apiMode) {
      app.use(apiErrorHandler(context))
    } else {
      app.use(mvcErrorHandler(context))
    }
  }
}

module.exports = PostRequest