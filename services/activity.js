class ActivityService {
  constructor (activityModel, userService, relationModel, timelineModel) {
    this.activityModel = activityModel
    this.userService = userService
    this.relationModel = relationModel
    this.timelineModel = timelineModel
  }

  async getCache (id) {
    // TODO 缓存
    const activity = await this.activityModel.get(id)
    return await this.normalized(activity)
  }

  async getTimeline (userId, page, pageSize = 50) {
    const ids = await this.timelineModel.range(userId, page, pageSize)
    return await Promise.all(ids.map(id => this.getCache(id)))
  }

  async publish (activity) {
    if (!activity.userId) {
      throw new Error('require activity.userId')
    }
    activity.userId = this.activityModel.toId(activity.userId)
    var id = await this.activityModel.create(activity)
    await this.dispatch(activity.userId, id)
    return await this.getCache(id)
  }

  async dispatch (userId, activityId) {
    await this.timelineModel.push(userId, activityId)
    let page = 1
    while (true) {
      let followers = await this.relationModel.listFollowers(userId, page++, 1000)
      if (followers.length === 0) {
        return
      }
      for (let followerId of followers) {
        await this.timelineModel.push(followerId, activityId)
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
