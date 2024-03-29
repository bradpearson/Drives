const process = require("process")
const path = require("path")

const logger = require("./logger")
const DataStore = require("./DataStore")
const InputHandler = require("./InputHandler")
const CommandParser = require("./CommandParser")

const driverActions = require("./Driver").actions
const Driver = require("./Driver").Driver

// These are the command regex that validate each line of the input file. These could be externalied for different
// environments to for dynamic configuration
const commandNames = [
  { name: "Trip", validator: "^\\w+\\s\\w+\\s\\d{1,2}:\\d{2}\\s\\d{1,2}:\\d{2}\\s\\d[.]?[\\d]?" },
  { name: "Driver", validator: "^\\w*\\s\\w*$" },
]

/**
 * This is the default export function that is a wrapper for the main processing flow
 */
module.exports = () => {
  // process.argv[2] is the first input position and should contain the filename to process
  if (process.argv.length > 2) {
    // assume the input file is in the current folder where this script was kicked off
    const inputFile = process.argv[2]
    const inputFilePath = path.join(process.cwd(), inputFile)

    const debuggerOn = process.argv.length > 3 ? process.argv[3] : null
    require("./logger").setDebug(debuggerOn)

    // Load the file input
    let fileContents
    try {
      const inputHandler = new InputHandler(inputFilePath)
      fileContents = inputHandler.readFile()
    } catch (err) {
      logger.error(`Error loading input file: ${err.message}`)
      return -1
    }

    if (!fileContents || fileContents.length == 0) {
      logger.info(`input file was empty. Not processing any data.`)
      return 0
    }

    // parse and validate the commands in the file
    const commandParser = new CommandParser(commandNames)
    const parsedCommands = []
    fileContents.forEach(l => {
      const parsedLine = commandParser.parseLine(l)
      if (parsedLine && !parsedLine.error) {
        parsedCommands.push(parsedLine)
      }
    })

    // Create the data store
    const tripDataStore = new DataStore({ drivers: {} })

    // Load the drivers that were parsed
    parsedCommands.filter(c => c.commandName === "Driver").forEach(d => {
      const newDriver = new Driver(d.commandData)
      const didAdd = tripDataStore.runActionOnEntity("drivers", driverActions.addDriver(newDriver))
      if (!didAdd) {
        console.log(`Driver ${d.toString()} not added`)
      }
    })

    // Load the trip data
    parsedCommands.filter(c => c.commandName === "Trip").forEach(t => {
      // This array hard access is valid because we already validated it in the command parser
      const driverName = t.commandData.split(" ")[0]
      tripDataStore.runActionOnMembers(
        "drivers",
        driverActions.addTripDataToDriver(driverName, t.commandData)
      )
    })

    //Generate the averages for the report
    const drivers = tripDataStore.runActionOnMembers(
      "drivers",
      driverActions.averageDriverTrips,
      true
    )

    // Generate the report data
    const reportData = Object.keys(drivers)
      .map(d => {
        let lineOut = `${drivers[d].name}: ${Math.round(
          drivers[d].mileageAndSpeedAverage.distance
        )} miles`

        if (drivers[d].mileageAndSpeedAverage.distance) {
          lineOut += ` @ ${Math.round(drivers[d].mileageAndSpeedAverage.speed)} miles per hour`
        }

        const totalDistance = drivers[d].mileageAndSpeedAverage.distance
        return { lineOut, totalDistance }
      })
      .sort((a, b) => b.totalDistance - a.totalDistance)

    return reportData
  } else {
    logger.info(`drives.js usage: node drives.js <input file>`)
  }
}
