const chalk = require("chalk")
let debug = 0

/**
 * Poor man's logger to be able to contol output
 * @param {boolean} debug - bool to control verbosity of output. True means debug level logging
 */
module.exports = {
  debug: message => message && debug && console.log(chalk.blue(`[DEBUG] ${message}`)),
  info: message => message && console.log(message),
  success: message => message && console.log(chalk.green(message)),
  warn: message => message && console.log(chalk.yellow(message)),
  error: message => message && console.error(chalk.red(message)),
  setDebug: on => {
    debug = on
  },
}
