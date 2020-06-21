const path = require('path')
const express = require('express')
const ControllerFactory = require('./controllers/factory')
const actionWrapper = require('./controllers/action-wrapper')

class Router {
  constructor(router, context, middlewareRegistry, factory) {
    this.router = router
    this.context = context
    this.middlewareRegistry = middlewareRegistry
    this.controllerFactory = factory ? factory : new ControllerFactory(context)
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

  middleware() {
    const middleWare = this.middlewareRegistry.get(Object.values(arguments))
    return this.router.use(middleWare)
  }


}


const mount = (app, context, middlewareRegistry) => {
  const router = new Router(app, context, middlewareRegistry)
  const routes = require(path.join(context.config.rootDir, 'routes.js'))
  return routes(context, router)
}

module.exports = mount
