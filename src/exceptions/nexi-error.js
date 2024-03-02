
class NexiError extends Error {
  constructor(message, { displayError, statusCode, messages, errors, validationError=false, report=true }={}) {
    super(message)
    this.validationError = validationError
    this.statusCode = statusCode
    this.messages = messages
    this.displayError = displayError
    this.errors = errors
    this.report = report
  }
}

module.exports = NexiError
