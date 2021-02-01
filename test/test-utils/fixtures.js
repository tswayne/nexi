
const config = () => {
  return {
    rootDir: '',
    expressSettings: {}
  }
}

const context = () => {
  return {
    config: config()
  }
}

const controller = () => {
  class Controller {
    action(req, res) {
      return res.send("PONG")
    }
  }
  return new Controller()
}

module.exports = { context, config, controller }
