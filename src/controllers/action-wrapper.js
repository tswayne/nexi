const { isAsync } = require('../utils')

const asyncWrapper = (method, context) => {
   const frameworkAction = async (req, res, next) => {
    try {
      if (context) {
        return await method(req, res, next, context)
      }
      return await method(req, res, next)
    } catch (e) {
      return next(e)
    }
  }
  return frameworkAction
}

const syncWrapper = (method, context) => {
  const frameworkAction = (req, res, next) => {
    try {
      if (context) {
        return method(req, res, next, context)
      }
      return method(req, res, next)
    } catch (e) {
      return next(e)
    }
  }
  return frameworkAction
}

const actionWrapper = (method, context) => {
  if (isAsync(method)) {
    return asyncWrapper(method, context)
  }
  return syncWrapper(method, context)
}

module.exports = actionWrapper