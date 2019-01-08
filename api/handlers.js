'use strict';
const geolite = require('../lib/geolite');
const utils = require('../lib/utils');
const constants = require('../config/constants');

// =============================================================================
// Route Handler Functions
// =============================================================================

//Geo Location Country Restrictions Handler 
exports.restrictionsHandler = function (req, res) {

    try {
        //Validat whitelist
        let whitelist = utils.getWhitelistFromRequest(req);

        if (whitelist !== undefined && whitelist.length > 0) {

            //Validate IP
            if (geolite.validateIp(req.params.ip)) {

                try {
                    //Get ISO 3166 country code
                    let isoCode = geolite.getCountryISOCode(req.params.ip);

                    //Determine if isoCode of customer exists in whitelist
                    utils.processCode(isoCode, whitelist, res, req);

                } catch (error) {
                    utils.sendErrorResponse(res, constants.HTTP_INTERNAL_SERVER_ERROR, error);
                }
            }
            else {
                utils.sendErrorResponse(res, constants.HTTP_BAD_REQUEST, 'BAD REQUEST: Invalid IP Address');
            }
        }
    } catch (error) {
        utils.sendErrorResponse(res, constants.HTTP_BAD_REQUEST, 'BAD REQUEST: Invalid whitelist');
    }
}

//BONUS: Geo Location Country Details Handler 
exports.locationDetailsHandler = function (req, res) {

    //Validate IP
    if (geolite.validateIp(req.params.ip)) {
        try {
            let location = geolite.getCountryGeoData(req.params.ip);

            if (location !== undefined) {
                res.json(location);
            } else {
                utils.sendErrorResponse(res, constants.HTTP_BAD_REQUEST, 'BAD REQUEST: Invalid IP Address');
            }

        } catch (error) {
            utils.sendErrorResponse(res, constants.HTTP_INTERNAL_SERVER_ERROR, error);
        }
    } else {
        utils.sendErrorResponse(res, constants.HTTP_BAD_REQUEST, 'BAD REQUEST: Invalid IP Address');
    }
}