const expect = require('chai').expect

exports.testStore = (name, store) => {
  describe(name, () => {
    before(async () => {
      await store.del('foo')
      await store.del('myid')
    })
    it('should set and get', async () => {
      await store.set('foo', 'bar')
      var result = await store.get('foo')
      expect(result).to.be.equal('bar')
    })

    it('should del', async () => {
      await store.del('foo')
      var result = await store.get('foo')
      expect(result).not.to.be.ok
    })

    it('should incr', async () => {
      var result = await store.incr('myid')
      expect(result).to.be.equal(1)
      result = await store.incr('myid')
      expect(result).to.be.equal(2)
    })
  })
}
