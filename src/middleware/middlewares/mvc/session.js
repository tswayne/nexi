
const requestMetaMiddleware = ({ config, redis }, overrides={}) => {
  const session = require('express-session')
  const RedisStore = require('connect-redis')(session)

  const { application, sessionSecret } = config
  return session(Object.assign({
    store: new RedisStore({ prefix: `${application}-sess`, client: redis}),
    name: application,
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: config.stage !== 'development' }
  }, overrides))
}

module.exports = requestMetaMiddleware
