const assert = require('assert')
const MemStore = require('../../store/memstore')
const BaseModel = require('../../models/base')
const runner = require('../runner')

const store = new MemStore()
const model = new BaseModel(store, 'base:')
const obj = {foo: 'bar'}

runner([testCreate, testGet, testDel], function(err) {
  if(!err) {
    console.log('All done');
  }
})

function testCreate(done) {
  model.create(obj, function(err) {
    assert(!err)
    assert(obj.id)
    done()
  })
}

function testGet(done) {
  model.get(obj.id, function(err, result) {
    assert(!err)
    assert.equal(result.foo, 'bar')
    done()
  })
}

function testDel(done) {
  model.del(obj.id, function(err) {
    assert(!err)
    model.get(obj.id, function(err, result) {
      assert(!err)
      assert(!result)
      done()
    })
  })
}
