test("simple time diff should return the hours in floats", () => {
  const simpleTimeDiff = require("./utils").simpleTimeDiff
  const timeDiff = simpleTimeDiff("12:00", "14:45")
  expect(timeDiff).toEqual(2.75)
})
test("simple time diff should return the diff when starting minutes are larger than the ending minutes", () => {
  const simpleTimeDiff = require("./utils").simpleTimeDiff
  const timeDiff = simpleTimeDiff("12:55", "13:10")
  expect(timeDiff).toEqual(0.25)
})
test("simple time diff should return the diff when diff is zero", () => {
  const simpleTimeDiff = require("./utils").simpleTimeDiff
  const timeDiff = simpleTimeDiff("12:55", "12:55")
  expect(timeDiff).toEqual(0)
})
