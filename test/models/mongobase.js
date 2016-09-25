const {expect} = require('chai')
const {MongoClient} = require('mongodb')
const MongoBaseModel = require('../../models/mongobase')

const model = new MongoBaseModel()

describe('MongoBaseModel', () => {

  before(async () => {
    const db = await MongoClient.connect('mongodb://localhost/testdb')
    model.init(db.collection('baseModel'))
  })

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

  it('shoud find list', async () => {
    await model.deleteMany()
    await model.create({foo: '1'})
    await model.create({foo: '2'})
    await model.create({foo: '3'})
    var rows = await model.find().toArray()
    expect(rows).to.have.deep.property('[0].foo', '1')
    expect(rows).to.have.deep.property('[1].foo', '2')
    expect(rows).to.have.deep.property('[2].foo', '3')
  })
})
