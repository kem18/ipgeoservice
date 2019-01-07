'use strict';
const geolite = require('../lib/geolite');
const utils = require('../lib/utils');

// =============================================================================
// Route Handler Functions
// =============================================================================

//Geo Location Country Restrictions Handler 
exports.restrictionsHandler = function (req, res) {
    let whitelist = utils.getWhitelistFromRequest(req);

    if (whitelist !== undefined && whitelist.length > 0) {
        //Validate IP
        if (geolite.validateIp(req.params.ip)) {
        
            //Get ISO 3166 country code
            let isoCode = geolite.getCountryISOCode(req.params.ip);

            //Determine if isoCode of customer exists in whitelist
            processCode(isoCode, whitelist, res, req);
        }
        else {
            res.statusCode = 400;
            res.json({
                statusCode: res.statusCode,
                error: 'BAD REQUEST: Invalid IP Address'
            });
        }
    }
    else {
        res.statusCode = 400;
        res.json({
            statusCode: res.statusCode,
            error: 'BAD REQUEST: Invalid whitelist'
        });
    }
}

//BONUS: Geo Location Country Details Handler 
exports.locationDetailsHandler = function (req, res) {

    //Validate IP
    if (geolite.validateIp(req.params.ip)) {
        let location = geolite.getCountryGeoData(req.params.ip);

        if (!location) {
            res.statusCode = 400;
            res.json({ error: 'BAD REQUEST: Invalid IP Address' });
        }
        else {
            // res.send(artist);
            res.json(location);
        }
    } else {
        res.statusCode = 400;
        res.json({ error: 'BAD REQUEST: Invalid IP Address' });
    }
}

// =============================================================================
// Supporting Functions
// =============================================================================

function processCode(isoCode, whitelist, res, req) {
    if (isoCode != undefined && whitelist.indexOf(isoCode) >= 0) {
        //Valid Country
        res.statusCode = 200;
        res.json({
            isoCode,
            ip: `${req.params.ip}`,
            statusCode: res.statusCode,
            message: `ALLOWED: IP address is within the the listed countries`
        });
    }
    else {
        //Forbidden Country
        res.statusCode = 403;
        res.json({
            isoCode,
            ip: `${req.params.ip}`,
            statusCode: res.statusCode,
            message: `FORBIDDEN: IP address not from an allowed country`
        });
    }
}
