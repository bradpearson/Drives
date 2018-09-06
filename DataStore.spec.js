const DataStore = require('./DataStore');
const Driver = require('./Driver');

describe('Data store tests', () => {
  test('data store should add a driver', () => {
    const ds = new DataStore();
    const driver = new Driver('Brad');
    ds.addDriver(driver);
    expect(Object.keys(ds.getDriverData()).length).toEqual(1);
  });
});
