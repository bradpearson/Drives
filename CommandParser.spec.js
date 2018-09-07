const CommandParser = require("./CommandParser")

const commandRegex = "^\\w+\\s\\w+\\s\\d{1,2}:\\d{2}\\s\\d{1,2}:\\d{2}\\s\\d[.]?[\\d]?"
const commandName = "Trip"
const commandData = "Brad 12:20 12:30 2.1"
const testCommandLine = `${commandName} ${commandData}`

describe("commandParser", () => {
  test("constructor defaults to empty command array", () => {
    const parser = new CommandParser()
    expect(parser).toBeTruthy()
  })

  test("constructor takes command array", () => {
    const parser = new CommandParser([{ name: commandName, validator: commandRegex }])
    expect(parser).toBeTruthy()
  })

  test("parser should parse command line", () => {
    const parser = new CommandParser([{ name: commandName, validator: commandRegex }])
    const parsedCommand = parser.parseLine(testCommandLine)
    expect(parsedCommand).not.toBeNull()
    expect(parsedCommand.error).not.toBeDefined()
    expect(parsedCommand.commandName).toBeTruthy()
    expect(parsedCommand.commandName).toEqual(commandName)
    expect(parsedCommand.commandData).toEqual(commandData)
    expect(parsedCommand.originalLine).toEqual(testCommandLine)
  })

  test("parser should fail to parse command that is not found", () => {
    const parser = new CommandParser([{ name: commandName, validator: commandRegex }])
    const parsedCommand = parser.parseLine(`NotFoundCommand ${commandData}`)
    expect(parsedCommand.error).toBeDefined()
    expect(parsedCommand.error).toContain("Command not found")
  })

  test("parser should fail to validate command data that is malformed", () => {
    const parser = new CommandParser([{ name: commandName, validator: commandRegex }])
    const parsedCommand = parser.parseLine(`${commandName} 1:1 1:02 1.1`)
    expect(parsedCommand.error).toBeDefined()
    expect(parsedCommand.error).toContain("Command validator failed")
  })
})
