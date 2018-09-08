const process = require("process")
const drives = require("./drives")

try {
  const reportData = drives()

  // Finally write it to the output
  Array.isArray(reportData) && reportData.forEach(rd => process.stdout.write(`${rd.lineOut}\n`))

  process.exit(0)
} catch (err) {
  console.error(`I ran into an unhandled error. Sorry! Here's the error: \n${err}`)
  process.exit(-1)
}
