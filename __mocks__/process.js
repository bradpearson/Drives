const process = jest.genMockFromModule("process")

let _argv = []
process.__setArgv = argv => {
  _argv = argv
}
process.argv = _argv

module.exports = process
