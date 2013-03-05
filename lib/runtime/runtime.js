var async = require("async");

var helpers = require("../helpers/helpers.js");
var hookEmitter = require("./hookEmitter.js"), eventEmitter = require("events").EventEmitter;

module.exports = {
	start : start
};

function start(extensions, callback) {
	var hooks = new hookEmitter(), events = new eventEmitter();
	async.forEachSeries(Object.keys(extensions), function(extensionName, next) {
		var extension = extensions[extensionName];
		async.parallel([
			function(pcallback) {
				if (!extension.registerHooks) { pcallback(); } else {
					extension.registerHooks.apply(extensions, [hooks, pcallback]);
				}
			},
			function(pcallback) {
				if (!extension.registerEvents) { pcallback(); } else {
					extension.registerEvents.apply(extensions, [events, pcallback]);
				}
			}
		], next);
	}, function(err) {
		if (helpers.guard(err, callback)) {return;}
		events.emit("beforeStart", {});
		hooks.emit("start", {}, function(err) {
			if (helpers.guard(err, callback)) {return;}
			events.emit("afterStart", {});
			callback();
		});
	});
}