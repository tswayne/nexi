const args = process.argv.slice(2)
const method = args[0]
const params = args.slice(1)

const path = require('path');
const exec_path = path.resolve(process.env.INIT_CWD, './node_modules/.bin/knex')

require('child_process')
  .spawn(`${exec_path}`, ['--knexfile', './node_modules/nexi/src/migration/config.js', `migrate:${method}`, ...params], {stdio:'inherit'})
  .on('exit', function (error) {});