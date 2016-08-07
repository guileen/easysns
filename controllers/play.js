module.exports = function (req, res) {
  console.log('Cookie:', req.headers.cookie)
  res.writeHead(200, {
    'Set-Cookie': 'foo1=bar2; HttpOnly'
  })
  res.end()
}
