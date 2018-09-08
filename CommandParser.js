const logger = require("./logger")

/**
 * Handles the parsing of commands
 * @class CommandParser
 */
module.exports = class CommandParser {
  /**
   * Class constructor
   * @constructor
   * @param {array} commands - Maps of commandNames and commandValidator regex {name:<name>, validator:<regex expression>}
   */
  constructor(commands = []) {
    this.commands = commands.map(c => Object.assign({}, c, { validator: new RegExp(c.validator) }))
  }

  /**
   * Handles the parsing including validation of a command line
   * @param {string} line - line format should be <command> <command data>
   */
  parseLine(line) {
    const lineArr = line.split(" ")
    const command = this.commands.find(c => c.name === lineArr[0])

    let parsedCommand

    if (command) {
      // regex validate command data format
      if (command.validator.test(line)) {
        const commandData = lineArr.splice(1).join(" ")
        parsedCommand = { commandName: command.name, commandData, originalLine: line }
      } else {
        logger.debug(`command [${line}] was not valid. Discarding`)
        parsedCommand = { error: "Command validator failed", originalLine: line }
      }
    } else {
      logger.debug(`command [${line}] was not found. Discarding`)
      parsedCommand = { error: "Command not found", originalLine: line }
    }

    return parsedCommand
  }
}
