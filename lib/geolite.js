'use strict';
const maxmind = require('maxmind');
const fs = require('fs');

// =============================================================================
// GeoLite Settings
// =============================================================================
const GEOLITE2_DATABASE_FILE = process.env.GEOLITE2_DATABASE_FILE || './geodata/GeoLite2-Country.mmdb';

// =============================================================================
// GeoLite Functions
// =============================================================================
exports.geoliteFileExists = function () {

    if (fs.existsSync(GEOLITE2_DATABASE_FILE)) {
        return true;
    }

    return false;
}

//Get country location information by ip address
exports.getCountryGeoData = function (ip) {

    //Confirm data file exists
    if (this.geoliteFileExists()) {
        //GeoLite Options 
        let opts = {
            watchForUpdates: true,
            watchForUpdatesHook: () => { console.log('GeoLite2 database file updated!'); },
        };

        // NOTES: 
        //  Resyncs data on db file updates
        //  FUTURE ENHANCEMENT: Keep the mapping data up to date w/ external cron/rsync script or related mechanism to pull latest mmdb file from a geolite repo
        //  REMOTE LOCATION - https://geolite.maxmind.com/download/geoip/database/GeoLite2-City.tar.gz
        let countryLookup = maxmind.openSync(GEOLITE2_DATABASE_FILE, opts);

        //Retrieve country data by ip
        let country = countryLookup.get(ip);

        return country;

    } else {
        let errorMsg = 'Geolite database file does not exist';

        console.log(errorMsg);
        throw new Error(errorMsg);
    }
};

//Get ISO 3166 country code by ip address
exports.getCountryISOCode = function (ip) {
    let isoCode;

    //Validate IP
    if (this.validateIp(ip)) {

        //Get Country Geo Location Data
        let location = this.getCountryGeoData(ip);

        console.log('getCountryISOCode() Location: ', location);

        //Get Country ISO Code or Continent Code
        if (location != undefined) {
            if (location["country"] != undefined) {
                //Country Support
                isoCode = location["country"].iso_code;
            } else if (location["continent"] != undefined) {
                //European Continent Support
                isoCode = location["continent"].code;
            }
        }
    }

    return isoCode;
};

//Validate ip address
exports.validateIp = function (ip) {
    //Supports validation for both IPv4 and IPv6
    return maxmind.validate(ip);
}