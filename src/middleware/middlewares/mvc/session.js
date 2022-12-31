
const requestMetaMiddleware = ({ config, redis }) => {
  const session = require('express-session')
  const { application, sessionSettings } = config
  let { prefix, secret, ...overrides } = sessionSettings;
  let store
  if (config.redis) {
    const RedisStore = require('connect-redis')(session)
    const sessionPrefix = prefix ? prefix : application
    store = new RedisStore({ prefix: `${sessionPrefix}-sess`, client: redis})
  }

  return session(Object.assign({
    store,
    name: application,
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: config.stage !== 'development' }
  }, overrides || {}))
}

module.exports = requestMetaMiddleware
