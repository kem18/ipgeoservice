# ipgeoservice

Get country restrictions from IP address using [MaxMind](https://www.maxmind.com) GeoLite2 binary database.


## Installation

``` bash
# clone the repo
$ git clone https://github.com/kem18/ipgeoservice.git ipgeoservice

# go into project directory
$ cd ipgeoservice

# install app's dependencies
$ npm install
```


## Usage
GET Customer Country Location Restrictions By IP
Example URL : http://localhost:3000/api/v1/restrictions/76.209.101.123?whitelist=["US","DE"]


### Parameters

* `ip` (`String`): The IP address to lookup.
* `whitelist` (`Array`): List of two-letter country code in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format.

### Returns

```js
{
    "isoCode": "US",
    "ip": "76.209.101.123",
    "restrictions": "None",
    "message": "Country granted access!"
}
```

* `isoCode`: Two-letter country code in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format.


