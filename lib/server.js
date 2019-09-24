const net = require('http')
const _ = require('lodash')

function Server (opts) {
  if (!(this instanceof Server)) {
    return new Server(opts)
  }

  const defaults = {
    host: '0.0.0.0',
    port: 9003
  }

  _.extend(this, defaults, opts)
}

Server.prototype.createServer = function () {
  this.server = net.createServer(function (stream) {
    const buffer = []
    stream.on('data', function (chunk) {
      buffer.push(chunk)
    })

    stream.on('end', function () {
      try {
        const log = JSON.parse(buffer.join(''))
        this.logger.log(log.level, log.message)
      } catch (err) {
        console.error(err)
      }
    }.bind(this))

  }.bind(this))

  console.log('Listening on port %d', this.port)
}

Server.prototype.listen = function () {
  this.server.listen(this.port, this.host)
}

module.exports = {
  createServer: function (opts) {
    const server = new Server(opts)
    server.createServer()
    return server
  }
}
