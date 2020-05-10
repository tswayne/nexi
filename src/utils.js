
const camelToFileName = (name) => name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()


module.exports = {
  camelToFileName
}