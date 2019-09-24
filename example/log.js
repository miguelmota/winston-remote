const winston = require('winston')

const logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.Http({
      host: '127.0.0.1',
      port: 9003
    })
  ]
})

logger.error('foo')
logger.warn('foo')
logger.info('foo')
logger.http('foo')
logger.verbose('foo')
logger.debug('foo')
logger.silly('foo')
