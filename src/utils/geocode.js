const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWtzaGF0YTEyMTIiLCJhIjoiY2s4empzcXpoMDhxYTNydXF0amlwZXdvaiJ9.IJLCzDZ7H2xzTB1O9UQJrg&limit=1';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location service!", undefined);
        }
        else if (body.features.length === 0) {
            callback("Unable to find location. Try other location!", undefined);
        }
        else {
            // const data = JSON.parse(response.body);
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode;