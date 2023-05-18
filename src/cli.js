const bootstrap = require('./bootstrap')
const repl = require('repl')

bootstrap().then(c => repl.start('> ').context.context = c).catch(console.error)
