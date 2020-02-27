//express
const express = require('express');
const app = express();

const router = require('./router')

//middleware functions
app.use(express.urlencoded({extended: false}));
app.use(express.json() );
app.use(express.static(__dirname + 'views/images'));
app.set('views',__dirname + '/views');
app.set('view engine','hbs');

//router
app.use('/',router);


app.listen(8080,() => {

console.log('server listening 8080');

});