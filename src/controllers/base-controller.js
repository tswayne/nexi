const bindAll = require('class-bindall')

class BaseController {

  constructor(context) {
    this.context = context
    bindAll(this)
  }
}

module.exports = BaseController
