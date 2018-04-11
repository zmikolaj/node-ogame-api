const Helpers = require('./helpers.js');
const cheerio = require('cheerio');
const RequestPromise = require('request-promise');

var planetManager = {};

planetManager.getBuildings = function(planetId) {
	return RequestPromise.post({
		url: Helpers.getOgameUrl('resources', {cp: planetId}),
		jar: Helpers.getCookieJar()
	}).then(function(data) {
		var $ = cheerio.load(data);


		return Promise.resolve({
			MetalMine: parseInt($('div.supply1').find('span.level').text().replace( /^\D+/g, '')),
			CrystalMine: parseInt($('div.supply2').find('span.level').text().replace( /^\D+/g, '')),
			DeuteriumSynthesizer: parseInt($('div.supply3').find('span.level').text().replace( /^\D+/g, '')),
			SolarPlant: parseInt($('div.supply4').find('span.level').text().replace( /^\D+/g, '')),
			FusionReactor: parseInt($('div.supply12').find('span.level').text().replace( /^\D+/g, '')),
			SolarSatellite: parseInt($('div.supply212').find('span.level').text().replace( /^\D+/g, '')),
			MetalStorage: parseInt($('div.supply22').find('span.level').text().replace( /^\D+/g, '')),
			CrystalStorage: parseInt($('div.supply23').find('span.level').text().replace( /^\D+/g, '')),
			DeuteriumTank: parseInt($('div.supply24').find('span.level').text().replace( /^\D+/g, ''))
		});
	});
};
planetManager.getFacilities = function(planetId) {
	return RequestPromise.post({
		url: Helpers.getOgameUrl('station', {cp: planetId}),
		jar: Helpers.getCookieJar()
	}).then(function(data) {
		var $ = cheerio.load(data);


		return Promise.resolve({
			RoboticsFactory: parseInt($('div.station14').find('span.level').text().replace( /^\D+/g, '')),
			Shipyard: parseInt($('div.station21').find('span.level').text().replace( /^\D+/g, '')),
			ResearchLab: parseInt($('div.station31').find('span.level').text().replace( /^\D+/g, '')),
			AllianceDepot: parseInt($('div.station34').find('span.level').text().replace( /^\D+/g, '')),
			MissileSilo: parseInt($('div.station44').find('span.level').text().replace( /^\D+/g, '')),
			NaniteFactory: parseInt($('div.station15').find('span.level').text().replace( /^\D+/g, '')),
			Terraformer: parseInt($('div.station33').find('span.level').text().replace( /^\D+/g, '')),
			SpaceDock: parseInt($('div.station36').find('span.level').text().replace( /^\D+/g, '')),
		});
	});
};
planetManager.getResearch = function() {
	return RequestPromise.post({
		url: Helpers.getOgameUrl('research'),
		jar: Helpers.getCookieJar()
	}).then(function(data) {
		var $ = cheerio.load(data);


		return Promise.resolve({
			EnergyTechnology: parseInt($('div.research113').find('span.level').text().replace( /^\D+/g, '')),
			LaserTechnology: parseInt($('div.research120').find('span.level').text().replace( /^\D+/g, '')),
			IonTechnology: parseInt($('div.research121').find('span.level').text().replace( /^\D+/g, '')),
			HyperspaceTechnology: parseInt($('div.research114').find('span.level').text().replace( /^\D+/g, '')),
			PlasmaTechnology: parseInt($('div.research122').find('span.level').text().replace( /^\D+/g, '')),
			CombustionDrive: parseInt($('div.research115').find('span.level').text().replace( /^\D+/g, '')),
			ImpulseDrive: parseInt($('div.research117').find('span.level').text().replace( /^\D+/g, '')),
			HyperspaceDrive: parseInt($('div.research118').find('span.level').text().replace( /^\D+/g, '')),
			EspionageTechnology: parseInt($('div.research106').find('span.level').text().replace( /^\D+/g, '')),
			ComputerTechnology: parseInt($('div.research108').find('span.level').text().replace( /^\D+/g, '')),
			Astrophysics: parseInt($('div.research124').find('span.level').text().replace( /^\D+/g, '')),
			IntergalacticResearchNetwork: parseInt($('div.research123').find('span.level').text().replace( /^\D+/g, '')),
			GravitonTechnology: parseInt($('div.research199').find('span.level').text().replace( /^\D+/g, '')),
			WeaponsTechnology: parseInt($('div.research109').find('span.level').text().replace( /^\D+/g, '')),
			ShieldingTechnology: parseInt($('div.research110').find('span.level').text().replace( /^\D+/g, '')),
			ArmourTechnology: parseInt($('div.research111').find('span.level').text().replace( /^\D+/g, ''))
		});
	});
};
planetManager.getShips = function(planetId) {
	return RequestPromise.post({
		url: Helpers.getOgameUrl('shipyard', {cp: planetId}),
		jar: Helpers.getCookieJar()
	}).then(function(data) {
		var $ = cheerio.load(data);


		return Promise.resolve({
			LightFighter: parseInt($('div.military204').find('span.level').text().replace( /^\D+/g, '')),
			HeavyFighter: parseInt($('div.military205').find('span.level').text().replace( /^\D+/g, '')),
			Cruiser: parseInt($('div.military206').find('span.level').text().replace( /^\D+/g, '')),
			Battleship: parseInt($('div.military207').find('span.level').text().replace( /^\D+/g, '')),
			Battlecruiser: parseInt($('div.military215').find('span.level').text().replace( /^\D+/g, '')),
			Bomber: parseInt($('div.military211').find('span.level').text().replace( /^\D+/g, '')),
			Destroyer: parseInt($('div.military213').find('span.level').text().replace( /^\D+/g, '')),
			Deathstar: parseInt($('div.military214').find('span.level').text().replace( /^\D+/g, '')),
			SmallCargo: parseInt($('div.civil202').find('span.level').text().replace( /^\D+/g, '')),
			LargeCargo: parseInt($('div.civil203').find('span.level').text().replace( /^\D+/g, '')),
			ColonyShip: parseInt($('div.civil208').find('span.level').text().replace( /^\D+/g, '')),
			Recycler: parseInt($('div.civil209').find('span.level').text().replace( /^\D+/g, '')),
			EspionageProbe: parseInt($('div.civil210').find('span.level').text().replace( /^\D+/g, '')),
			SolarSatellite: parseInt($('div.civil212').find('span.level').text().replace( /^\D+/g, ''))
		});
	});
};
planetManager.getDefense = function(planetId) {
	return RequestPromise.post({
		url: Helpers.getOgameUrl('defense', {cp: planetId}),
		jar: Helpers.getCookieJar()
	}).then(function(data) {
		var $ = cheerio.load(data);


		return Promise.resolve({
			RocketLauncher: parseInt($('div.defense401').find('span.level').text().replace( /^\D+/g, '')),
			LightLaser: parseInt($('div.defense402').find('span.level').text().replace( /^\D+/g, '')),
			HeavyLaser: parseInt($('div.defense403').find('span.level').text().replace( /^\D+/g, '')),
			GaussCannon: parseInt($('div.defense404').find('span.level').text().replace( /^\D+/g, '')),
			IonCannon: parseInt($('div.defense405').find('span.level').text().replace( /^\D+/g, '')),
			PlasmaTurret: parseInt($('div.defense406').find('span.level').text().replace( /^\D+/g, '')),
			SmallShieldDome: parseInt($('div.defense407').find('span.level').text().replace( /^\D+/g, '')),
			LargeShieldDome: parseInt($('div.defense408').find('span.level').text().replace( /^\D+/g, '')),
			AntiBallisticMissiles: parseInt($('div.defense502').find('span.level').text().replace( /^\D+/g, '')),
			InterplanetaryMissiles: parseInt($('div.defense503').find('span.level').text().replace( /^\D+/g, ''))
		});
	});
};


module.exports = planetManager;