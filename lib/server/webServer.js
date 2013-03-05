var helpers = require("../helpers/helpers.js");

module.exports = {
	start : start
};

function start(options, callback) {
	var app = options.app;
	
	app.get(/\//, indexController);
	
	callback();
	
	/* Controllers */
	function indexController(req, res) {
		res.end("hi");
	}
}