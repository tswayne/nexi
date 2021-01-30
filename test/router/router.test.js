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

  //TODO Apply middleware to namespace
})


/*
* To test
* namespace('/api', m1, m2, (apiRouter) => {
*
*   apiRouter.get('/whatever', "some#act") < - should apply m1, m2 to only this route
* }
*
* middleware("verifyLogin") < - should apply to everything below
* middleware("/targeted", "m3") < - should apply to everything below
*
* router.get("/secret", "some#authed") < - not targeted
* router.get("/targeted/thing", "some#thing") < - targeted, should apply m3
*
* middleware("m4", (mwRouter) => {
*   mwRouter.get('/random', "random#route") < - should be only thing targeted by m4
* })
*
* * router.get("/logout", "random#logout") < - should NOT apply m4
* */

