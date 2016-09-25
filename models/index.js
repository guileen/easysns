const {MongoClient} = require('mongodb')
const redis = require('redis')
const redisWrapper = require('co-redis')

const redisClient = redis.createClient('redis://localhost:6379')
const redisCo = redisWrapper(redisClient)

const UserModel = require('./user')
const ActivityModel = require('./activity')
const RelationModel = require('./relation')
const TimelineModel = require('./timeline')

exports.user = new UserModel()
exports.activity = new ActivityModel()
exports.relation = new RelationModel(redisCo)
exports.timeline = new TimelineModel(redisCo)

MongoClient.connect('mongodb://localhost/easysns')
.then(db => {
  exports.user.init(db.collection('user'))
  exports.activity.init(db.collection('activity'))
})
