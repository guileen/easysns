const {MongoClient} = require('mongodb')
const {expect} = require('chai')

describe('Mongo', () => {
  let db
  before(async () => {
    db = await MongoClient.connect('mongodb://localhost/testdb')
    await db.dropDatabase()
  })

  it('should insert and find document', async () => {
    const fooColl = db.collection('foo')
    const insertResult = await fooColl.insertOne({foo: 'bar'})
    const result = await fooColl.findOne({_id: insertResult.insertedId})
    expect(result.foo).to.equal('bar')
  })
})
