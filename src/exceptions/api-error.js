const httpError = require('http-errors')
const status = require('http-status')

// This class is to organize serializing error messages and should not be created directly.
// NexiError is the data model that this reads from
class ApiError extends Error {
  constructor(error) {
    super(error.message)
    this.stack = error.stack
    const { message, displayError, statusCode=500, messages, errors} = error

    this.statusCode = statusCode
    this.type =  httpError(statusCode).name
    this.error = status[statusCode]
    this.displayError = displayError

    // Message is intended for the consumer, but is only displayed if explicitly told to.
    this.message = message || this.error // Because it's an Error, needs _something_ here

    // Use one of these to list key value errors.  Useful for object validation.
    if (messages) {
      this.messages = messages
    }
    if (errors) {
      this.errors = errors
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
    if (this.errors) {
      base.errors = this.errors
    }
    return base
  }
}

module.exports = ApiError
