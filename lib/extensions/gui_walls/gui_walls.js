var async = require("async");

var helpers = require("../../helpers/helpers.js");

module.exports = function(extConfig) {
	return {
		registerHooks : registerHooks
	};
	
	function registerHooks(hookEmitter, callback) {
		var extensions = this;
		
		hookEmitter.on("webserver.registerRoutes", registerRoutes);
		
		callback();
		
		function registerRoutes(options, callback) {
			var app = options.app;

			async.forEachSeries(Object.keys(extConfig), function(wallName, nextWall) {
				var wall = extConfig[wallName];
				var extension = extensions[wall.extension];
				
				var urlPattern = new RegExp("^/walls/"+ wallName +"(/.+){0,1}$");
				
				app.all(urlPattern, wallsController);
				
				nextWall();
				
				function wallsController(req, res) {
					var wallConfig = wall.config;
					if (wallConfig instanceof Function) {
						wallConfig = wallConfig(req.url);
					}
					
					extension.getCards(wallConfig, function(err, data) {
						if (err) {
							helpers.log("error", err);
						} else {
							console.log(data);
							res.end("Hello world!");
						}
					});
				}
			}, callback);
		}
	}
};