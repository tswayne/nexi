const request = require('supertest')
const express = require('express')
const Router = require('../../src/router').Router
const sinon = require('sinon')
const { context, controller } = require('../test-utils/fixtures')

let middlewareStub
let controllerFactoryStub
beforeEach(() => {
  const middleware = { get: () => {}}
  const controllerFactory = { get: () => {}}

  middlewareStub = sinon.stub(middleware)
  middlewareStub.get.returns([])

  controllerFactoryStub = sinon.stub(controllerFactory)
})

const setupRouter = (routes, context, middleware=middlewareStub, controllerFactory=controllerFactoryStub) => {
  const app = express()
  const router = new Router(app, context, middleware, controllerFactory)
  routes(context, router)
  return app
}

describe("Basic routing", () => {
  test('get request', async () => {
    const routes = (context, appRouter) => { appRouter.get('/ping', (req, res) => res.send("PONG")) }
    const app = setupRouter(routes, context())
    await request(app).get("/ping").expect(200)
  });

  test('patch request', async () => {
    const routes = (context, appRouter) => { appRouter.patch('/ping', (req, res) => res.send("PONG")) }
    const app = setupRouter(routes, context())
    await request(app).patch("/ping").expect(200)
  });

  test('post request', async () => {
    const routes = (context, appRouter) => { appRouter.post('/ping', (req, res) => res.send("PONG")) }
    const app = setupRouter(routes, context())
    await request(app).post("/ping").expect(200)
  });

  test('put request', async () => {
    const routes = (context, appRouter) => { appRouter.put('/ping', (req, res) => res.send("PONG")) }
    const app = setupRouter(routes, context())
    await request(app).put("/ping").expect(200)
  });

  test('delete request', async () => {
    const routes = (context, appRouter) => { appRouter.delete('/ping', (req, res) => res.send("PONG")) }
    const app = setupRouter(routes, context())
    await request(app).delete("/ping").expect(200)
  });

  test("any request", async () => {
    const routes = (context, appRouter) => { appRouter.any('/ping', (req, res) => res.send("PONG")) }
    const app = setupRouter(routes, context())
    await request(app).get("/ping").expect(200)
    await request(app).post("/ping").expect(200)
  })

  test('parses and routes to controller#action', async () => {
    const routes = (context, appRouter) => { appRouter.any('/ping',  "controller#action") }
    controllerFactoryStub.get.returns(controller())
    const app = setupRouter(routes, context(), middlewareStub, controllerFactoryStub)
    await request(app).get("/ping").expect(200)
    expect(controllerFactoryStub.get.calledWith("controller", 'action')).toBeTruthy()
  });

  test('returns clean exception if action does not exist', async () => {
    const routes = (context, appRouter) => { appRouter.any('/ping',  "controller#doesNotExist") }
    controllerFactoryStub.get.returns(controller())
    const toThrow = () => setupRouter(routes, context(), middlewareStub, controllerFactoryStub)
    expect(toThrow).toThrow(Error);
    expect(toThrow).toThrow("Controller action controller#doesNotExist for configured route does not exist.");
  });

  test("can chain middleware functions", async () => {
    const middlewareOne = (req, res, next) => { res.locals.one = "1"; next()}
    const middlewareTwo = (req, res, next) => { res.locals.two = "2"; next()}
    middlewareStub.get.returnsArg(0)
    const routes = (context, appRouter) => {
      appRouter.get('/ping', middlewareOne, middlewareTwo, (req, res) => res.json(res.locals))
    }
    const app = setupRouter(routes, context())
    const response = await request(app).get("/ping").expect(200)
    expect(response.body).toEqual({ one: '1', two: '2'})
  })

  test("can chain middleware by name", async () => {
    const middlewareOne = (req, res, next) => { res.locals.one = "1"; next()}
    const middlewareTwo = (req, res, next) => { res.locals.two = "2"; next()}
    middlewareStub.get.returns([middlewareOne, middlewareTwo])
    const routes = (context, appRouter) => {
      appRouter.get('/ping', 'middlewareOne', 'middlewareTwo', (req, res) => res.json(res.locals))
    }
    const app = setupRouter(routes, context())
    const response = await request(app).get("/ping").expect(200)
    expect(response.body).toEqual({ one: '1', two: '2'})
    expect(middlewareStub.get.calledWith(['middlewareOne', 'middlewareTwo'])).toBeTruthy()
  })
})

describe("Route namespaces", () => {
  test('prefixes all nested routes', async () => {
    const routes = (context, appRouter) => {
      appRouter.namespace('/first', (namespaceRouter) => {
        namespaceRouter.get('/ping', (req, res) => res.send("PONG"))
      })
    }
    const app = setupRouter(routes, context())
    await request(app).get("/ping").expect(404)
    await request(app).get("/first/ping").expect(200)
  });

  test('nested namespaces', async () => {
    const routes = (context, appRouter) => {
      appRouter.namespace('/first', (namespaceRouter) => {
        namespaceRouter.namespace('/second', (nestedNamespaceRouter) => {
          nestedNamespaceRouter.get('/ping', (req, res) => res.send("PONG"))
        })
      })
    }
    const app = setupRouter(routes, context())
    await request(app).get("/first/second/ping").expect(200)
  });

  test('namespaced middleware', async () => {
    const middleware = (req, res, next) => { res.locals.one = "1"; next()}
    middlewareStub.get.returnsArg(0)
    const routes = (context, appRouter) => {
      appRouter.get('/no-middleware', (req, res) => res.json(res.locals))
      appRouter.namespace('/first', middleware, (namespaceRouter) => {
        namespaceRouter.get('/with-middleware', (req, res) => res.json(res.locals))
      })
    }
    const app = setupRouter(routes, context())
    const noMiddlewareResponse = await request(app).get("/no-middleware").expect(200)
    const withMiddlewareResponse = await request(app).get("/first/with-middleware").expect(200)

    expect(noMiddlewareResponse.body).toEqual({})
    expect(withMiddlewareResponse.body).toEqual({ one: "1"})
  });
})

describe("Middleware", () => {
  test('Unscoped middleware applies to all routes below', async () => {
    const middleware = (req, res, next) => { res.locals.one = "1"; next()}
    middlewareStub.get.returnsArg(0)
    const routes = (context, appRouter) => {
      appRouter.get('/no-middleware', (req, res) => res.json(res.locals))
      appRouter.middleware(middleware)
      appRouter.get('/with-middleware', (req, res) => res.json(res.locals))
    }
    const app = setupRouter(routes, context())
    const noMiddlewareResponse = await request(app).get("/no-middleware").expect(200)
    const withMiddlewareResponse = await request(app).get("/with-middleware").expect(200)

    expect(noMiddlewareResponse.body).toEqual({})
    expect(withMiddlewareResponse.body).toEqual({ one: "1"})
  });

  test('Scoped middleware applies to all routes that match', async () => {
    const middleware = (req, res, next) => { res.locals.one = "1"; next()}
    middlewareStub.get.returnsArg(0)
    const routes = (context, appRouter) => {
      appRouter.middleware('/match', middleware)
      appRouter.get('/no-middleware', (req, res) => res.json(res.locals))
      appRouter.get('/match/with-middleware', (req, res) => res.json(res.locals))
    }
    const app = setupRouter(routes, context())
    const noMiddlewareResponse = await request(app).get("/no-middleware").expect(200)
    const withMiddlewareResponse = await request(app).get("/match/with-middleware").expect(200)

    expect(noMiddlewareResponse.body).toEqual({})
    expect(withMiddlewareResponse.body).toEqual({ one: "1"})
  });

  test('Middleware blocks applies middleware to all routes inside', async () => {
    const middleware = (req, res, next) => { res.locals.one = "1"; next()}
    middlewareStub.get.returnsArg(0)
    const routes = (context, appRouter) => {
      appRouter.middleware(middleware, (middlewareRouter) => {
        middlewareRouter.get('/with-middleware', (req, res) => res.json(res.locals))
      })
      appRouter.get('/no-middleware', (req, res) => res.json(res.locals))
    }
    const app = setupRouter(routes, context())
    const noMiddlewareResponse = await request(app).get("/no-middleware").expect(200)
    const withMiddlewareResponse = await request(app).get("/with-middleware").expect(200)

    expect(noMiddlewareResponse.body).toEqual({})
    expect(withMiddlewareResponse.body).toEqual({ one: "1"})
  });
})

