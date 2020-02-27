//expressx
const path = require('path');
const express = require('express');
const app = express();

const router = require('./router')

//middleware functions
app.use(express.urlencoded({extended: false}));
app.use(express.json() );
app.use(express.static(path.join(__dirname, '../views/images')));
app.set('views',path.join(__dirname, '../views'));
app.set('view engine','hbs');

//router
app.use('/',router);


app.listen(80,() => {

console.log('server listening 8080');

});