var express = require("express");

var helpers = require("../../helpers/helpers.js");

module.exports = function(extConfig) {
	return {
		registerHooks : registerHooks
	};
	
	function registerHooks(hookEmitter, callback) {
		var app = null;
		
		hookEmitter.on("start", start);
		
		callback();
		
		function start(options, callback) {
			app = express();
			
			hookEmitter.emit("webserver.registerRoutes", { app : app }, function(err) {
				if (helpers.guard(err, callback)) {return;}
				
				helpers.log("event", "Server listening on port : "+ extConfig.port);
				app.listen(extConfig.port, callback)
			});
		}
	}
};