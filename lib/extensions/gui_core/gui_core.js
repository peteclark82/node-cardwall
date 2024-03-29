var path = require("path");
var express = require("express");

var helpers = require("../../helpers/helpers.js");

module.exports = function(extConfig) {
	return {
		server : {
			setup : serverSetup
		}
	}
};

function serverSetup(options, callback) {
	var app = options.app;
	
	app.use("assets/guicore/js", express.static(path.join(__dirname, "client/js")));
	app.use("assets/guicore/css", express.static(path.join(__dirname, "client/css")));
	
	callback();
}