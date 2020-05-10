const httpError = require('http-errors')
const status = require('http-status')

class ApiError extends Error {
  constructor(error) {
    super()
    const statusCode = error.statusCode || 500

    this.statusCode = statusCode
    this.error =  httpError(statusCode).name
    this.message = error.message || status[statusCode]

    if (error.messages) {
     this.messages = error.messages
    }
  }
}

module.exports = ApiError