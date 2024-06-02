const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

const db = require('./db');
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


// register post route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const response = await db.registerUser(username, password);

    if (response === 0) {
        res.render('secrets');
    } else {
        res.redirect('/register');
    }
});

// login post route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const response = await db.authenticateUser(username, password);
    if (response === 0) {
        res.render('secrets');
    } else if (response === 1) {
        res.redirect('/login');
    } else if (response === 3) {
        res.redirect('/');
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});