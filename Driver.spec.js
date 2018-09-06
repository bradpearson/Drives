const Driver = require('./Driver');

describe('Driver tests', () => {
  test('driver should be created with a name and empty trips array', () => {
    const driver = new Driver('Brad');
    expect(driver).not.toBeNull();
    expect(driver.toString()).toEqual('Brad');
    expect(driver.getTrips()).toEqual([]);
  });

  test('driver created without a name should throw an error', () => {
    expect(() => new Driver()).toThrow();
  });

  test('trip data should be added', () => {
    const driver = new Driver('Brad');
    driver.addTripData('Brad 11:01 11:10 2.1');
    expect(driver.getTrips().length).toEqual(1);
  });

  test('trip data should be ignored if not for this driver', () => {
    const driver = new Driver('Sam');
    driver.addTripData('Brad 11:01 11:10 2.1');
    expect(driver.getTrips().length).toEqual(0);
  });
});
