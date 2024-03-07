const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public'); 
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handler bar engine and views location.
//3rd method using hbs library -> setup views and render dynamic data.
app.set('view engine', 'hbs');
app.set('views', viewsPath); // If we do not set this, then we have to use views directory for views.
hbs.registerPartials(partialPath);

//Setup static directory to  serve.
// 2nd method using index.html, about.html, help.html
// example: http://localhost:3000/about.html will display about page
app.use(express.static(publicDirectoryPath));

// Part of 3rd method
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Andrew Mead'
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    // res.send({
    //     forecast: 'It is snowing',
    //     address: req.query.address
    // })
    
    geocode(address, (error, {latitude, longitude} = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    error
                });
            }       
            res.send({
                forecast: data,
                address
            });
        });
    });

});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found!'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page Not Found!'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});



// 1st method
//http://localhost:3000
// app.get('', (req, res) => {
//     res.send('Hello express!');
// });

//http://localhost:3000/help
// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Andrew',
//         age: 27
//     });
// });

//http://localhost:3000/about
// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>');
// });