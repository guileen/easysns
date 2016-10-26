const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const numWorkers = Number(process.env.WORKERS) || numCPUs

if (cluster.isMaster) {
  // 需要在Master中执行的代码
  // Fork numWorkers.
  for (var i = 0; i < numWorkers; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
  })
} else {
  // 需要在 worker 中执行的代码
  require('./run')
}
