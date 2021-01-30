const path = require('path')
const express = require('express')
const ControllerFactory = require('./controllers/factory')
const actionWrapper = require('./controllers/action-wrapper')

class Router {
  constructor(router, context, middlewareRegistry, controllerFactory) {
    this.router = router
    this.context = context
    this.middlewareRegistry = middlewareRegistry
    this.controllerFactory = controllerFactory
  }

  route(method) {
    const path = arguments[1]
    const handler = arguments[arguments.length -1]
    const middleWare = this.middlewareRegistry.get(Object.values(arguments).slice(2, -1))
    if (typeof handler === 'function') {
      return this.router[method](path, middleWare, handler)
    }

    const [controllerName, action] = handler.split('#')
    const controller = this.controllerFactory.get(controllerName, action)
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
    const path = arguments[0], block = arguments[arguments.length - 1]
    const namespaceRouter = new express.Router()
    const middleWare = this.middlewareRegistry.get(Object.values(arguments).slice(1, -1))
    if (middleWare.length) {
      namespaceRouter.use(middleWare)
    }
    block(new Router(namespaceRouter, this.context, this.middlewareRegistry, this.controllerFactory))
    this.router.use(path, namespaceRouter)
  }

  //TODO clean, figure out all scenarios want to cover, figure out, test?
  middleware() {
    let routerParams = []
    let middwareMethodNames = Object.values(arguments)

    if (arguments[0].includes("/")) {
      const path = arguments[0]
      routerParams = [path]
      middwareMethodNames = middwareMethodNames.slice(1)
    }

    const middleWare = this.middlewareRegistry.get(middwareMethodNames)
    routerParams.push(...middleWare)
    return this.router.use(...routerParams)
  }


}


const mount = (app, context, middlewareRegistry) => {
  const router = new Router(app, context, middlewareRegistry, new ControllerFactory(context))
  const routes = require(path.join(context.config.rootDir, 'routes.js'))
  return routes(context, router)
}

module.exports.Router = Router
module.exports.default = mount
