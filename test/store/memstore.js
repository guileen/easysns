const assert = require('assert')
const MemStore = require('../../store/memstore')

var memStore = new MemStore()

describe('MemStore', function () {
  it('could set', testSet)
  it('could get', testGet)
  it('could incr', testIncr)
  it('could del', testDel)
})

function testSet (done) {
  memStore.set('foo', 'bar', function (err, result) {
    assert(!err, 'should save without error')
    done()
  })
}

function testGet (done) {
  memStore.get('foo', function (err, result) {
    assert(!err, 'should get without error')
    assert.equal(result, 'bar')
    done()
  })
}

function testIncr (done) {
  memStore.incr('id', function (err, result) {
    assert(!err, 'should incr without error')
    assert.equal(result, 1)
    memStore.incr('id', function (err, result) {
      assert(!err, 'should incr without error')
      assert.equal(result, 2)
      done()
    })
  })
}

function testDel (done) {
  memStore.del('foo', function (err, result) {
    assert(!err, 'should del without error')
    memStore.get('foo', function (err, result) {
      assert(!err, 'should del without error')
      assert.equal(result, null)
      done()
    })
  })
}
