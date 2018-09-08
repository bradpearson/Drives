let consoleSpy
let logger
let logLevel

describe("logger", () => {
  beforeEach(() => {
    consoleSpy = jest.spyOn(global.console, "log")
    logger = require("./logger")
  })
  test("should always log debug messages when debug is set to true", () => {
    logger.setDebug(1)
    logger.debug("test message")
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
  test("should never log debug messages when debug is set to false", () => {
    logger.setDebug(0)
    logger.debug("test message")
    expect(consoleSpy).not.toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
  test("should log all non debug messages", () => {
    logger.success("success message")
    expect(consoleSpy).toHaveBeenCalled()

    logger.warn("warn message")
    expect(consoleSpy).toHaveBeenCalled()

    logger.error("error message")
    expect(consoleSpy).toHaveBeenCalled()
  })
})
