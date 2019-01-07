'use strict';

const express = require('express');
const router = express.Router();
const handlers = require('./handlers');


// ----------------------------------------------------------------------------------------------------------------------
// MIDDLEWARE - all requests
// ----------------------------------------------------------------------------------------------------------------------
router.use(function (req, res, next) {
    // TODO: DO ALL LOGGING HERE
    console.log('Received Request...');
    next();
});

// ----------------------------------------------------------------------------------------------------------------------
// ROUTES
// ----------------------------------------------------------------------------------------------------------------------
// GET Geo Location Restrictions By IP
//
// Request Params:
//  ip          - Valid IPv4 or IPv6 address
//  whitelist[] - List of valid Two-letter country codes in ISO 3166-1 alpha-2 format ["US","DE"]
//                (see https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)
//
// Example URL : http://localhost:3000/api/v1/ipgeo/restrictions/76.209.101.123?whitelist=["US","DE"]
//
// FUTURE IMPROVEMENTS: Have dedicated datastore for whitelist rather than passing as query params
// ----------------------------------------------------------------------------------------------------------------------

router.route('/ipgeo/restrictions/:ip')

    .get(function (req, res) {
        //Country Restrictions Handler
        handlers.restrictionsHandler(req, res);
    });


// ----------------------------------------------------------------------------------------------------------------------
// GET GEO Location Details By IP
//
// Request Params:
//  ip - Valid IPv4 or IPv6 address
//
// Example URL : http://localhost:3000/api/v1/ipgeo/76.209.101.123
// ----------------------------------------------------------------------------------------------------------------------
router.route('/ipgeo/:ip')

    .get(function (req, res) {
        //Country Location Details Handler
        handlers.locationDetailsHandler(req, res);
    });

module.exports = router;