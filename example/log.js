const winston = require('winston');

const colors = { 
    error: 'bold white redBG',
    warn: 'italic black yellowBG',
    info: 'italic white blueBG',
    http: 'dim green blackBG',
    verbose: 'italic white blackBG',
    debug: 'bold white cyanBG',
    silly: 'underline white blackBG'
};

winston.addColors(colors);

const logger = winston.createLogger({
    level: "silly",
    transports: [
        new winston.transports.Console(),
        new winston.transports.Http({
            host: '127.0.0.1',
            port: 9003
        })
    ]
});

logger.error('foo');
logger.warn('foo');
logger.info('foo');
logger.http('foo');
logger.verbose('foo');
logger.debug('foo');
logger.silly('foo');
