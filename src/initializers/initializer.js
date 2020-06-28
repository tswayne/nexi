const path = require('path')
const fs = require('fs').promises
const isAsync = func => func.constructor.name === "AsyncFunction";

const getAdditionalDecorators = async (rootDir) => {
  const filePath = path.join(rootDir, `config/initializers`)
  try {
    const files = await fs.readdir(filePath)
    return files.map(file => require(filePath + '/' + file))
  } catch (e) {
    return []
  }
}

module.exports = async (context) => {
  const initializers = await getAdditionalDecorators(context.config.rootDir)
  let asyncInitializers = []
  initializers.forEach(initializer => {
    if (isAsync(initializer)) {
      return asyncInitializers.push(initializer(context))
    }
    return initializer(context)
  })
  return Promise.all(asyncInitializers)
}