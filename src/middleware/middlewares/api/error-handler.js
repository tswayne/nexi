const ApiError = require('../../../exceptions/api-error')

const errorHandlerMiddleware = ({ reporter, logger, config }) => {
  const errorHandler = (error, req, res, next) => {
    if (error.statusCode === 404) { return res.status(404).send(new ApiError(error))}

    if (error.validationError) {
      const response = new ApiError({ ...error, statusCode: 422, message: 'Validation Errors' })
      return res.status(422).send(response)
    }

    reporter.error(error, req);

    const response = new ApiError(error)
    return res.status(response.statusCode).send(response)
  }
  return errorHandler
}

module.exports = errorHandlerMiddleware
