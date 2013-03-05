#!/usr/bin/env node

var path = require("path");
var colors = require("colors"), optimist = require("optimist");

var cardwall = require("../lib/cardwall.js");

var cli = createCli();
var args = cli.argv;

if (args.help === true) { cli.showHelp(); } else {
	loadConfiguration(path.resolve(process.cwd(), args.config), function(err, configFunc) {
		if (cardwall.helpers.guard(err)) {return; }
		var config = configFunc();
		cardwall.server.start(config);
	});
}

/* Private Functions */
function createCli() {
	return optimist
		.usage('Executes cardwall using the specified configuration.'.bold.yellow + '\nUsage: $0 -c <config>'.yellow)
		.default('h', false).boolean('h').alias('h', 'help').describe('h', 'Shows the usage information')
    .demand('c').string('c').alias('c', 'config').describe('c', 'Configuration file describing cardwall environment');
}

function loadConfiguration(configFile, callback) {
	if (path.extname(configFile) == "") { configFile += ".js"; }
	var config = null;
	try { config = require(configFile); } catch(err) {
		cardwall.helpers.guard(err, "Error loading configuration file : " + configFile, callback);
	}
	if (config !== null) { callback(null, config); } 
}