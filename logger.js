const chalk = require("chalk")

module.exports = {
  log: message => message && console.log(message),
  success: message => message && console.log(chalk.green(message)),
  warn: message => message && console.log(chalk.yellow(message)),
  error: message => message && console.error(chalk.red(message)),
}