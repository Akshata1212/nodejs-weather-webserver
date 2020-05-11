const request = require('request');


var forecast = (lattitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=a7edd0648dc8787c3b82f447b09d5a9c&query=' + lattitude + ',' + longitude + '&units=f';
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        }
        else if (body.error) {
            callback('Unable to find location', undefined);
        }
        else {
            callback(undefined, "It's " + body.current.weather_descriptions[0] + ". It feels like " + body.current.feelslike + " degrees out.");
        }
    });
}


module.exports = forecast;