var util = require('util');
var net = require('net');
var winston = require('winston');
var _ = require('lodash');
var Readable = require('stream').Readable;

function compactObject(obj) {
    _.forOwn(obj, function(val, key) {
       if (_.isEmpty(val)) delete obj[key];
    });
    return obj;
}
_.mixin({'compactObject': compactObject});

function Remote(opts) {
    var defaults = {
        host: '0.0.0.0',
        port: 9003
    };
    _.extend(this, this, opts);
}

util.inherits(Remote, winston.Transport);

Remote.prototype.client = function() {
    var client = net.connect({host: this.host, port: this.port});
    client.on('error', function(err) {
        throw new Error(err);
    });
    return client;
};

Remote.prototype.log = function(level, message, meta, callback) {
    callback = _.isFunction(callback) ? callback : _.noop();

    var log = _.compactObject({level: level, message: message, meta: meta, timestamp: (new Date()).toString()});

    var stream = Readable();
    stream.push([JSON.stringify(log),'\n'].join(''));
    stream.push(null);
    stream.pipe(this.client());

    callback();
};

module.exports = Remote;
