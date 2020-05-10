const path = require('path')
const fs = require('fs').promises

const getAppMiddleware = async (middlewareRoot) => {
  const filePath = path.join(middlewareRoot, `app`)
  try {
    let directory = {}
    const files = await fs.readdir(filePath)
    files.forEach(file => directory[file.split('.js')[0]] = filePath + '/' + file)
    return directory
  } catch (e) {
    return {}
  }
}

const getEdgeMiddleware = async (middlewareType, middlewareRoot) => {
  const filePath = path.join(middlewareRoot, `${middlewareType}/index.js`)
  try {
    await fs.access(filePath)
    return require(filePath)
  } catch (e) {
    return false
  }

}

const getMiddleware = async (middlewareType, rootDir) => {
  const middlewareRoot = path.join(rootDir, 'middleware/')
  if (middlewareType === 'app') {
    return getAppMiddleware(middlewareRoot)
  }

  return getEdgeMiddleware(middlewareType, middlewareRoot)
}

module.exports = getMiddleware