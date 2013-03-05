var express = require("express");

var helpers = require("../helpers/helpers.js");
var webServer = require("./webServer.js");

module.exports = {
	start : start
};

function start(config, callback) {
	var app = express();
	
	webServer.start({ config : config, app : app }, function(err) {
		if (helpers.guard(err, callback)) {return;}
		
		helpers.log("event", "Server listening on port : "+ config.server.port);
		app.listen(config.server.port, callback);
	});
}