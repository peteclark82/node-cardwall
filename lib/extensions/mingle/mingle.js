var async = require("async"), request = require('request'), xml2js = require("xml2js");
var xmlParser = new xml2js.Parser();

var helpers = require("../../helpers/helpers.js");

module.exports = function(extConfig) {
	return {
		getCards : getCards
	};
	
	function getCards(options, callback) {
		var url = getCardsApiUrl() +"?mql="+ encodeURIComponent(options.query);
		
		var req = {
			url : url,
			auth : {
				user : extConfig.api.username,
				pass : extConfig.api.password,
			}
		};
		
		request.get(req, function(err, response, data) {
			if (helpers.guard(err, "Unexpected error getting cards from mingle API : "+ url, callback)) {return ;}
			if (helpers.guard((response.statusCode < 200 || response.statusCode > 299), "Error getting cards from mingle API : "+ url +"\nStatus Code : "+ response.statusCode, callback)) {return ;}
			
			var dataJson = JSON.parse(data);
			callback(null, dataJson);
		});
	}

	/* Private Methods */
	function getCardsApiUrl() {
		var url = "http://"+ extConfig.host +":"+ extConfig.port;
		url += "/api/v2/projects/"+ extConfig.project +"/cards/execute_mql.json";
		return url;
	}
};