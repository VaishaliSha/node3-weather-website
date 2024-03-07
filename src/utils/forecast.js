const request = require('request');

forecast = (latitiude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(latitiude)}&lon=${encodeURIComponent(longitude)}&appid=a9f5bff85522d671968568ea120bfd3d`;

    request({ url , json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (response.body.message) {
            callback('Unable to find location!', undefined);
        } else {
           callback(undefined, `It is currently ${response.body['main']['temp']} degrees out. It feels like ${response.body['main']['feels_like']} degrees out.`);
        }
    });
}

module.exports = forecast;