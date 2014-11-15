var winston = require('winston');
var winstonRemoteTransport = require('../index').Transport;

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winstonRemoteTransport)({
            host: '127.0.0.1',
            port: 9003,
            label: 'Client',
            stack: true
        })
    ]
});

logger.info('foo');
