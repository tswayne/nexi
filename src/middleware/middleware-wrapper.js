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
    frameworkAction = async (req, res, next) => {
      try {
        if (context) {
          return await method(req, res, next, context)
        }
        return await method(req, res, next, null)
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
    frameworkAction = (req, res, next) => {
      try {
        if (context) {
          return method(req, res, next, context)
        }
        return method(req, res, next, null)
      } catch (e) {
        return next(e)
      }
    }
  }
  return frameworkAction
}

const middlewareWrapper = (method, context) => {
  if (isAsync(method)) {
    return asyncWrapper(method, context)
  }
  return syncWrapper(method, context)
}

module.exports = middlewareWrapper
