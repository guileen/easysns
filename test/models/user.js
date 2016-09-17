const {expect} = require('chai')
const {MongoClient} = require('mongodb')
const UserModel = require('../../models/user')

const model = new UserModel()

describe('UserModel', () => {

  before(async () => {
    const db = await MongoClient.connect('mongodb://localhost/testdb')
    model.init(db.collection('user'))
  })

  it('could get by email', async () => {
    const testUser = {email: 'tom@test.com', nickname: 'Tom', password: '1234'}
    const id = await model.create(testUser)
    const user = await model.getByEmail('tom@test.com')
    expect(user.email).to.be.equal(testUser.email)
    expect(user.nickname).to.be.equal(testUser.nickname)
    expect(user.password).to.be.equal(testUser.password)
  })

  it('could not save duplicate email', async () => {
    try {
      const testUser = {email: 'tom1@test.com', nickname: 'Tom', password: '1234'}
      await model.create(testUser)
      await model.create(testUser)
    } catch (e) {
      return
    }
    expect.fail()
  })
})
