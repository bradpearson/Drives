const fs = require('fs');

/**
 * Handles the input reading from files
 */
module.exports = class InputHandler {
  constructor(fileName = 'input.txt') {
    if (!fs.existsSync(fileName)) {
      throw new Error(`couldn't find file ${fileName}`);
    } else {
      this.fileName = fileName;
    }
  }

  /**
   * Reads in a file and returns an array per line of the file
   */
  readFile() {
    const fileContents = fs.readFileSync(this.fileName, { encoding: 'utf8' });
    return fileContents.split('\n');
  }
};
