const expect = require('chai').expect
const MemStore = require('../../store/memstore')
const BaseModel = require('../../models/base')

const store = new MemStore()
const model = new BaseModel(store, 'base:')

describe('BaseModel', () => {
  it('should create without error', async () => {
    const id = await model.create({foo: 'bar'})
    expect(id).to.be.ok
  })

  it('should get by id', async () => {
    const id = await model.create({foo: 'bar'})
    const result = await model.get(id)
    expect(result).to.be.ok
    expect(result.foo).to.equal('bar')
  })

  it('should get nothing after delete', async () => {
    const id = await model.create({foo: 'bar'})
    await model.del(id)
    const result = await model.get(id)
    expect(result).not.to.be.ok
  })
})
