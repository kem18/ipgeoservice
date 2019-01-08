'use strict';
const constants = require('../config/constants');

// =============================================================================
// Utility Functions
// =============================================================================
exports.getWhitelistFromRequest = function (req) {

    //Validate whitelist
    if (req.query !== undefined) {
        try {
            let whitelist = JSON.parse(req.query.whitelist);
            return whitelist;
        } catch (e) {
            throw new Error('Unable to parse whitelist from request');
        }
    }
};

exports.upperCaseList = function (whitelist) {
    return whitelist.map(function (e) {
        return e.toUpperCase();
    });
}


exports.sendErrorResponse = function (res, error, msg) {
    res.statusCode = error;

    res.json({
        statusCode: error,
        error: msg
    });
}

exports.processCode = function (isoCode, whitelist, res, req) {

    //Sanitize whitelist - uppercase to match geolite data
    let sanitizedList = this.upperCaseList(whitelist);

    if (isoCode != undefined && sanitizedList.indexOf(isoCode) >= 0) {
        //Valid Country
        res.statusCode = constants.HTTP_OK;

        res.json({
            isoCode,
            ip: `${req.params.ip}`,
            statusCode: res.statusCode,
            message: `ALLOWED: IP address is within the listed countries`
        });
    }
    else {
        //Forbidden Country
        res.statusCode = constants.HTTP_FORBIDDEN;

        res.json({
            isoCode,
            ip: `${req.params.ip}`,
            statusCode: res.statusCode,
            message: `FORBIDDEN: IP address not from an allowed country`
        });
    }
}