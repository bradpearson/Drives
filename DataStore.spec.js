const DataStore = require("./DataStore")
const Driver = require("./Driver")

describe("Data store tests", () => {
  test("data store should initialize a named store", () => {
    const ds = new DataStore({ drivers: [] })
    expect(ds.getCollection("drivers")).toBeDefined()
  })

  test("data store should run actions on entity array collection", () => {
    const ds = new DataStore({ drivers: [{ name: "Brad" }, { name: "Sam" }, { name: "Joe" }] })
    const action = driver => Object.assign({}, driver, { age: 25 })
    const itemsAffected = ds.runActionOnMembers("drivers", action)
    expect(itemsAffected).toEqual(3)
    //console.log("drivers: %j", ds.getCollection("drivers"))
    expect(ds.getCollection("drivers")[0].age).toEqual(25)
  })

  test("data store should run actions on entity object collection", () => {
    const ds = new DataStore({ drivers: { Brad: {}, Sam: {}, Joe: {} } })
    const action = driver => Object.assign({}, driver, { trips: [] })
    const itemsAffected = ds.runActionOnMembers("drivers", action)
    expect(itemsAffected).toEqual(3)
    expect(Array.isArray(ds.getCollection("drivers").Brad.trips)).toBeTruthy()
    expect(Array.isArray(ds.getCollection("drivers").Sam.trips)).toBeTruthy()
    expect(Array.isArray(ds.getCollection("drivers").Joe.trips)).toBeTruthy()
  })

  test("data store should run action on single entity", () => {
    const ds = new DataStore({ drivers: { Brad: {}, Sam: {}, Joe: {} } })
    const action = drivers => Object.assign({}, drivers, { Billy: {} })
    const itemsAffected = ds.runActionOnEntity("drivers", action)
    expect(itemsAffected).toBeTruthy()
    expect(ds.getCollection("drivers").Billy).toBeDefined()
  })

  test("data store should not run an action on an entity that does not exist", () => {
    const ds = new DataStore({ drivers: { Brad: {}, Sam: {}, Joe: {} } })
    const action = drivers => Object.assign({}, drivers, { Billy: {} })
    const itemsAffected = ds.runActionOnEntity("NotDrivers", action)
    expect(itemsAffected).toBeFalsy()
    expect(ds.getCollection("drivers").Billy).not.toBeDefined()
  })
})
