'use strict';

const constants = require('./ogame_constants');
const universePlayers = require('./lib/universePlayers');
const galaxySearch = require('./lib/galaxySearch');
const planetManager = require('./lib/planetManagement');
const Helpers = require('./lib/helpers.js');

const async = require('async');
const request = require('request');
const RequestPromise = require('request-promise');
const cheerio = require('cheerio');

var cookieJar = request.jar();

ogameManager.prototype.__proto__ = require('events').EventEmitter.prototype;

function ogameManager(universe, username, password, speed) {
    var self = this;

    self.universe = universe;
    self.username = username;
    self.password = password;
    self.universeSpeed = speed;
    self.loggedIn = false;
    self.cookieJar = request.jar();

    self.userPlanets = [];

    //universePlayers.getAllPlayers(true); //Refresh all players
    //universePlayers.getInactivePlayers(); //Get all inactive players with 20k score atleast and max 20k score military

    //self.getOgameUrl('fetchResources', { 'cp': 1 });

    self.tryToLogin();
};
ogameManager.prototype.connectToServer = function() {
    var self = this;
};
ogameManager.prototype.checkIsConnected = function(callback) {
    var self = this;

    return callback();
};

ogameManager.prototype.getOgameUrl = function(page, params) {
    var self = this;

    if (page == 'login') {
        return 'https://pl.ogame.gameforge.com/main/login';
    };

    var url = 'https://s148-pl.ogame.gameforge.com/game/index.php?page=' + page;

    if (params) {
        for (var key in params) {
            url += '&' + key + '=' + params[key];
        };
    };

    return url;
};
ogameManager.prototype.tryToLogin = function(page, params) {
    var self = this;

    request.post({
        url: self.getOgameUrl('login'),
        jar: cookieJar,
        form: {
            'kid': '',
            'uni': self.universe,
            'login': self.username,
            'pass': self.password
        }
    }, function(error, response, body) {
        request.get({
            url: response.headers.location,
            jar: cookieJar
        }, function(error, resopnse, body) {
            Helpers.setCookieJar(cookieJar);

            /*galaxySearch.getGalaxy(1, 10).then(function(data) {
                console.log(data);
            });*/
            planetManager.getBuildings('33812062').then(function(data) {
                console.log(data);
            });
            planetManager.getFacilities('33812062').then(function(data) {
                console.log(data);
            });
            planetManager.getResearch().then(function(data) {
                console.log(data);
            });
            planetManager.getShips('33812062').then(function(data) {
                console.log(data);
            });
            planetManager.getDefense('33812062').then(function(data) {
                console.log(data);
            });

        	self.getPageOverview();
            self.getEventBox(function(data) {
                console.log(data);
            });
        });
    });
};





ogameManager.prototype.getPageOverview = function(cp) {
	var self = this;
    request.get({
        url: self.getOgameUrl('overview'),
        jar: cookieJar
    }, function(error, resopnse, body) {
        var $ = cheerio.load(body);
        if($('meta[name=ogame-session]')[0]) {
        	self.loggedIn = true;
        } else {
        	self.loggedIn = false;
        };


       	$('.smallplanet').each(function(index) {
       		self.userPlanets.push({
       			name: $(this).find('.planet-name').text(),
       			coords: $(this).find('.planet-koords').text(),
       			id: $(this)[0].attribs.id.replace('planet-', ''),
       			resources: {
       				metal: 0,
       				crystal: 0,
       				deuterium: 0,
       				energy: 0
       			}
       		});
       	});
    });
};
ogameManager.prototype.getAllResources = function() {
	var self = this;

	self.userPlanets.forEach((item, index) => {
		request.get({
	        url: self.getOgameUrl('fetchResources', {cp: item.id}),
	        jar: cookieJar
	    }, function(error, resopnse, body) {
	        body = JSON.parse(body);
	        
	        self.userPlanets[index].resources.metal = body.metal.resources.actual;
	        self.userPlanets[index].resources.crystal = body.crystal.resources.actual;
	        self.userPlanets[index].resources.deuterium = body.deuterium.resources.actual;
	        self.userPlanets[index].resources.energy = body.energy.resources.actual;
	    });
	});
};
ogameManager.prototype.getEventBox = function(callback) {
	var self = this;

	request.get({
		url: self.getOgameUrl('fetchEventbox'),
		jar: cookieJar
	}, function(error, resopnse, body) {
		body = JSON.parse(body);
        
        callback(body);
	});
};
ogameManager.prototype.isUnderAttack = function() {
	var self = this;

	var isUnderAttack = self.getEventBox();

	if(isUnderAttack.hostile) return true;

	return false;
};

module.exports = ogameManager;