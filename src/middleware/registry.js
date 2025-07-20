const getMiddleware = require('./get-middleware')
const { camelToFileName } = require('../utils')
const middlewareWrapper = require('./middleware-wrapper')

class Registry {
  #cache = {}

  constructor(context) {
    this.context = context
    // file-name -> full/file/path.js
    this.files = {}
  }

  async setup() {
    const rootDir = this.context.config.rootDir
    this.files = await getMiddleware('app', rootDir)
  }

  get(middlewares) {
    return middlewares.map(middleware => {
      if (typeof middleware === 'function') {
        return middlewareWrapper(middleware)
      }
      const fileName = camelToFileName(middleware)
      if (!this.#cache[fileName]) {
        this.#cache[fileName] = require(this.files[fileName], this.context)
      }
      return middlewareWrapper(this.#cache[fileName], this.context)
    })

  }

}

module.exports = Registry
