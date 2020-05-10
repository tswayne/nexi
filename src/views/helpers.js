const fs = require("fs")
const path = require('path')

module.exports = (viewsRootDir) => {
  const helpers = {}
  const helpersDir = path.join(viewsRootDir, 'helpers')
  if (fs.existsSync(helpersDir)) {
    fs.readdirSync(helpersDir).forEach(fileName => {
      helpers[fileName.split('.js')[0]] = require(path.join(helpersDir, fileName))
    })
  }
  return helpers
}