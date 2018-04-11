const Helpers = require('./helpers.js');
const cheerio = require('cheerio');
const RequestPromise = require('request-promise');

var messageManager = {};

messageManager.getSpyRaports = function() {
	//parsowanie
};
messageManager.clearSpyRaports = function() {

};

messageManager.sendMessage = function(playerId, message) {
	return RequestPromise.post({
		url: Helpers.getOgameUrl('ajaxChat'),
		jar: Helpers.getCookieJar(),
		headers: {
			'X-Requested-With': 'XMLHttpRequest'
		},
		form: {
			playerId: playerId,
			text: message,
			mode: 1,
			ajax: 1
		}
	}).then(function(data) {
		return Promise.resolve(true);
	});
};
messageManager.sendGroupMessage = function(associationId, message) {
	return RequestPromise.post({
		url: Helpers.getOgameUrl('ajaxChat'),
		jar: Helpers.getCookieJar(),
		headers: {
			'X-Requested-With': 'XMLHttpRequest'
		},
		form: {
			associationId: associationId,
			text: message,
			mode: 3,
			ajax: 1
		}
	}).then(function(data) {
		return Promise.resolve(true);
	});
};

module.exports = messageManager;