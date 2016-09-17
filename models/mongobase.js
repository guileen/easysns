const {ObjectID} = require('mongodb')

class MongoBaseModel {
  init(collection) {
    this.collection = collection
  }

  toId (id) {
    if (id instanceof ObjectID) {
      return id
    }
    return new ObjectID(id)
  }

  async create (obj) {
    const insertResult = await this.collection.insertOne(obj)
    return insertResult && insertResult.insertedId
  }

  async get (id) {
    return await this.collection.findOne({_id: this.toId(id)})
  }

  async update (id, obj) {
    return await this.collection.updateOne({_id: this.toId(id)}, obj)
  }

  async updatePart(id, part) {
    return await this.collection.updateOne({_id: this.toId(id)}, {$set: part})
  }

  async del(id) {
    return await this.collection.deleteOne({_id: this.toId(id)})
  }
}

module.exports = MongoBaseModel
