/**
 * A general data storage class for handling data organization
 * @class DataStore
 */
module.exports = class DataStore {
  /**
   * Root store object is a top level obj that can contain
   * Store actions operate on the
   * @param {Object} rootStoreObj
   */
  constructor(rootStoreObj = {}) {
    this.store = rootStoreObj
  }

  runActionOnEntity(entityName, action) {
    const entityCollection = this.store[entityName]
    if (entityCollection) {
      const newCollection = action(entityCollection)
      this.store[entityName] = newCollection
      // Return true if the action operated on anything
      return true
    }
    return false
  }

  runActionOnMembers(entityName, actionFn, returnResults = false) {
    const keysOrMap = collection => {
      let newCollection
      let itemsChanged
      if (Array.isArray(collection)) {
        newCollection = collection.map(actionFn)
        itemsChanged = collection.length
      } else if (typeof collection == "object") {
        const keys = Object.keys(collection)
        newCollection = {}
        keys.forEach(k => {
          newCollection[k] = actionFn(collection[k])
        })
        itemsChanged = Object.keys(newCollection).length
      }

      return { newCollection, itemsChanged }
    }
    const entityCollection = this.store[entityName]
    if (entityCollection) {
      const { newCollection, itemsChanged } = keysOrMap(entityCollection)
      if (!returnResults) {
        this.store[entityName] = newCollection
        // return the number of items this operated on
        return itemsChanged
      } else {
        // Return the results instead of persisting them
        return newCollection
      }
    }
  }

  getCollection(collectionName) {
    if (collectionName) {
      let coll = Array.isArray(this.store[collectionName])
        ? this.store[collectionName].slice(0)
        : Object.assign({}, this.store[collectionName])
      //console.log("returning %o", coll)
      return coll
    }
  }
}
