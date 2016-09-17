const joinPath = require('path').join
const models = require('../models')
const multiparty = require('multiparty')
const uploadDir = joinPath(__dirname, '../data/upload')
const parseMultipart = (req, opts) => new Promise((resolve, reject) => {
  const form = new multiparty.Form(opts)
  form.parse(req, (err, fields, files) => {
    if (err) {
      reject(err)
    } else {
      resolve(files)
    }
  })
})

// POST /my/avatar
module.exports = async (ctx) => {
  const userId = ctx.session.userId
  if (!userId) {
    ctx.body = {}
    return
  }
  const files = await parseMultipart(ctx.req, {
    uploadDir: uploadDir
  })
  var newPath = files.file[0].path.replace(uploadDir, '')
  var url = 'http://localhost:3000/upload' + newPath
  await models.user.updatePart(userId, {avatar: url})
  ctx.body = {
    avatar: url
  }
}
