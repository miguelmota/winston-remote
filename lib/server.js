const net = require('http');
const fs = require('fs');
const _ = require('lodash');

function Server(opts) {
    if (!(this instanceof Server)) {
        return new Server(opts);
    }

    const defaults = {
        host: '0.0.0.0',
        port: 9003
    };

    _.extend(this, defaults, opts);

/*
    this.filename = [__dirname,'/','winston.log'].join('');

    fileExists(this.filename, function(exists) {
        if (!exists) createFile(this.filename);
    }.bind(this));
*/
}

function fileExists(filepath, cb) {
    if (!_.isString(filepath)) throw new TypeError('Filepath must be a string');
    if (!_.isFunction(cb)) throw new TypeError('Missing callback function');
    fs.exists(filepath, function(exists) {
        cb(exists);
    });
}

function createFile(filepath, cb) {
    if (!_.isString(filepath)) throw new TypeError('Filepath must be a string');
    cb = _.isFunction(cb) ? cb : _.noop();
    fs.writeFile(filepath, null, function(err) {
        if (err) cb(err);
        cb();
    });
}

Server.prototype.createServer = function() {

    this.server = net.createServer(function(stream) {
        let buffer = [];
        stream.on('data', function(chunk) {
            buffer.push(chunk);
        }.bind(this));

        stream.on('end', function() {
            try {
                let log = JSON.parse(buffer.join(''));
                this.logger.log(log.level,log.message)
                //winston.Logger.prototype.log.apply(this.logger, _(log).chain().pick('level','message','meta').values().value());
            } catch(err) {
                console.error(err);
            }
        }.bind(this));

        //stream.pipe(fs.createWriteStream(this.filename, {flags: 'a'}));

    }.bind(this));

    console.log('Listening on port %d', this.port);
};

Server.prototype.listen = function() {
    this.server.listen(this.port, this.host);
};

module.exports = {
    createServer: function(opts) {
        const server = new Server(opts);
        server.createServer();
        return server;
    }
};
