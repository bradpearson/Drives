const process = require("process")
const drives = require("./drives")

try {
  drives()
  process.exit(0)
} catch (err) {
  console.error(`I ran into an unhandled error. Sorry! Here's the error: \n${err}`)
  process.exit(-1)
}
