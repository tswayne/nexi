
const redis = async (config) => {
  const redis = require('redis').createClient(config.redis)
  await redis.connect()
  return redis
}

module.exports = redis
