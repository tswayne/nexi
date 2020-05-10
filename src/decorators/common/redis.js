
const redis = (config) => {
  return require('redis').createClient(config.redis)
}

module.exports = redis
