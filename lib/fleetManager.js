const Helpers = require('./helpers.js');
const RequestPromise = require('request-promise');
const cheerio = require('cheerio');

var fleetManager = {};

var miniFleetToken = null;

fleetManager.sendFleet = function(planetId, coords, mission, ships, resources = null) {

};
fleetManager.quickScan = function(planetId, coords, shipCount) {
	if(!shipCount || !planetId) return;

	RequestPromise.get({
		url: Helpers.getOgameUrl('galaxy'),
		jar: Helpers.getCookieJar()
	}).then(function(data) {
		miniFleetToken = /var miniFleetToken="(.*?)"/g.exec(data)[1];

		RequestPromise.post({
			url: Helpers.getOgameUrl('minifleet', {ajax: 1, cp: planetId}),
			jar: Helpers.getCookieJar(),
			form: {
				mission: 6,
				galaxy: coords.galaxy,
				system: coords.system,
				position: coords.position,
				type: 1,
				shipCount: shipCount,
				speed: 10,
				token: miniFleetToken
			}
		}).then(function(data) {
			data = JSON.parse(data);
			miniFleetToken = data.newToken;

			console.log(data);

			if(!data.response.success) fleetManager.quickScan(planetId, coords, shipCount);
		});
	});
};

module.exports = fleetManager;