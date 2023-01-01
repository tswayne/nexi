const httpError = require('http-errors')
const status = require('http-status')

class ApiError extends Error {
  constructor(error) {
    super(error.message)
    this.stack = error.stack
    const { message, displayError, statusCode=500, messages} = error

    this.statusCode = statusCode
    this.type =  httpError(statusCode).name // update to type
    this.error = status[statusCode] // update to error
    this.displayError = displayError
    this.message = message || this.error // Because it's an Error, needs _something_ here

    if (messages) {
      this.messages = messages
    }
  }

  serialize() {
    let message = null
    if (this.displayError) {
      message = this.message
    }
    const base = {
      statusCode: this.statusCode,
      type: this.type,
      error: this.error,
      message
    }
    if (this.messages) {
      base.messages = this.messages
    }
    return base
  }
}

module.exports = ApiError
