class UserService {
  constructor (userModel, relationModel) {
    this.userModel = userModel
    this.relationModel = relationModel
  }

  async getCache (id, selfUserId) {
    // TODO 缓存
    const user = await this.userModel.get(id)
    return await this.normalized(user, selfUserId)
  }

  async normalized (user, selfUserId) {
    if (!user) return null
    let isFollowing = false
    let userId = user._id.toString()
    if (selfUserId) {
      isFollowing = await this.relationModel.isFollowing(selfUserId, userId)
    }
    return {
      _id: userId,
      nickname: user.nickname,
      avatar: user.avatar || '/static/img/nodejs.png',
      isFollowing: isFollowing
    }
  }

  normalizedList (users, selfUserId) {
    return Promise.all(users.map(user => this.normalized(user, selfUserId)))
  }
}

module.exports = UserService
