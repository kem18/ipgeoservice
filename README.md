# ipgeoservice

Get country restrictions from IP address using [MaxMind](https://www.maxmind.com) GeoLite2 binary database.


## Installation

``` bash
# clone the repo
$ git clone https://github.com/kem18/ipgeoservice.git ipgeoservice

# go into project directory
$ cd ipgeoservice

# install projects dependencies
$ npm install
```

### Node Server Startup

``` bash
$ npm start
```

### Docker Support
``` bash
$ docker build -t <your docker username>/ipgeoservice .
$ docker run -p 3000:3000 -d <your docker username>/ipgeoservice
```

### Node Server Environment Settings
These may be exported in environment prior to starting server

* `PORT` : Server port number  (Default : 3000)
* `LOGPATH` : Server access.log path in Apache combined format (Default : ./log)
* `GEOLITE2_DATABASE_FILE` : Geo Lite 2 database file location (Default: ./geodata/GeoLite2-Country.mmdb)


### Endpoints
GET Geo Location Restrictions By IP - /api/v1/ipgeo/restrictions/{ip}?whitelist=["Country ISO Code", "Country ISO Code"...]

Example URL : http://localhost:3000/api/v1/ipgeo/restrictions/76.209.101.123?whitelist=["US","DE"]


GET GEO Location Details By IP - /api/v1/ipgeo/{ip}

Example URL : http://localhost:3000/api/v1/ipgeo/76.209.101.123


### Parameters

* `ip` (`String`): Valid IPv4 or IPv6 address.
* `whitelist` (`Array`): List of two-letter country code in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format.

### Sample Responses

```js

Valid IP Address:
{
    "isoCode": "US",
    "ip": "76.209.101.123",
    "statusCode": 200,
    "message": "ALLOWED: IP address is within the listed countries"
}

Forbidden IP Address:
{
    "isoCode": "JP",
    "ip": "27.120.192.0",
    "statusCode": 403,
    "message": "FORBIDDEN: IP address not from an allowed country"
}

Malformed Request:
{
    "statusCode": 400,
    "error": "BAD REQUEST: Invalid whitelist"
}


```
### Future Ehancements

* Dynamic Mapping Data Sync

1) "Retrieve" script (cron):
    - Curl latest GeoLite2-Country.mmdb file from https://geolite.maxmind.com/download/geoip/database/GeoLite2-Country.tar.gz
    - Unarchive and store mmdb file in public repo, AWS S3 bucket or local server
    

2) "Update" script (cron):
    - Backup existing local GeoLite-Country.mmdb file
    - rsync remote GeoLite2-Country.mmdb file from public repo, AWS S3 bucket or replace/symlink on local server




