var testStore = require('./store_test').testStore
const MemStore = require('../../store/memstore')

var memStore = new MemStore()

testStore('MemStore', memStore)
