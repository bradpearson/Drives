const simpleTimeDiff = (startTime, endTime) => {
  const startTimeArr = startTime.split(":")
  const endTimeArr = endTime.split(":")
  const startHour = parseInt(startTimeArr[0])
  const endHour = parseInt(endTimeArr[0])
  const startMin = parseInt(startTimeArr[1])
  const endMin = parseInt(endTimeArr[1])

  let hourDiff = endHour - startHour
  const timeDiffLessThanOneHour = hourDiff === 1 && startMin > endMin
  hourDiff = timeDiffLessThanOneHour ? 0 : hourDiff

  const minDiff = endMin >= startMin ? endMin - startMin : 60 - startMin + endMin

  //console.log(`hourDiff: ${hourDiff} minDiff: ${minDiff / 60}`)

  // In hour floats
  return hourDiff + minDiff / 60
}

module.exports = { simpleTimeDiff }
