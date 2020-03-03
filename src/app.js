// path node core module
const path = require('path');

//express
const express = require('express');
const app = express();

// express-handlebars template scripting
const exphbs = require('express-handlebars');

//database 
const mongoose = require('mongoose');

//for managing external configuration
const dotenv = require('dotenv');

console.log(__dirname);
dotenv.config();

//router file import
const router = require('./router')

//middleware functions
app.use(express.urlencoded({extended: false}));
app.use(express.json() );
app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//router
app.use('/',router);


//connecting to database
mongoose.connect(process.env.DB_CONNECT, 
{ useUnifiedTopology: true, useNewUrlParser: true  },
() =>console.log("connected to DB"));


app.listen(80,() => {

console.log('server listening 8080');
 
});