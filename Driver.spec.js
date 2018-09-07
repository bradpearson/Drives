const Driver = require("./Driver").Driver

describe("Driver tests", () => {
  test("driver should be created with a name and empty trips array", () => {
    const driver = new Driver("Brad")
    expect(driver).not.toBeNull()
    expect(driver.toString()).toEqual("Brad")
    expect(driver.getTrips()).toEqual([])
  })

  test("driver created without a name should throw an error", () => {
    expect(() => new Driver()).toThrow()
  })

  test("trip data should be added", () => {
    const driver = new Driver("Brad")
    driver.addTripData("Brad 11:01 11:10 2.1")
    expect(driver.getTrips().length).toEqual(1)
    expect(driver).toBeInstanceOf(Driver)
  })

  test("trip data should be ignored if not for this driver", () => {
    const driver = new Driver("Sam")
    driver.addTripData("Brad 11:01 11:10 2.1")
    expect(driver.getTrips().length).toEqual(0)
    expect(driver).toBeInstanceOf(Driver)
  })

  test("trip data should be ignored if malformed", () => {
    const driver = new Driver("Sam")
    driver.addTripData(1)
    expect(driver.getTrips().length).toEqual(0)
  })
})

const DataStore = require("./DataStore")
const driverActions = require("./Driver").actions

describe("driver action tests with data store", () => {
  test("driver action should add a new driver", () => {
    const ds = new DataStore({ drivers: {} })
    const didAdd = ds.runActionOnEntity("drivers", driverActions.addDriver(new Driver("Brad")))
    expect(didAdd).toBeTruthy()
    expect(ds.getCollection("drivers").Brad).toBeDefined()
    expect(ds.getCollection("drivers").Brad).toBeInstanceOf(Driver)
    //console.log(ds.getCollection("drivers"))
  })

  test("adding trip data to a driver that already exists", () => {
    const Brad = new Driver("Brad")
    const ds = new DataStore({ drivers: { Brad } })
    const itemsAffected = ds.runActionOnMembers(
      "drivers",
      driverActions.addTripDataToDriver("Brad", "Brad 1:00 1:15 2.1")
    )
    expect(itemsAffected).toBeTruthy()
    expect(ds.getCollection("drivers").Brad.trips.length).toEqual(1)
    expect(ds.getCollection("drivers").Brad).toBeInstanceOf(Driver)
  })

  test("averaging driver trips", () => {
    const Brad = new Driver("Brad")
    Brad.addTripData("Brad 11:01 11:10 2.1")
    Brad.addTripData("Brad 12:55 14:10 45.5")
    Brad.addTripData("Brad 15:00 16:00 60")
    const ds = new DataStore({ drivers: { Brad } })
    const results = ds.runActionOnMembers("drivers", driverActions.averageDriverTrips, true)
    expect(results).toBeTruthy()
    //console.log("avg: %o", results)
    expect(results.Brad.mileageAndSpeedAverage).toBeDefined()
  })
})
