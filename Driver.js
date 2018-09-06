module.exports = class Driver {
  constructor(driverName) {
    if (!driverName) {
      throw new Error('Driver must have a name');
    }
    this.name = driverName;
    this.trips = [];
  }

  getTrips() {
    return this.trips;
  }

  /**
   * Parses a string into trip data
   * @param {string} tripData
   */
  addTripData(tripData) {
    const tripDataArr = tripData.split(' ');

    // Trip data should have been validated by input handler already, but just in case
    try {
      const tripDataObj = {
        originalDataLine: tripData,
        startTime: tripDataArr[1],
        endTime: tripDataArr[2],
        distance: tripDataArr[3],
      };
      if (tripDataArr[0] === this.name) {
        // Not mutating the existing array - creating a new one
        this.trips = this.trips.concat([tripDataObj]);
      }
    } catch (err) {
      console.error(`Error adding trip data line: ${tripData}`);
    }
  }

  toString() {
    return this.name;
  }
};
