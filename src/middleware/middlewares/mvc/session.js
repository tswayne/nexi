
const requestMetaMiddleware = ({ config, redis }, overrides={}) => {
  const session = require('express-session')
  const { application, sessionSecret } = config
  let store
  if (config.redis) {
    const RedisStore = require('connect-redis')(session)
    store = new RedisStore({ prefix: `${application}-sess`, client: redis})
  }

  return session(Object.assign({
    store,
    name: application,
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: config.stage !== 'development' }
  }, overrides))
}

module.exports = requestMetaMiddleware
