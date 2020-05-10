//TODO configurable 404 & 500 view
const errorHandlerMiddleware = ({ reporter, logger, config }) => {
  const errorHandler = (error, req, res, next) => {
    if (error.statusCode === 404) { return res.status(404).render('not-found')}

    reporter.error(error, req);

    return res.status(500).render('server-error')
  }
  return errorHandler
}

module.exports = errorHandlerMiddleware
