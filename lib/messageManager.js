const Helpers = require('./helpers.js');
const cheerio = require('cheerio');
const RequestPromise = require('request-promise');

const ogameConstants = require('./ogameConstants.js');

var messageManager = {};

messageManager.getSpyRaports = function() {
	return RequestPromise.post({
		url: Helpers.getOgameUrl('messages', {tab: 20, ajax: 1}),
		jar: Helpers.getCookieJar()
	}).then(function(data) {
		var $ = cheerio.load(data);
		var spyRaports = [];

		$('li.msg').each(function(index) {
			if($(this).find('span.espionageDefText').length) return;

			if($(this).find('span.msg_date.fright').length) {
				messageDate = new Date($(this).find('span.msg_date.fright').text());
			} else {
				messageDate = new Date('1.1.2016 00:00:00');
			};

			planetInfo = $(this).find('a.txt_link').text();
			planetName = planetInfo.split('[')[0].trim();
			coordsData = planetInfo.split('[');

			if(coordsData.length <= 1) return;

			planetCoords = coordsData[1].split(']')[0].trim();

			playerNode = $(this).find('span.status_abbr_longinactive');

			if(playerNode.length) {
				playerName = $(playerNode).text().trim();
				//playerState = ogameConstants.PlayerState.Inactive;
				playerState = 2;
			} else {
				playerName = 'unknown';
				//playerState = ogameConstants.PlayerState.Active;
				playerState = 1;
			};

			messageContent = $(this).find('div.compacting');

			if(messageContent.length > 0) {
				resourcesRow = messageContent[1];
				resourcesData = $(resourcesRow).find('span.resspan');
				resources = null;

				if(resourcesData.length) {
					resources = {
						metal: parseInt(resourcesData[0].innerHTML.split(':')[1].trim().replace('.', '').replace(',', '').replace('M', '000')),
						crystal: parseInt(resourcesData[1].innerHTML.split(':')[1].trim().replace('.', '').replace(',', '').replace('M', '000')),
						deuterium: parseInt(resourcesData[2].innerHTML.split(':')[1].trim().replace('.', '').replace(',', '').replace('M', '000'))
					}
				};

				loot = parseInt(/ (\d+)/g.exec(messageContent[2].innerHTML)[1]); //2 szansa na przechwycenie sond

				if(messageContent[3].getElementsByClassName('tooltipLeft')[0]) {
					fleet = parseInt(messageContent[3].getElementsByClassName('tooltipLeft')[0].innerHTML.split(':')[1].trim().replace('.', '').replace(',', '').replace('M', '000'));
				} else {
					fleet = null;
				};
				if(messageContent[3].getElementsByClassName('tooltipRight')[0]) {
					defenses = parseInt(messageContent[3].getElementsByClassName('tooltipRight')[0].innerHTML.split(':')[1].trim().replace('.', '').replace(',', '').replace('M', '000'));
				} else {
					defenses = null;
				};
			} else {
				fleet, defenses, resources, loot = null;
			};

			spyRaports.push({
				planetName: planetName,
				playerName: playerName,
				playerState: playerState,
				planetCoords: planetCoords,
				resources: resources,
				defenses: defenses,
				fleet: fleet,
				lootPercentage: loot,
				loot: {
					metal: resources.metal * parseFloat('0.'+loot),
					crystal: resources.crystal * parseFloat('0.'+loot),
					deuterium: resources.deuterium * parseFloat('0.'+loot)
				},
				raportTime: messageDate
			});
		});
		console.log(spyRaports);
		return Promise.resolve(spyRaports);
	});
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