/**
 * A general data storage class for handling data organization
 */
module.exports = class DataStore {
  constructor() {
    this.drivers = {};
    this.orphanedTrips = [];
  }

  /**
   * Adds a key value pair to the drivers object
   * @param {string} name
   * @param {object} driver
   */
  addDriver(driver) {
    const driverName = driver.toString();
    if (!this.drivers[driverName]) {
      // search orphaned trips to see if this driver has any
      this.orphanedTrips.forEach(t => {
        const tripArr = t.split(' ');
        if (tripArr[0] === driverName) {
          // found one, add it
          driver.addTripData(t);
        }
      });

      // Add the driver to the data object
      this.drivers[driverName] = driver;
    }
  }

  /**
   *
   * @param {string} driverName
   * @param {string} tripData
   */
  addTripDataToDriver(driverName, tripData) {
    if (this.drivers[driverName]) {
      this.drivers[driverName].addTripData(tripData);
    } else {
      this.orphanedTrips = this.orphanedTrips.concat([tripData]);
    }
  }

  getDriverData() {
    return Object.assign({}, this.drivers);
  }
};
