const MongoBaseModel = require('./mongobase')

class UserModel extends MongoBaseModel {
  init (collection) {
    this.collection = collection
    this.collection.createIndex({email: 1}, {unique: true}).then()
    this.collection.createIndex({nickname: 1}, {unique: true}).then()
  }

  getByEmail (email) {
    return this.collection.findOne({email: email})
  }

  async getIdByNickName (nickname) {
    const obj = await this.collection.findOne({nickname: nickname}, {_id: 1})
    return obj && obj._id
  }

}

module.exports = UserModel
