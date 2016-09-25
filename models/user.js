const MongoBaseModel = require('./mongobase')

class UserModel extends MongoBaseModel {
  init (collection) {
    this.collection = collection
    this.collection.createIndex({email: 1}, {unique: true}).then()
  }

  getByEmail (email) {
    return this.collection.findOne({email: email})
  }

}

module.exports = UserModel
