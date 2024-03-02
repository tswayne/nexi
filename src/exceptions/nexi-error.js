
class NexiError extends Error {
  constructor(message, { displayError, statusCode, messages, errors, validationError=false }={}) {
    super(message)
    this.validationError = validationError
    this.statusCode = statusCode
    this.messages = messages
    this.displayError = displayError
    this.errors = errors
  }
}

module.exports = NexiError
