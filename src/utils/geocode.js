const request = require('request');

const geocode = (address, callback) => {
    const url = `https://geocode.maps.co/search?q=${encodeURIComponent(address)}&api_key=65e4bab0d0000612074062soc555f94`;
    request({ url , json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (response.body.length === 0) {
           callback('Unable to find location. Try another search.', undefined);
        } else {
            const latitude = response.body[0].lat;
            const longitude = response.body[0].lon;    
            callback(undefined, {latitude, longitude});
        }
    
    });
}

module.exports = geocode;