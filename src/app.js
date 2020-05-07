const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const forecast = require('../src/utils/forecast.js');
const geocode = require('../src/utils/geocode.js');

// console.log(__dirname); -- gives path of directory

// console.log(__filename); // gives path of current directory

// console.log(path.join('../public')); // gives path of public directory

const app = express(); // express itself is a func

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// to access static assets(which does not change)
// to load other pages such as help, about => go to browser => localhost:3000/help.html
// app.use(express.static(publicDirectoryPath))

// Setup handlebars engine and views location
// handlebars helps to render dynamic documents and helps to create reusable code
// hbs is the express.js view engine for handlebars
// for this we have to create view folder => index.hbs and delete index.html to see results
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

// this will land on initial or root page of appn
// This is never going to call once we start using app.use
// app.get('', (req, res) => {
//     // send() use to send the response to browser. 
//     // we can send html, string, json
//     res.send("<h1>Hello Express!!!</h1>");
// });

// this will land on root/help page of appn
// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Akshata',
//         age: 25
//     }, {
//         name: 'Kunal',
//         age: 27
//     }]);
// });

// this will land on root/about page of appn
// app.get('/about', (req, res) => {
//     res.send("<h1>About</h1>");
// });

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
// this will land on root/weather page of appn
// ?address=mumbai is the query string
// http://localhost:3000/weather?address=mumbai for req.query.address
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide address'
        });
    }
    // { latitude, longitude, location } = {} here default func params are used 
    // so that even if we dont pass the parameter it will give appropriate o/p
    // http://localhost:3000/weather?address=@
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

// express provide with wildcard character "*". if nothing matches with above Links it will redirected here.
// this should always be at the end because the .js file runs from top to bottom and it stops if it finds the match
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: "my 404 page",
        name: 'Akshata'
    });
    // res.send("my 404 page");
});

// to initialise the local port. This port is only accessible within machine
// .i.e we cannot access it outside the system
// To access it go to browser and type "localhost:3000"
app.listen(3000, () => {
    console.log("Server running on port 3000");
});