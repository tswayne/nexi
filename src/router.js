const path = require('path')
const express = require('express')
const ControllerFactory = require('./controllers/factory')
const actionWrapper = require('./controllers/action-wrapper')

class Router {
  constructor(router, context, middlewareRegistry, controllerFactory, scopedMiddleware=[]) {
    this.router = router
    this.context = context
    this.middlewareRegistry = middlewareRegistry
    this.controllerFactory = controllerFactory
    this.scopedMiddleware = scopedMiddleware
  }

  route(method) {
    const path = this._parsePath(arguments[1])
    const handler = this._parseHandler(arguments)
    const middleWare = this.middlewareRegistry.get(this._parseMiddleware(arguments,2, -1)).concat(this.scopedMiddleware)

    if (handler) {
      return this.router[method](path, middleWare, handler)
    }

    const [controllerName, action] = arguments[arguments.length -1].split('#')
    const controller = this.controllerFactory.get(controllerName, action)
    if (!controller[action]) {
      throw new Error(`Controller action ${controllerName}#${action} for configured route does not exist.`)
    }
    return this.router[method](path, middleWare, actionWrapper(controller[action]))
  }

  get(path) {
    return this.route('get', ...arguments)
  }

  patch(path) {
    return this.route('patch', ...arguments)
  }

  post() {
    return this.route('post', ...arguments)
  }

  put() {
    return this.route('put', ...arguments)
  }

  delete() {
    return this.route('delete', ...arguments)
  }

  any() {
    return this.route('all', ...arguments)
  }

  namespace() {
    const path = this._parsePath(arguments[0]), block = this._parseNestedRouter(arguments)
    const namespaceRouter = new express.Router()

    const middleWare = this.middlewareRegistry.get(this._parseMiddleware(arguments, 1, -1))
    if (middleWare.length) {
      namespaceRouter.use(middleWare)
    }

    block(new Router(namespaceRouter, this.context, this.middlewareRegistry, this.controllerFactory))

    if (path) {
      return this.router.use(path, namespaceRouter)
    }
    return this.router.use(namespaceRouter)
  }

  middleware() {
    const path = this._parsePath(arguments[0])
    const block = this._parseNestedRouter(arguments)
    const middlewareStartsAt = path ? 1 : 0

    if (block) {
      const middleWare = this.middlewareRegistry.get(this._parseMiddleware(arguments, 0, -1))
      const namespaceRouter = new express.Router()
      block(new Router(namespaceRouter, this.context, this.middlewareRegistry, this.controllerFactory, middleWare))
      return this.router.use(namespaceRouter)
    }
    const middleWare = this.middlewareRegistry.get(this._parseMiddleware(arguments, middlewareStartsAt))

    if (path) {
      return this.router.use(path, middleWare)
    }
    return this.router.use(middleWare)
  }

  _parsePath(maybePath) {
    return typeof maybePath === 'string' && maybePath.includes("/") ? maybePath : null
  }

  _parseHandler(args) {
    return typeof args[args.length -1] === 'function' ? args[args.length -1] : null
  }

  _parseNestedRouter(args) {
    return typeof args[args.length -1] === 'function' && args[args.length -1].length === 1 ? args[args.length -1] : null
  }

  _parseMiddleware(args, fromIndex, toIndex) {
    return toIndex ? Object.values(args).slice(fromIndex, toIndex) : Object.values(args).slice(fromIndex)
  }

}


const mount = (app, context, middlewareRegistry) => {
  const router = new Router(app, context, middlewareRegistry, new ControllerFactory(context))
  const routes = require(path.join(context.config.rootDir, 'routes.js'))
  return routes(context, router)
}

module.exports.Router = Router
module.exports.route = mount
