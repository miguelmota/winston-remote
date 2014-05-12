var winston = require('winston');
var winstonRemote = require('../index').Transport;

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winstonRemote)({
            host: '127.0.0.1',
            port: 9003
        })
    ]
});

logger.info('foo');
