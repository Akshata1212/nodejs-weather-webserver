const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const forecast = require('../src/utils/forecast.js');
const geocode = require('../src/utils/geocode.js');
const port = process.env.PORT || 3000;
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath); // to use the user defined path [i.e. viewsPath] use below command
hbs.registerPartials(partialsPath); // place where partials resides

// Setup static directory to serve
// express uses default location in views folder
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Akshata'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Akshata'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        text: 'This is some helpful text',
        title: 'Help',
        name: 'Akshata'
    });
});
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide address'
        });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forcast: forcastData,
                location,
                address: req.query.address
            });
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: "Help article not found",
        name: 'Akshata'
    });
});
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: "my 404 page",
        name: 'Akshata'
    });
});
app.listen(port, () => {
    console.log("Server running on port 3000");
});