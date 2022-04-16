const path = require('path')
const { engine } = require('express-handlebars');
const express = require('express')

module.exports = (app, config) => {
  const viewsRootDir = path.join(config.rootDir, 'app/views')
  const defaultLayout  = path.join(viewsRootDir, 'layout/layout.handlebars')
  app.set('views', viewsRootDir)
  app.engine('handlebars', engine({
    defaultLayout,
    helpers: require('./helpers')(viewsRootDir),
    partialsDir: viewsRootDir,
    layoutsDir: path.join(viewsRootDir, 'layout')
  }))
  app.set('view engine', 'handlebars')
  app.use('/assets', express.static(path.join(config.srcDir, config.assetsPath)))
};
