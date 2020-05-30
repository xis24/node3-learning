const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=372edf21e3f8ae4023f79109cd6a476b&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("unable to find location");
    } else {
      callback(
        undefined,
        `Current temperature is ${body.current.temperature}, but it feels like ${body.current.temperature}`
      );
    }
  });
};

module.exports = forecast;
