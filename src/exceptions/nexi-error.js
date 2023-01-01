
class NexiError extends Error {
  constructor(message, { displayError, statusCode, messages }={}) {
    super(message)
    this.statusCode = statusCode
    this.messages = messages
    this.displayError = displayError
  }
}

module.exports = NexiError
