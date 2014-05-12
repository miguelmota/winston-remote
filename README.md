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

var winstonServer = winstonRemote.createServer({
    port: 9003
});

winstonServer.listen();

// Set up the winston logger transports
winstonServer.logger = new (winston.Logger)({
    transports: [
        new winston.transports.File({ filename: '/var/log/winston/info.log' })
    ]
});
```

Set up your local winston transport that sends the winston logs to the remote server:

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

Afterwards just log as usual:

```javascript
logger.info('foo');
```

and then on your remote server you can check the save logged files:

```bash
cat /var/log/winston/info.log

{"level":"info","message":"foo","timestamp":"2014-05-12T02:56:23.039Z"}
```

## License

Released under the MIT License.
