const winstonRemote = require('../index').Server
const winston = require('winston')

const winstonServer = winstonRemote.createServer({
  host: '127.0.0.1',
  port: 9003
})

const colors = {
  error: 'bold white redBG',
  warn: 'italic black yellowBG',
  info: 'italic white blueBG',
  http: 'dim green blackBG',
  verbose: 'italic white blackBG',
  debug: 'bold white cyanBG',
  silly: 'underline white blackBG'
}

winston.addColors(colors)

winstonServer.logger = winston.createLogger({
  level: 'silly',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.simple(),
    winston.format.printf(
      msg => `[${msg.timestamp}] (${msg.level}): ${msg.message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: [__dirname, '/info.log'].join('') })
  ]
})

winstonServer.listen()
