const Helpers = require('./helpers.js');
const RequestPromise = require('request-promise');
const cheerio = require('cheerio');

var galaxySearch = {};

galaxySearch.getGalaxy = function(galaxy, system) {
	return RequestPromise.post({
		url: Helpers.getOgameUrl('galaxyContent', {ajax: 1}),
		jar: Helpers.getCookieJar(),
		form: {
			galaxy: galaxy,
			system: system
		}
	}).then(function(data) {
		var data = JSON.parse(data);
		var $ = cheerio.load('<!DOCTYPE html><html><body>'+data.galaxy+'</body></html>');
		var planets = [];

		$('tr.row').each(function(index) {
			if($(this).hasClass('empty_filter')) return;

			if($(this).find('.activity').length > 0) {
				var activityRaw = $(this).find('.activity').text().trim();
			};

			var toolTip = $(this).find('.htmlTooltip');
			var planetCoords = /\[(\d+):(\d+):(\d+)\]/g.exec($(toolTip).find('#pos-planet').text()) //1, 2, 3 bez 0

			var planetInfo = {
				activity: activityRaw || 0,
				name: $(toolTip).find('h1').first().find('span').text(),
				coordinate: {
					galaxy: parseInt(planetCoords[1]),
					system: parseInt(planetCoords[2]),
					position: parseInt(planetCoords[3])
				}
			};
			if(toolTip.length > 2) {
				for (var i = 1; i < 4; i++) {
					var playerTooltip = toolTip[i];

					if($(playerTooltip).attr('id').startsWith('debris') || $(playerTooltip).attr('id').startsWith('moon')) continue;
					
					planetInfo.player = {
						id: /(\d+)/g.exec($(playerTooltip).attr('id'))[1],
						name: $(playerTooltip).find('h1').find('span').text().trim(),
						rank: parseInt($(playerTooltip).find('li.rank').find('a').text())
					};

					break;
				}
			} else if(toolTip.length > 1) {
				var playerTooltip = toolTip[1];

				planetInfo.player = {
					id: /(\d+)/g.exec($(playerTooltip).attr('id'))[1],
					name: $(playerTooltip).find('h1').find('span').text().trim(),
					rank: parseInt($(playerTooltip).find('li.rank').find('a').text())
				};
			} else {
				planetInfo.player = {
					id: null,
					name: $(this).find('.playername').find('span').text().trim(),
					rank: null
				};
			};
			planets.push(planetInfo);
		});
		return Promise.resolve(planets);
	});
};

module.exports = galaxySearch;