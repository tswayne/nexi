const fs = require('fs').promises

const camelToFileName = (name) => name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
const fileNameToCamel = (name) => name.replace(/-./g, c=>c.toUpperCase()[1])

const isAsync = func => func.constructor.name === "AsyncFunction";

const fileExists = async (filePath) => {
  try {
    await fs.access(filePath)
    return true
  } catch (e) {
    return false
  }
}

module.exports = {
  camelToFileName, isAsync, fileNameToCamel, fileExists
}

