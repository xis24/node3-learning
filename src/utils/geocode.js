const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZmxvd2VyODE3MDAwIiwiYSI6ImNrYWxxZWoxNzE0cW0ydHMwZmdkNzR5cXMifQ.K8MKaRY4chqZOl0_qgc5qA&limit=1`;
  request({ url, json: true }, (error, data) => {
    if (error) {
      callback("unable to connection to location services");
    } else if (!data.body.features) {
      callback("empty response");
    } else if (data.body.features.length === 0) {
      callback("unable to find location. try another search");
    } else {
      callback(undefined, {
        latitude: data.body.features[0].center[1],
        longitude: data.body.features[0].center[0],
        location: data.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
