constants = {
    Buildings: {
        'MetalMine': 1, //Kopalnia metalu
        'CrystalMine': 2, //Kopalnia krysztalu
        'DeuteriumSynthesizer': 3, //Ekstraktor deuteru
        'SolarPlant': 4, //Elektrownia sloneczna
        'FusionReactor': 12, //Elektrownia fuzyjna
        'MetalStorage': 22, //Magazyn metalu
        'CrystalStorage': 23, //Magazyn krysztalu
        'DeuteriumTank': 24 //Zbiornik deuteru
    },
    Facilities: {
        'AllianceDepot': 34, //Depozyt sojuszniczy
        'RoboticsFactory': 14, //Fabryka robotw
        'Shipyard': 21, //Stocznia
        'ResearchLab': 31, //Laboratorium badawcze
        'MissileSilo': 44, //Silos rakietowy
        'NaniteFactory': 15, //Fabryka nanitow
        'Terraformer': 33, //Terraformer
        'SpaceDock': 36 //Dok kosmiczny
    },
    Defense: {
        'RocketLauncher': 401, //Wyrzutnia rakiet
        'LightLaser': 402, //Lekkie dzialo laserowe
        'HeavyLaser': 403, //Ciezkei dzialo laserowe
        'GaussCannon': 404, //Dzialo gaussa
        'IonCannon': 405, //Dzialo jonowe
        'PlasmaTurret': 406, //Wyrzutnia plazmy
        'SmallShieldDome': 407, //Mala powloka ochronna
        'LargeShieldDome': 408, //Duza powloka ochronna
        'AntiBallisticMissiles': 502, //Przeciwrakieta
        'InterplanetaryMissiles': 503 //Rakieta miedzyplanetarna
    },
    Ships: {
        'SmallCargo': 202, //Maly transporter
        'LargeCargo': 203, //Duzy transporter
        'LightFighter': 204, //Lekki mysliwiec
        'HeavyFighter': 205, //Ciezki mysliwiec
        'Cruiser': 206, //Krazownik
        'Battleship': 207, //Okret wojenny
        'ColonyShip': 208, //Statek kolonizacyjny
        'Recycler': 209, //Recykler
        'EspionageProbe': 210, //Sonda szpiegowska
        'Bomber': 211, //Bombowiec
        'SolarSatellite': 212, //Satelita sloneczna
        'Destroyer': 213, //Niszczyciel
        'Deathstar': 214, //Gwiazda smierci
        'Battlecruiser': 215 //Pancernik
    },
    Research: {
        'EspionageTechnology': 106,
        'ComputerTechnology': 108,
        'WeaponsTechnology': 109,
        'ShieldingTechnology': 110,
        'ArmourTechnology': 111,
        'EnergyTechnology': 113,
        'HyperspaceTechnology': 114,
        'CombustionDrive': 115,
        'ImpulseDrive': 117,
        'HyperspaceDrive': 118,
        'LaserTechnology': 120,
        'IonTechnology': 121,
        'PlasmaTechnology': 122,
        'IntergalacticResearchNetwork': 123,
        'Astrophysics': 124,
        'GravitonTechnology': 199
    },
    Speed: {
        '10%': 1,
        '20%': 2,
        '30%': 3,
        '40%': 4,
        '50%': 5,
        '60%': 6,
        '70%': 7,
        '80%': 8,
        '90%': 9,
        '100%': 10
    },
    Missions: {
        'Attack': 1,
        'GroupedAttack': 2,
        'Transport': 3,
        'Park': 4,
        'ParkInThatAlly': 5,
        'Spy': 6,
        'Colonize': 7,
        'RecycleDebrisField': 8,
        'Destroy': 9,
        'Expedition': 15
    }
}

module.exports = constants;