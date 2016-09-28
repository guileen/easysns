const KEY_FOLLOWINGS = 'user:followings:'
const KEY_FOLLOWERS = 'user:followers:'

class RelationModel {

  // redis require coRedis
  constructor (redis) {
    this.redis = redis
  }

  // userId  关注  toUserId
  follow (userId, toUserId) {
    return this.redis.multi([
      ['ZADD', KEY_FOLLOWINGS + userId, Date.now(), toUserId],
      ['ZADD', KEY_FOLLOWERS + toUserId, Date.now(), userId]
    ]).exec()
  }

  unfollow (userId, toUserId) {
    if (userId === toUserId) {
      return
    }
    return this.redis.multi([
      ['ZREM', KEY_FOLLOWINGS + userId, toUserId],
      ['ZREM', KEY_FOLLOWERS + toUserId, userId]
    ]).exec()
  }

  async isFollowing (userId, toUserId) {
    if (userId === toUserId) {
      return true
    }
    const rank = await this.redis.zrank(KEY_FOLLOWINGS + userId, toUserId)
    return rank !== null
  }

  getFollowingsCount (userId) {
    return this.redis.zcard(KEY_FOLLOWINGS + userId)
  }

  getFollowersCount (userId) {
    return this.redis.zcard(KEY_FOLLOWERS + userId)
  }

  listFollowers (userId, pageNum = 1, pageSize = 100) {
    return this.redis.zrevrange(KEY_FOLLOWERS + userId, (pageNum - 1) * pageSize, pageNum * pageSize)
  }

  listFollowings (userId, pageNum = 1, pageSize = 100) {
    return this.redis.zrevrange(KEY_FOLLOWINGS + userId, (pageNum - 1) * pageSize, pageNum * pageSize)
  }

}

module.exports = RelationModel
