const { isAsync } = require('../utils')

const asyncWrapper = (method, context) => {
  if (method.length < 2 || method.length > 4) {
    throw new Error("Invalid method signature")
  }
  let frameworkAction
  if (method.length < 4) {
    frameworkAction = async (req, res, next) => {
      try {
        if (context) {
          return await method(req, res, next, context)
        }
        return await method(req, res, next)
      } catch (e) {
        return next(e)
      }
    }
  } else {
    frameworkAction = async (error, req, res, next) => {
      try {
        if (context) {
          return await method(error, req, res, next, context)
        }
        return await method(error, req, res, next)
      } catch (e) {
        return next(e)
      }
    }
  }
  return frameworkAction
}

const syncWrapper = (method, context) => {
  if (method.length < 2 || method.length > 4) {
    throw new Error("Invalid method signature")
  }
  let frameworkAction
  if (method.length < 4) {
    frameworkAction = (req, res, next) => {
      try {
        if (context) {
          return method(req, res, next, context)
        }
        return method(req, res, next)
      } catch (e) {
        return next(e)
      }
    }
  } else {
    frameworkAction = (error, req, res, next) => {
      try {
        if (context) {
          return method(error, req, res, next, context)
        }
        return method(error, req, res, next)
      } catch (e) {
        return next(e)
      }
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
