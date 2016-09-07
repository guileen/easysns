function BaseModel (store, prefix) {
  this.store = store
  this.prefix = prefix
}

module.exports = BaseModel

BaseModel.prototype.create = function (obj, callback) {
  obj.id = obj.id || Date.now()
  this.store.set(this.prefix + obj.id, obj, callback)
}

BaseModel.prototype.get = function (id, callback) {
  this.store.get(this.prefix + id, callback)
}

BaseModel.prototype.update = function (id, obj, callback) {
  this.store.set(this.prefix + id, obj, callback)
}

BaseModel.prototype.updatePart = function (id, part, callback) {
  const self = this
  this.get(id, function (err, result) {
    if (err || !result) {
      callback(err, result)
    }
    Object.assign(result, part)
    self.update(id, result, callback)
  })
}

BaseModel.prototype.del = function (id, callback) {
  this.store.del(this.prefix + id, callback)
}
