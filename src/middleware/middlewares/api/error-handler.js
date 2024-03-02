const ApiError = require('../../../exceptions/api-error')

const errorHandlerMiddleware = ({ reporter, logger, config }) => {
  // Assumes the shape of error looks like a NexiError.  ApiError reads from error and serializes safely with defaults.
  const errorHandler = (error, req, res, next) => {
    if (config.stage === 'development') {
      error.displayError = true
    }

    if (error.statusCode === 404) { return res.status(404).send(new ApiError(error).serialize())}

    if (error.validationError) {
      const response = new ApiError({ ...error, statusCode: 422, message: 'Validation Errors' })
      return res.status(422).send(response.serialize())
    }

    reporter.error(error, req);

    const response = new ApiError(error)
    return res.status(response.statusCode).send(response.serialize())
  }
  return errorHandler
}

module.exports = errorHandlerMiddleware
