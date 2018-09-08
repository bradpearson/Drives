const drives = require("./drives")
const InputHandler = require("./InputHandler")
const CommandParser = require("./CommandParser")
const logger = require("./logger")

jest.mock("./InputHandler")

describe("Drives application", () => {
  test("should exit immediately if an input file is not specified", () => {
    process.argv = ["node", "start.js"]
    drives()
  })

  test("passing in debug value should call logger.setDebug", () => {
    process.argv = ["node", "start.js", "data.txt", "debug"]

    logSpy = jest.spyOn(logger, "setDebug")
    drives()
    expect(logSpy).toHaveBeenCalledWith("debug")
  })

  test("throwing an error from the input handler should exit the app", () => {
    process.argv = ["node", "start.js", "data.txt"]
    InputHandler.mockImplementation(() => ({
      readFile: () => {
        throw new Error("error")
      },
    }))

    let returnValue = drives()
    expect(returnValue).toBe(-1)
    InputHandler.mockClear()
  })

  test("passing in an input file should run create input handler with file name specified", () => {
    process.argv = ["node", "start.js", "data.txt"]
    InputHandler.mockImplementation(() => ({
      readFile: () => {
        return []
      },
    }))

    drives()
    expect(InputHandler).toHaveBeenCalledWith(`${__dirname}/data.txt`)
    InputHandler.mockClear()
  })

  test("an empty input file should cause the app to exit", () => {
    process.argv = ["node", "start.js", "data.txt"]
    InputHandler.mockImplementation(() => ({
      readFile: () => {
        return null
      },
    }))

    const exitCode = drives()
    expect(exitCode).toEqual(0)
    InputHandler.mockClear()
  })

  test("a valid input file should run the application and create a report", () => {
    process.argv = ["node", "start.js", "data.txt"]
    InputHandler.mockImplementation(() => ({
      readFile: () => {
        return ["Driver Brad", "Trip Brad 1:00 1:30 20", "Driver Ben", "Trip Benq 1:00 1:30 20"]
      },
    }))

    const reportData = drives()
    expect(reportData[0].lineOut).toBe("Brad: 20 miles @ 40 miles per hour")
  })
})
