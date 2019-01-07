"use strict";
const express = require('express');
const app = express();

const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream')

const logDirectory = path.join(__dirname, 'log');

//Generic API versioning
const API_VERSION = 1;

// Logger - Ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Logger - Create a rotating write stream
let accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});

// Logger Setup - Apache combined format
app.use(morgan('combined', { stream: accessLogStream }));

// Configure server
const port = process.env.PORT || 3000;

// Register Routes - prefix /api
app.use(`/api/v${API_VERSION}/`, require('./api/routes'));

// Start listening
app.listen(port, () => {
    console.log(`IP Geo Server listening on port ${port}...`);
    console.log('IP Geo Server traffic logged to: ', logDirectory);
})