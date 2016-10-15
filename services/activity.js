const models = require('../models')

class ActivityService {
  /*
  constructor (activityModel, userService, relationModel, timelineModel) {
    this.activityModel = activityModel
    this.userService = userService
    this.relationModel = relationModel
    this.timelineModel = timelineModel
  }
  */
  constructor (userService, wsManager) {
    this.userService = userService
    this.wsManager = wsManager
  }

  async getCache (id) {
    // TODO 缓存
    const activity = await models.activity.get(id)
    return await this.normalized(activity)
  }

  async getTimeline (userId, page, pageSize = 50) {
    const ids = await models.timeline.range(userId, page, pageSize)
    return await Promise.all(ids.map(id => this.getCache(id)))
  }

  async publish (activity) {
    if (!activity.userId) {
      throw new Error('require activity.userId')
    }
    activity.userId = models.activity.toId(activity.userId)
    var id = await models.activity.create(activity)
    const atUserNames = this.getAtUser(activity.content)
    if (atUserNames) {
      await Promise.all(atUserNames.map(nickname => this.atUser(nickname)))
    }
    await this.dispatch(activity.userId, id)
    return await this.getCache(id)
  }

  // "111 @a 222 @b @c 123 @d"  ->  [a, b, c, d]
  getAtUser (content) {
    const m = content.match(/@(\S+)(\s|$)/g)
    return m && m.map(s => s.substring(1).trim())
  }

  async atUser (nickname) {
    const userId = await models.user.getIdByNickName(nickname)
    const message = {
      userId: userId,
      type: 'at'
    }
    // const id = await models.notification.create(message)
    // message._id = id
    this.wsManager.send(userId, message)
  }

  async dispatch (userId, activityId) {
    await models.timeline.push(userId, activityId)
    let page = 1
    while (true) {
      let followers = await models.relation.listFollowers(userId, page++, 1000)
      if (followers.length === 0) {
        return
      }
      for (let followerId of followers) {
        await models.timeline.push(followerId, activityId)
      }
    }
  }

  async normalized (activity) {
    if (!activity) return null
    const user = await this.userService.getCache(activity.userId)
    return {
      _id: activity._id,
      content: activity.content,
      user: user
    }
  }
}

module.exports = ActivityService
