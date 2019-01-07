'use strict';

// =============================================================================
// Utility Functions
// =============================================================================
exports.getWhitelistFromRequest = function (req) {

    let whitelist;

    //Validate whitelist
    if (req.query.whitelist !== undefined) {
        
        try {
            whitelist = JSON.parse(req.query.whitelist);
        } catch (e) { 
            console.log('getWhitelistFromRequest() Warning - Unable to parse whitelist from request');
        }
    }

    return whitelist;
};