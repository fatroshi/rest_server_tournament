const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

// for every endpoint use body parser
app.use(bodyParser.json());

// import Routes
const tournamentsRoute = require('./routes/tournaments');
app.use('/tournaments/',tournamentsRoute);

const usersRoute = require('./routes/users');
app.use('/users/', usersRoute);


// Middlewares
app.use('/posts', () => {
   console.log("Middleware is running");
});

//
app.get('/', (req, res) => {
   res.send('Start page');
});



// connect to db
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true }, () => {
   console.log("Connected to db");
});
//
app.listen(3000);