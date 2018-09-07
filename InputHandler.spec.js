const InputHandler = require("./InputHandler")

jest.mock("fs")

describe("Input handler tests", () => {
  test("Constructor should throw an error if file does not exist", () => {
    require("fs")._existsSyncShouldReturn(false)
    expect(() => {
      new InputHandler()
    }).toThrow(/couldn't find file/)
  })

  test("Input handler constructor accepts file name", () => {
    const fileContents = `Driver Brad
    Driver Sam
    Trip Brad 1:01 1:10 1.1
    Trip Brad 11:01 11:10 2.1
    Trip Sam 12:01 12:10 1.3`
    require("fs")._existsSyncShouldReturn(true)
    require("fs").__readFileSyncContents(fileContents)
    const handler = new InputHandler()
    const fileContent = handler.readFile()
    expect(fileContent).toBeDefined()
    expect(Array.isArray(fileContent)).toBeTruthy()
    expect(fileContent.length).toBe(5)
  })
})
