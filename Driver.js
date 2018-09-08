const logger = require("./logger")

/**
 * A class representatoin of a driver entity
 */
class Driver {
  constructor(driverName) {
    if (!driverName) {
      throw new Error("Driver must have a name")
    }
    this.name = driverName
    this.trips = []
  }

  getTrips() {
    return this.trips
  }

  /**
   * Parses a string into trip data
   * @param {string} tripData
   */
  addTripData(tripData) {
    // Trip data should have been validated by input handler already, but just in case
    try {
      const tripDataArr = tripData.split(" ")
      const tripDataObj = {
        originalDataLine: tripData,
        startTime: tripDataArr[1],
        endTime: tripDataArr[2],
        distance: parseFloat(tripDataArr[3]),
      }
      if (tripDataArr[0] === this.name) {
        // Not mutating the existing array - creating a new one
        this.trips = this.trips.concat([tripDataObj])
      }
    } catch (err) {
      console.error(`Error adding trip data line: ${tripData}`)
    }
  }

  // updateDriverAttribute(attributeName, attributeValue) {
  //   this[attributeName] = attributeValue
  // }

  toString() {
    return this.name
  }
}

/**
 * Adds a driver to the store
 * @param {object} driver
 */
const addDriver = (driver, initialTripData = []) => {
  const driverName = driver.name
  return drivers => {
    if (!drivers[driverName]) {
      //Create a new driver object
      const newDriver = new Driver(driverName)
      //Return a new top level drivers entity to be stored
      return Object.assign({}, drivers, { [driverName]: newDriver })
    }
  }
}

addDriver.name = "addDriver"

/**
 * Action to add trip data to a driver in the data store
 * @param {string} driverName
 * @param {string} tripData
 */
const addTripDataToDriver = (driverName, tripData) => driver => {
  if (tripData && driver.name === driverName) {
    driver.addTripData(tripData)
    logger.debug(`adding trip data [${tripData}] to ${driverName}`)
  }
  return driver
}

/**
 * Actoin for data store that performs calculation needed for final report
 * @param {Driver} driver
 */
const averageDriverTrips = driver => {
  const mileageAndSpeedAverage = driver.trips.reduce(
    (acc, trip) => {
      const tripTime = require("./utils").simpleTimeDiff(trip.startTime, trip.endTime)
      const tripMph = trip.distance / tripTime

      const newDistance = acc.distance + trip.distance
      const newTime = acc.time + tripTime
      const newSpeed = (acc.distance + trip.distance) / newTime
      const calcToReturn =
        tripMph > 5 && tripMph < 100
          ? { distance: newDistance, speed: newSpeed, time: newTime }
          : { distance: acc.distance, speed: acc.speed, time: acc.time }
      return calcToReturn
    },
    { distance: 0, speed: 0, time: 0 }
  )
  return Object.assign({}, driver, { mileageAndSpeedAverage })
}
averageDriverTrips.name = "averageDriverTrips"

module.exports = {
  Driver,
  actions: { addDriver, addTripDataToDriver, averageDriverTrips },
}
