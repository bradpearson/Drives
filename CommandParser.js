/**
 * Handles the parsing of commands
 * @class
 */
module.exports = class CommandParser {
  /**
   * Class constructor
   * @constructor
   * @param {array} commands - Maps of commandNames and commandValidator regex {name:<name>, validator:<regex expression>}
   */
  constructor(commands = []) {
    this.commands = commands.map(c => Object.assign({}, c, { validator: new RegExp(c.validator) }));
  }

  /**
   * Handles the parsing including validation of a command line
   * @param {string} line - line format should be <command> <command data>
   */
  parseLine(line) {
    const lineArr = line.split(' ');
    const command = this.commands.find(c => c.name === lineArr[0]);

    let parsedCommand;

    if (command) {
      const commandData = lineArr.splice(1).join(' ');
      // regex validate command data format
      if (command.validator.test(line)) {
        parsedCommand = { commandName: command.name, commandData, originalLine: line };
      } else {
        parsedCommand = { error: 'Command validator failed', originalLine: line };
      }
    } else {
      parsedCommand = { error: 'Command not found', originalLine: line };
    }

    return parsedCommand;
  }
};
