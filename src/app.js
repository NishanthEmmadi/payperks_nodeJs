//express
const express = require('express');
const app = express();

const router = require('./router')

//middleware functions
app.use(express.urlencoded({extended: false}));
app.use(express.json() );
app.use(express.static('views/images'));
app.set('views','views');
app.set('view engine','hbs');

//router
app.use('/',router);


app.listen(5000,() => {

console.log('server listening');

});