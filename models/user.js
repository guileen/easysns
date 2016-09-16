const BaseModel = require('./base')
const PREFIX_EMAIL_TO_ID = 'email-id:'

class UserModel extends BaseModel {
  constructor(store) {
    super(store, 'user:')
  }

  // return Promise (id)
  create(obj) {
    return super.create(obj) // return Promise
    .then((id) => {
      return this.store.set(PREFIX_EMAIL_TO_ID + obj.email, id).then(() => id)
    })
  }

  /*
   * fail with babel async-to-generator
   async create(obj) {
     const id = await super.create(obj)
     await this.store.set(PREFIX_EMAIL_TO_ID + obj.email, id)
     return id
   }
   */

  async getByEmail(email) {
    const id = await this.store.get(PREFIX_EMAIL_TO_ID + email)
    return await this.get(id)
  }
}

module.exports = UserModel
