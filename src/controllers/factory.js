const path = require('path')
const { camelToFileName } = require('../utils')


//TODO move wrap action to controller factory, use call with controller as context to call method
// Use defineProperty to set method name correctly - https://stackoverflow.com/questions/5905492/dynamic-function-name-in-javascript/40918734#40918734
class ControllerFactory {
  #cache = {}
  constructor(context) {
    this.context = context
  }

  get(name) {
    const filePath = camelToFileName(name)
    if (!this.#cache[filePath]) {
      const Controller = require(path.join(this.context.config.rootDir, `app/controllers/${filePath}.js`))
      this.#cache[filePath] = new Controller(this.context)
    }
    return this.#cache[filePath]
  }

}

module.exports = ControllerFactory