const RequestPromise = require('request-promise');
const cheerio = require('cheerio');
const util = require('util');

var universePlayers = {};
var allPlayers = {};

universePlayers.getAllPlayers = function(refresh = false) {
	if(!refresh) return allPlayers;

	getAllPlayers()
		.then(getPlayersPlanets)
		.then(getGlobalPointsPlayers)
		.then(getMilitaryPointsPlayers)
		.then(function(self) {
			console.log(util.inspect(universePlayers.getFromGalaxy(universePlayers.getInactivePlayers(), 3), {showHidden: false, depth: null}));
		});
};
universePlayers.getInactivePlayers = function(military = false) {
	if(!allPlayers) return false;
	var toReturn = {};

	Object.keys(allPlayers).filter(function(key, index) {
		if((allPlayers[key].globalScore > 50000 && allPlayers[key].globalScore < 100000)) {
		//if((allPlayers[key].status == 'i' || allPlayers[key].status == 'iI' || allPlayers[key].status == 'I') && !allPlayers[key].militaryScore && allPlayers[key].globalScore > 20000) {
			toReturn[key] = allPlayers[key];
		};
	});

	return toReturn;
};
//dasd
universePlayers.getFromGalaxy = function(players, galaxy) {
	var toReturn = [];

	Object.keys(players).filter(function(key, index) {
		for (var i = 0; i < players[key].planets.length; i++) {
			if(players[key].planets[i].coords[0] == galaxy) {
				toReturn.push(players[key].planets[i].coords);
			};
		};
	});

	return toReturn;
};

function getAllPlayers() {
	return RequestPromise.get({
		url: 'https://s148-pl.ogame.gameforge.com/api/players.xml'
	}).then(function(data) {
		var $ = cheerio.load(data);

		$('player').each(function(index) {
			allPlayers[$(this).attr('id')] = {
				id: $(this).attr('id'),
				status: $(this).attr('status') || null,
				name: $(this).attr('name'),
				planets: [],
				alliance: $(this).attr('alliance') || null
			};
		});

		return Promise.resolve(allPlayers)
	});
};
function getPlayersPlanets() {
	return RequestPromise.get({
		url: 'https://s148-pl.ogame.gameforge.com/api/universe.xml'
	}).then(function(data) {
		var $ = cheerio.load(data);

		$('planet').each(function(index) {
			if(allPlayers[$(this).attr('player')]) {
				allPlayers[$(this).attr('player')].planets.push({
					name: $(this).attr('name'),
					coords: $(this).attr('coords')
				});
			};
		});
		
		return Promise.resolve(allPlayers);
	});
};
function getGlobalPointsPlayers() {
	return RequestPromise.get({
		url: 'https://s148-pl.ogame.gameforge.com/api/highscore.xml?category=1&type=0'
	}).then(function(data) {
		var $ = cheerio.load(data);

		$('player').each(function(index) {
			if(allPlayers[$(this).attr('id')]) {
				allPlayers[$(this).attr('id')].globalScore = parseInt($(this).attr('score'))
			};
		});
		
		return Promise.resolve(allPlayers);
	});
};
function getMilitaryPointsPlayers() {
	return RequestPromise.get({
		url: 'https://s148-pl.ogame.gameforge.com/api/highscore.xml?category=1&type=3'
	}).then(function(data) {
		var $ = cheerio.load(data);

		$('player').each(function(index) {
			if(allPlayers[$(this).attr('id')]) {
				allPlayers[$(this).attr('id')].militaryScore = parseInt($(this).attr('score'))
			};
		});
		
		return Promise.resolve(allPlayers);
	});
};

module.exports = universePlayers;