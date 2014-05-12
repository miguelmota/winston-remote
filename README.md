# Winston Remote v0.0.1

Stream your [winston](https://github.com/flatiron/winston) logs to a remote winston server.

## Install

Available via [npm](https://www.npmjs.org/)

```bash
npm install winston-remote
```

## Usage

Set up your remote winston server:

```javascript
var winston = require('winston');
var winstonRemote = require('winston-remote').Server;

winstonServer = winstonRemote.createServer({
    port: 9003
});

winstonServer.listen();

// How you want to save the incoming winston logs
winstonServer.logger = new (winston.Logger)({
    transports: [
        new winston.transports.File({ filename: '/usr/local/var/log/winston/info.log' })
    ]
});
```

Set up your local winston transport:

```javascript
var winston = require('winston');
var winstonRemote = require('winston-remote').Transport;

var logger = new (winston.Logger)({
    transports: [
        new (winstonRemote)({
            host: '0.0.0.0', // remote server ip
            port: 9003 // remote server port
        })
    ]
});
```

Log as usual:

```javascript
logger.info('foo', {bar: 'qux'});
```

## License

Released under the MIT License.
