const expect = require('chai').expect
const MemStore = require('../../store/memstore')
const UserModel = require('../../models/user')
const assert = require('assert')

const store = new MemStore()
const model = new UserModel(store)

describe('UserModel', () => {
  it('could get by email', async () => {
    const testUser = {email: 'tom@test.com', nickname: 'Tom', password: '1234'}
    const id = await model.create(testUser)
    const user = await model.getByEmail('tom@test.com')
    expect(user.email).to.be.equal(testUser.email)
    expect(user.nickname).to.be.equal(testUser.nickname)
    expect(user.password).to.be.equal(testUser.password)
  })
})
