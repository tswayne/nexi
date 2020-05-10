const PreRequest = require('./pre-request')
const PostRequest = require('./post-request')
const Registry = require('./registry')

class Middleware {
  constructor(context) {
    this.context = context
    this.preRequest = new PreRequest(context)
    this.postRequest = new PostRequest(context)
    this.registry = new Registry(context)
  }

  async setup() {
    await Promise.all([
      this.preRequest.setup(),
      this.postRequest.setup(),
      this.registry.setup()
    ])
    return this
  }


}

module.exports = Middleware