const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 3000
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.set(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

// register get route
app.get('/register', (req, res) => {
    res.render('register');
});

// login get route
app.get('/login', (req, res) => {
    res.render('login');
}); 


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});